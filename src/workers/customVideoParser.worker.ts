console.log("[VideoParser] 🚀 Annex B 连续 H264 裸流 Worker 启动！");

/**
 * 当前协议理解：
 *
 * 外层可能是：
 * 0A AC 02 + A8 A7 + seq低 + seq高 + 291字节H264码流 + 其余填充/保留
 *
 * 或者直接是：
 * A8 A7 + seq低 + seq高 + 291字节H264码流 + 其余填充/保留
 *
 * 注意：
 * 291 字节 payload 不是视频帧，只是连续 H264 裸流切片。
 */

const FRAME_HEADER_0 = 0xA8;
const FRAME_HEADER_1 = 0xA7;

const OUTER_BLOCK_SIZE = 303;
const OUTER_PREFIX_SIZE = 3;

const FRAME_SIZE = 300;
const FRAME_SEQUENCE_OFFSET = 2;
const FRAME_VIDEO_OFFSET = 4;
const FRAME_VIDEO_BYTES = 291;

const MAX_RAW_BUFFER_BYTES = 4 * 1024 * 1024;
const MAX_STREAM_BUFFER_BYTES = 4 * 1024 * 1024;
const MAX_ACCESS_UNIT_BYTES = 2 * 1024 * 1024;

const RECENT_PACKET_CACHE_LIMIT = 2048;

let rawBuffer = new Uint8Array(0);
let streamBuffer = new Uint8Array(0);

let pendingAccessUnit: Uint8Array[] = [];
let pendingHasVcl = false;
let pendingBytes = 0;

let cachedSps: Uint8Array | null = null;
let cachedPps: Uint8Array | null = null;

let packetCount = 0;
let waitForKeyframe = true;
let gapResetCount = 0;
let parserErrors = 0;

let lastPacketSequence: number | null = null;
let codecSent = false;
let spsResolution: { width: number; height: number } | null = null;
let lastPayloadPreviewHex = "-";

let recentPacketKeys: string[] = [];
const recentPacketKeySet = new Set<string>();

const getFormattedTime = () => {
    const d = new Date();

    return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
};

const toHexPreview = (bytes: Uint8Array, max = 32) => {
    return Array.from(bytes.subarray(0, max))
        .map(v => v.toString(16).padStart(2, "0").toUpperCase())
        .join(" ");
};

const hashPayload = (payload: Uint8Array): number => {
    // FNV-1a 32bit
    let hash = 0x811c9dc5;

    for (let i = 0; i < payload.length; i += 1) {
        hash ^= payload[i];
        hash = Math.imul(hash, 0x01000193);
    }

    return hash >>> 0;
};

const rememberPacketKey = (key: string) => {
    if (recentPacketKeySet.has(key)) return;

    recentPacketKeySet.add(key);
    recentPacketKeys.push(key);

    while (recentPacketKeys.length > RECENT_PACKET_CACHE_LIMIT) {
        const oldKey = recentPacketKeys.shift();

        if (oldKey) {
            recentPacketKeySet.delete(oldKey);
        }
    }
};

setInterval(() => {
    (self as unknown as Worker).postMessage({
        type: "stats",
        rawUpdateCount: packetCount,
        lastRawLength: pendingBytes,
        lastPacketHeader: FRAME_HEADER_0,
        lastPacketSequence,
        lastPayloadPreviewHex,
        lastReceivedAtText: getFormattedTime(),
        packetCount,
        droppedPackets: gapResetCount,
        parserErrors,
    });
}, 16);

const startCodeLengthAt = (data: Uint8Array, index: number): number => {
    if (
        index + 3 < data.length &&
        data[index] === 0x00 &&
        data[index + 1] === 0x00 &&
        data[index + 2] === 0x00 &&
        data[index + 3] === 0x01
    ) {
        return 4;
    }

    if (
        index + 2 < data.length &&
        data[index] === 0x00 &&
        data[index + 1] === 0x00 &&
        data[index + 2] === 0x01
    ) {
        return 3;
    }

    return 0;
};

const findStartCode = (
    data: Uint8Array,
    from = 0
): { index: number; length: number } | null => {
    for (let i = from; i <= data.length - 3; i += 1) {
        const length = startCodeLengthAt(data, i);

        if (length > 0) {
            return { index: i, length };
        }
    }

    return null;
};

const appendBytes = (base: Uint8Array, extra: Uint8Array): Uint8Array => {
    if (!base.length) return extra;
    if (!extra.length) return base;

    const out = new Uint8Array(base.length + extra.length);

    out.set(base, 0);
    out.set(extra, base.length);

    return out;
};

const concatBytes = (parts: Uint8Array[]): Uint8Array => {
    const total = parts.reduce((sum, item) => sum + item.length, 0);
    const out = new Uint8Array(total);

    let offset = 0;

    for (const part of parts) {
        out.set(part, offset);
        offset += part.length;
    }

    return out;
};

const stripStartCode = (nal: Uint8Array): Uint8Array => {
    const startLen = startCodeLengthAt(nal, 0);

    if (!startLen) {
        return nal;
    }

    return nal.subarray(startLen);
};

const sanitizeNal = (nal: Uint8Array): Uint8Array => {
    const raw = stripStartCode(nal);

    const out = new Uint8Array(4 + raw.length);

    out[0] = 0x00;
    out[1] = 0x00;
    out[2] = 0x00;
    out[3] = 0x01;

    out.set(raw, 4);

    return out;
};

const getNalType = (nal: Uint8Array): number => {
    const raw = stripStartCode(nal);

    if (!raw.length) {
        return -1;
    }

    return raw[0] & 0x1f;
};

class BitReader {
    private data: Uint8Array;
    private bitOffset = 0;

    constructor(data: Uint8Array) {
        this.data = data;
    }

    readBit(): number {
        const byteOffset = this.bitOffset >> 3;

        if (byteOffset >= this.data.length) {
            throw new Error("BitReader EOF");
        }

        const bitIndex = 7 - (this.bitOffset & 7);
        const bit = (this.data[byteOffset] >> bitIndex) & 1;

        this.bitOffset += 1;

        return bit;
    }

    readBits(count: number): number {
        let value = 0;

        for (let i = 0; i < count; i += 1) {
            value = (value << 1) | this.readBit();
        }

        return value;
    }

    readUE(): number {
        let zeroCount = 0;

        while (this.readBit() === 0) {
            zeroCount += 1;

            if (zeroCount > 31) {
                throw new Error("Invalid Exp-Golomb");
            }
        }

        if (zeroCount === 0) {
            return 0;
        }

        const suffix = this.readBits(zeroCount);

        return (1 << zeroCount) - 1 + suffix;
    }
}

const getNalPayloadRbsp = (nal: Uint8Array): Uint8Array => {
    const raw = stripStartCode(nal);

    if (raw.length <= 1) {
        return new Uint8Array(0);
    }

    // 跳过 NAL header
    const payload = raw.subarray(1);

    const out: number[] = [];
    let zeroCount = 0;

    for (let i = 0; i < payload.length; i += 1) {
        const value = payload[i];

        // 去掉 emulation prevention byte: 00 00 03
        if (zeroCount >= 2 && value === 0x03) {
            zeroCount = 0;
            continue;
        }

        out.push(value);

        if (value === 0x00) {
            zeroCount += 1;
        } else {
            zeroCount = 0;
        }
    }

    return new Uint8Array(out);
};

const isFirstVclNalOfPicture = (nal: Uint8Array): boolean => {
    const nalType = getNalType(nal);

    if (nalType < 1 || nalType > 5) {
        return false;
    }

    try {
        const rbsp = getNalPayloadRbsp(nal);

        if (!rbsp.length) {
            return false;
        }

        const reader = new BitReader(rbsp);
        const firstMbInSlice = reader.readUE();

        return firstMbInSlice === 0;
    } catch {
        return false;
    }
};

const resetH264StateAfterGap = () => {
    streamBuffer = new Uint8Array(0);
    pendingAccessUnit = [];
    pendingHasVcl = false;
    pendingBytes = 0;
    waitForKeyframe = true;
};

const checkAndSendCodec = () => {
    if (codecSent) return;

    // 必须 SPS + PPS 都有，再初始化解码器
    if (!cachedSps || !cachedPps) return;

    const sps = stripStartCode(cachedSps);

    if (sps.length < 4) return;

    const profile = sps[1].toString(16).padStart(2, "0");
    const compat = sps[2].toString(16).padStart(2, "0");
    const level = sps[3].toString(16).padStart(2, "0");

    const codecStr = `avc1.${profile}${compat}${level}`;

    console.log(`[VideoParser] 🏷️ SPS/PPS 已齐全，Annex B codec=${codecStr}`);

    // 重点：
    // Annex B 模式不要发送 description。
    // 主线程 configure 也不要传 description。
    (self as any).postMessage({
        type: "codec",
        codec: codecStr,
    });

    codecSent = true;
};

const emitAccessUnit = (nals: Uint8Array[], hasVcl: boolean) => {
    if (!hasVcl || !nals.length) return;
    if (!codecSent) return;

    const originalTypes = nals.map(getNalType);

    // AUD 可以不送给 WebCodecs
    let finalNals = nals.filter((_, index) => originalTypes[index] !== 9);

    let finalTypes = finalNals.map(getNalType);
    const hasIdr = finalTypes.includes(5);

    // 如果是 IDR，确保 SPS/PPS 在前面
    if (hasIdr) {
        if (!cachedSps || !cachedPps) {
            console.warn("[VideoParser] 收到 IDR，但 SPS/PPS 不完整，丢弃并等待下一个关键帧");
            waitForKeyframe = true;
            return;
        }

        const hasSps = finalTypes.includes(7);
        const hasPps = finalTypes.includes(8);

        const inject: Uint8Array[] = [];

        if (!hasSps) inject.push(cachedSps);
        if (!hasPps) inject.push(cachedPps);

        finalNals = [...inject, ...finalNals];
        finalTypes = finalNals.map(getNalType);
    }

    const isKey =
        finalTypes.includes(5) &&
        finalTypes.includes(7) &&
        finalTypes.includes(8);

    if (waitForKeyframe) {
        if (!isKey) return;

        waitForKeyframe = false;
    }

    const annexBNals = finalNals.map(sanitizeNal);

    if (!annexBNals.length) return;

    const data = concatBytes(annexBNals);

    // 注意：
    // 这里不要因为 KEY 小就丢。
    // 在你的低码率场景下，几百字节的 IDR 是可能存在的。
    if (isKey) {
        console.log(
            `[VideoParser] 📦 发送 AU: KEY | NAL=${finalTypes.join(",")} | size=${data.length}`
        );
    }

    const transferable = data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
    );

    (self as any).postMessage(
        {
            type: "au",
            data: transferable,
            isKey,
        },
        [transferable]
    );
};

const flushPendingAccessUnit = () => {
    if (!pendingAccessUnit.length) return;

    emitAccessUnit(pendingAccessUnit, pendingHasVcl);

    pendingAccessUnit = [];
    pendingHasVcl = false;
    pendingBytes = 0;
};

const extractNalUnits = (): Uint8Array[] => {
    const first = findStartCode(streamBuffer, 0);

    if (!first) {
        // 保留最后几个 0，防止 start code 被切在两个 291 包之间
        if (streamBuffer.length > 2000) {
            streamBuffer = streamBuffer.slice(streamBuffer.length - 4);
        }

        return [];
    }

    let start = first.index;
    let cursor = start + first.length;

    const out: Uint8Array[] = [];

    while (true) {
        const next = findStartCode(streamBuffer, cursor);

        if (!next) break;

        const nal = streamBuffer.slice(start, next.index);

        if (nal.length > 4) {
            out.push(nal);
        }

        start = next.index;
        cursor = start + next.length;
    }

    // 保留最后一个尚未遇到下一个 start code 的 NAL
    streamBuffer = streamBuffer.slice(start);

    if (streamBuffer.length > MAX_STREAM_BUFFER_BYTES) {
        console.warn("[VideoParser] streamBuffer 过大，清空并等待关键帧");
        parserErrors += 1;
        resetH264StateAfterGap();
    }

    return out;
};

const handleNal = (nal: Uint8Array) => {
    const nalType = getNalType(nal);

    if (nalType < 0) return;

    let typeStr = "";

    switch (nalType) {
        case 1:
            typeStr = "P/B帧切片(1) 📄";
            break;
        case 5:
            typeStr = "I帧/IDR(5) ❤️";
            break;
        case 6:
            typeStr = "SEI(6) 📝";
            break;
        case 7:
            typeStr = "SPS(7) 🔵";
            break;
        case 8:
            typeStr = "PPS(8) 🟢";
            break;
        case 9:
            typeStr = "AUD分隔符(9) ✂️";
            break;
        default:
            typeStr = `未知(${nalType}) ❓`;
            break;
    }


    if (nalType === 7) {
        cachedSps = sanitizeNal(nal);
        checkAndSendCodec();
    }

    if (nalType === 8) {
        cachedPps = sanitizeNal(nal);
        checkAndSendCodec();
    }

    const isVcl = nalType >= 1 && nalType <= 5;

    // AUD / SPS / PPS / SEI 通常意味着上一个 AU 可以结算
    if (
        pendingHasVcl &&
        (nalType === 9 || nalType === 7 || nalType === 8 || nalType === 6)
    ) {
        flushPendingAccessUnit();
    }

    // 没有 AUD 的时候，用 first_mb_in_slice 判断新图像开始
    if (isVcl && pendingHasVcl && isFirstVclNalOfPicture(nal)) {
        flushPendingAccessUnit();
    }

    pendingAccessUnit.push(nal);

    if (isVcl) {
        pendingHasVcl = true;
    }

    pendingBytes += nal.length;

    if (pendingBytes > MAX_ACCESS_UNIT_BYTES) {
        console.warn("[VideoParser] 单个 AU 过大，强制清空并等待关键帧");
        parserErrors += 1;
        resetH264StateAfterGap();
    }
};

const parseCustomFrame = (frame: Uint8Array) => {
    if (frame.length < FRAME_SIZE) return;

    packetCount += 1;

    const seq =
        frame[FRAME_SEQUENCE_OFFSET] |
        (frame[FRAME_SEQUENCE_OFFSET + 1] << 8);

    const payload = frame.subarray(
        FRAME_VIDEO_OFFSET,
        FRAME_VIDEO_OFFSET + FRAME_VIDEO_BYTES
    );

    lastPayloadPreviewHex = toHexPreview(payload);

    // 上层可能会重复推送同一个包，所以用 seq + payload hash 判断“真重复”
    const payloadHash = hashPayload(payload);
    const packetKey = `${seq}:${payloadHash}`;

    if (recentPacketKeySet.has(packetKey)) {
        console.warn(
            `[VideoParser] 真重复包 seq=${seq}, hash=${payloadHash.toString(16)}，已丢弃`
        );
        return;
    }

    rememberPacketKey(packetKey);

    if (lastPacketSequence !== null) {
        const expectedSeq = (lastPacketSequence + 1) & 0xffff;

        if (seq === lastPacketSequence) {
            // seq 相同但 payload 不同，说明协议可能不是“每个 291 字节包递增一次”
            // 不要直接丢，否则会破坏连续码流
            console.warn(
                `[VideoParser] seq 相同但 payload 不同: seq=${seq}，继续拼接`
            );
        } else if (seq !== expectedSeq) {
            gapResetCount += 1;

            console.warn(
                `[VideoParser] H264 丢包或乱序: expected=${expectedSeq}, got=${seq}，清空缓存等待下一个关键帧`
            );

            resetH264StateAfterGap();
        }
    }

    lastPacketSequence = seq;

    // 关键：这里只是连续拼接 291 字节 H264 裸流
    streamBuffer = appendBytes(streamBuffer, payload);

    for (const nal of extractNalUnits()) {
        handleNal(nal);
    }
};

const ingestCustomBytes = (bytes: Uint8Array) => {
    if (!bytes.length) return;

    // 兼容 303 字节外层包：0A AC 02 + 300 字节图传帧
    if (
        bytes.length === OUTER_BLOCK_SIZE &&
        bytes[OUTER_PREFIX_SIZE] === FRAME_HEADER_0 &&
        bytes[OUTER_PREFIX_SIZE + 1] === FRAME_HEADER_1
    ) {
        parseCustomFrame(
            bytes.subarray(OUTER_PREFIX_SIZE, OUTER_PREFIX_SIZE + FRAME_SIZE)
        );
        return;
    }

    // 兼容纯 300 字节图传帧
    if (
        bytes.length === FRAME_SIZE &&
        bytes[0] === FRAME_HEADER_0 &&
        bytes[1] === FRAME_HEADER_1
    ) {
        parseCustomFrame(bytes);
        return;
    }

    // 兜底：如果一次收到多个包或半包，就扫描 A8 A7
    rawBuffer = appendBytes(rawBuffer, bytes);

    if (rawBuffer.length > MAX_RAW_BUFFER_BYTES) {
        console.warn("[VideoParser] rawBuffer 过大，丢弃旧数据");
        parserErrors += 1;
        rawBuffer = rawBuffer.slice(rawBuffer.length - FRAME_SIZE * 2);
    }

    let offset = 0;

    while (offset <= rawBuffer.length - FRAME_SIZE) {
        if (
            rawBuffer[offset] === FRAME_HEADER_0 &&
            rawBuffer[offset + 1] === FRAME_HEADER_1
        ) {
            parseCustomFrame(rawBuffer.subarray(offset, offset + FRAME_SIZE));
            offset += FRAME_SIZE;
        } else {
            offset += 1;
        }
    }

    if (offset > 0) {
        rawBuffer = rawBuffer.subarray(offset);
    }
};

(self as any).onmessage = (event: MessageEvent<any>) => {
    if (event.data?.type === "chunk" && event.data.bytes) {
        ingestCustomBytes(new Uint8Array(event.data.bytes));
    }
};

export default {};
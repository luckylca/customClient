const FRAME_HEADER_0 = 0xA8;
const FRAME_HEADER_1 = 0xA7;
const FRAME_SIZE = 300;
const FRAME_SEQUENCE_BYTES = 2;
const FRAME_VIDEO_BYTES = 270;
const FRAME_RESERVED_BYTES = 24;
const FRAME_CRC_BYTES = 2;
const FRAME_VIDEO_OFFSET = 2 + FRAME_SEQUENCE_BYTES;
const FRAME_RESERVED_OFFSET = FRAME_VIDEO_OFFSET + FRAME_VIDEO_BYTES;
const FRAME_CRC_OFFSET = FRAME_RESERVED_OFFSET + FRAME_RESERVED_BYTES;
const MAX_STREAM_BUFFER_BYTES = 2 * 1024 * 1024;
const MAX_ACCESS_UNIT_BYTES = 512 * 1024;

type WorkerInMessage = {
    type: 'chunk';
    bytes: ArrayBuffer;
};

type WorkerOutMessage =
    | {
          type: 'stats';
          rawUpdateCount: number;
          lastRawLength: number;
          lastPacketHeader: number | null;
          lastPacketSequence: number | null;
          lastPayloadPreviewHex: string;
          lastReceivedAtText: string;
          packetCount: number;
          droppedPackets: number;
          parserErrors: number;
          frameBufferLength: number;
          streamBufferLength: number;
          accessUnitBufferLength: number;
          rawFrameCountHint: number;
          rawTrailingBytesHint: number;
          alignedFrameCount: number;
          syncSearchCount: number;
          gapResetCount: number;
          parserResetCount: number;
          codecResetCount: number;
          waitForKeyframe: boolean;
          keyframeSyncAcquired: boolean;
          lastResetReason: string;
          frameSyncState: string;
      }
    | {
          type: 'codec';
          codec: string;
          source: 'stable' | 'sps';
      }
    | {
          type: 'reset';
          reason: string;
          gapResetCount: number;
          parserResetCount: number;
          codecResetCount: number;
          waitForKeyframe: boolean;
      }
    | {
          type: 'au';
          data: ArrayBuffer;
          isKey: boolean;
      };

let streamBuffer: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
let pendingAccessUnit: Uint8Array[] = [];
let pendingHasVcl = false;
let pendingBytes = 0;
let lastCodec = '';

let rawUpdateCount = 0;
let lastRawLength = 0;
let lastPacketHeader: number | null = null;
let lastPacketSequence: number | null = null;
let lastPayloadPreviewHex = '-';
let lastReceivedAtText = '-';
let packetCount = 0;
let droppedPackets = 0;
let parserErrors = 0;

let frameBufferLength = 0;
let streamBufferLength = 0;
let accessUnitBufferLength = 0;
let rawFrameCountHint = 0;
let rawTrailingBytesHint = 0;
let alignedFrameCount = 0;
let syncSearchCount = 0;
let gapResetCount = 0;
let parserResetCount = 0;
let codecResetCount = 0;
let waitForKeyframe = true;
let keyframeSyncAcquired = false;
let lastResetReason = '-';
let frameSyncState = 'idle';

let expectedSequence: number | null = null;

const startCodeLengthAt = (data: Uint8Array, index: number): number => {
    if (index + 3 < data.length && data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0 && data[index + 3] === 1) {
        return 4;
    }
    if (index + 2 < data.length && data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 1) {
        return 3;
    }
    return 0;
};

const findStartCode = (data: Uint8Array, from = 0): { index: number; length: number } | null => {
    for (let i = from; i <= data.length - 3; i += 1) {
        const length = startCodeLengthAt(data, i);
        if (length > 0) {
            return { index: i, length };
        }
    }
    return null;
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

const appendBytes = (base: Uint8Array, extra: Uint8Array): Uint8Array => {
    if (!base.length) return extra;
    if (!extra.length) return base;
    const out = new Uint8Array(base.length + extra.length);
    out.set(base, 0);
    out.set(extra, base.length);
    return out;
};

const toHexPreview = (bytes: Uint8Array, maxLen = 20): string => {
    if (!bytes.length) return '-';
    const clipped = bytes.subarray(0, maxLen);
    const parts = Array.from(clipped).map((value) => value.toString(16).padStart(2, '0').toUpperCase());
    return bytes.length > maxLen ? `${parts.join(' ')} ...` : parts.join(' ');
};

const toRbsp = (ebsp: Uint8Array): Uint8Array => {
    const out: number[] = [];
    for (let i = 0; i < ebsp.length; i += 1) {
        if (i >= 2 && ebsp[i] === 0x03 && ebsp[i - 1] === 0x00 && ebsp[i - 2] === 0x00) {
            continue;
        }
        out.push(ebsp[i]);
    }
    return new Uint8Array(out);
};

class BitReader {
    private readonly data: Uint8Array;
    private bitOffset = 0;

    constructor(data: Uint8Array) {
        this.data = data;
    }

    readBit(): number {
        if (this.bitOffset >= this.data.length * 8) throw new Error('bit overflow');
        const byte = this.data[this.bitOffset >> 3];
        const bit = 7 - (this.bitOffset & 7);
        this.bitOffset += 1;
        return (byte >> bit) & 1;
    }

    readUE(): number {
        let zeroCount = 0;
        while (this.readBit() === 0) {
            zeroCount += 1;
            if (zeroCount > 31) throw new Error('ue overflow');
        }
        let value = 1;
        for (let i = 0; i < zeroCount; i += 1) {
            value = (value << 1) | this.readBit();
        }
        return value - 1;
    }
}

const getNalType = (nal: Uint8Array): number => {
    const startLen = startCodeLengthAt(nal, 0);
    if (!startLen || startLen >= nal.length) return -1;
    return nal[startLen] & 0x1f;
};

const getNalPayload = (nal: Uint8Array): Uint8Array => {
    const startLen = startCodeLengthAt(nal, 0);
    if (!startLen || startLen + 1 >= nal.length) return new Uint8Array(0);
    return nal.subarray(startLen + 1);
};

const isVclNal = (nalType: number): boolean => nalType >= 1 && nalType <= 5;

const isFirstSlice = (nal: Uint8Array): boolean => {
    try {
        const payload = getNalPayload(nal);
        if (!payload.length) return true;
        const rbsp = toRbsp(payload);
        if (!rbsp.length) return true;
        const reader = new BitReader(rbsp);
        const firstMbInSlice = reader.readUE();
        return firstMbInSlice === 0;
    } catch {
        return true;
    }
};

const parseAvcCodecFromSps = (nal: Uint8Array): string | null => {
    const payload = getNalPayload(nal);
    if (payload.length < 3) return null;
    const rbsp = toRbsp(payload);
    if (rbsp.length < 3) return null;
    const h = (value: number) => value.toString(16).padStart(2, '0');
    return `avc1.${h(rbsp[0])}${h(rbsp[1])}${h(rbsp[2])}`;
};

const postWorkerMessage = (message: WorkerOutMessage) => {
    (self as { postMessage: (data: WorkerOutMessage) => void }).postMessage(message);
};

const postStats = () => {
    postWorkerMessage({
        type: 'stats',
        rawUpdateCount,
        lastRawLength,
        lastPacketHeader,
        lastPacketSequence,
        lastPayloadPreviewHex,
        lastReceivedAtText,
        packetCount,
        droppedPackets,
        parserErrors,
        frameBufferLength,
        streamBufferLength,
        accessUnitBufferLength,
        rawFrameCountHint,
        rawTrailingBytesHint,
        alignedFrameCount,
        syncSearchCount,
        gapResetCount,
        parserResetCount,
        codecResetCount,
        waitForKeyframe,
        keyframeSyncAcquired,
        lastResetReason,
        frameSyncState,
    });
};

const emitReset = (reason: string) => {
    lastResetReason = reason;
    waitForKeyframe = true;
    keyframeSyncAcquired = false;
    postWorkerMessage({
        type: 'reset',
        reason,
        gapResetCount,
        parserResetCount,
        codecResetCount,
        waitForKeyframe,
    });
};

const emitCodec = (codec: string) => {
    if (!codec || codec === lastCodec) return;
    lastCodec = codec;
    postWorkerMessage({ type: 'codec', codec, source: 'sps' });
};

const emitAccessUnit = (nals: Uint8Array[], hasVcl: boolean) => {
    if (!hasVcl || !nals.length) return;
    const isKey = nals.some((nal) => getNalType(nal) === 5);
    if (isKey) {
        keyframeSyncAcquired = true;
        waitForKeyframe = false;
    }
    if (waitForKeyframe) return; // Drop until keyframe

    const data = concatBytes(nals);
    const transferable = data.buffer;
    (self as { postMessage: (data: WorkerOutMessage, transfer?: Transferable[]) => void }).postMessage(
        {
            type: 'au',
            data: transferable,
            isKey,
        },
        [transferable]
    );
};

const flushPendingAccessUnit = () => {
    if (!pendingAccessUnit.length) return;
    const nals = pendingAccessUnit;
    const hasVcl = pendingHasVcl;
    pendingAccessUnit = [];
    pendingHasVcl = false;
    pendingBytes = 0;
    emitAccessUnit(nals, hasVcl);
};

const handleNal = (nal: Uint8Array) => {
    const nalType = getNalType(nal);
    if (nalType < 0) return;

    if (nalType === 7) {
        const codec = parseAvcCodecFromSps(nal);
        if (codec) emitCodec(codec);
    }

    if (nalType === 9 && pendingAccessUnit.length) {
        flushPendingAccessUnit();
    }

    if (isVclNal(nalType)) {
        const firstSlice = isFirstSlice(nal);
        if (pendingHasVcl && firstSlice) {
            flushPendingAccessUnit();
        }
        pendingHasVcl = true;
        pendingAccessUnit.push(nal);
        pendingBytes += nal.length;
    } else {
        if (pendingHasVcl && (nalType === 6 || nalType === 7 || nalType === 8 || nalType === 9)) {
            flushPendingAccessUnit();
        }
        pendingAccessUnit.push(nal);
        pendingBytes += nal.length;
    }

    if (pendingBytes > MAX_ACCESS_UNIT_BYTES) {
        flushPendingAccessUnit();
    }
};

const extractNalUnits = (): Uint8Array[] => {
    const first = findStartCode(streamBuffer, 0);
    if (!first) {
        if (streamBuffer.length > 4) {
            streamBuffer = streamBuffer.slice(streamBuffer.length - 4);
        }
        return [];
    }

    let start = first.index;
    let cursor = first.index + first.length;
    const out: Uint8Array[] = [];

    while (true) {
        const next = findStartCode(streamBuffer, cursor);
        if (!next) break;
        out.push(streamBuffer.slice(start, next.index));
        start = next.index;
        cursor = next.index + next.length;
    }

    streamBuffer = streamBuffer.slice(start);
    streamBufferLength = streamBuffer.length;
    syncSearchCount++;
    return out;
};

const appendStreamPayload = (payload: Uint8Array) => {
    streamBuffer = appendBytes(streamBuffer, payload);
    streamBufferLength = streamBuffer.length;
    if (streamBuffer.length > MAX_STREAM_BUFFER_BYTES) {
        parserErrors += 1;
        parserResetCount += 1;
        streamBuffer = streamBuffer.slice(streamBuffer.length - MAX_STREAM_BUFFER_BYTES);
        streamBufferLength = streamBuffer.length;
        emitReset('stream_buffer_overflow');
    }

    const nalUnits = extractNalUnits();
    for (const nal of nalUnits) {
        handleNal(nal);
    }
};

const parseCustomFrame = (frame: Uint8Array, index: number, totalFrames: number) => {
    alignedFrameCount += 1;
    if (frame.length < FRAME_SIZE) {
        parserErrors += 1;
        droppedPackets += 1;
        console.log(`[Worker] Invalid frame length: ${frame.length}`);
        return;
    }

    const headerValid = frame[0] === FRAME_HEADER_0 && frame[1] === FRAME_HEADER_1;
    if (!headerValid) {
        parserErrors += 1;
        droppedPackets += 1;
        console.log(`[Worker] Invalid header: 0x${frame[0].toString(16)} 0x${frame[1].toString(16)}`);
        return;
    }

    packetCount += 1;
    lastPacketHeader = frame[0];
    const seq = frame[2] | (frame[3] << 8);
    lastPacketSequence = seq;

    let isReset = false;
    let isLoss = false;
    if (expectedSequence !== null && expectedSequence !== seq) {
        isLoss = true;
        gapResetCount += 1;
        streamBuffer = new Uint8Array(0);
        streamBufferLength = 0;
        pendingAccessUnit = [];
        pendingHasVcl = false;
        pendingBytes = 0;
        isReset = true;
        emitReset(`sequence_gap_${expectedSequence}_to_${seq}`);
    }
    
    expectedSequence = (seq + 1) & 0xffff;

    const payload = frame.subarray(FRAME_VIDEO_OFFSET, FRAME_VIDEO_OFFSET + FRAME_VIDEO_BYTES);
    const reserved = frame.subarray(FRAME_RESERVED_OFFSET, FRAME_RESERVED_OFFSET + FRAME_RESERVED_BYTES);
    const crc16 = frame.subarray(FRAME_CRC_OFFSET, FRAME_CRC_OFFSET + FRAME_CRC_BYTES);
    if (reserved.length !== FRAME_RESERVED_BYTES || crc16.length !== FRAME_CRC_BYTES) {
        parserErrors += 1;
        droppedPackets += 1;
        return;
    }

    if (index === 0 || isReset || totalFrames <= 2) {
        console.log(`[Worker] MQTT Payload: len=${totalFrames * FRAME_SIZE}, HeaderValid=${headerValid}, Seq=${seq}, ExpectedSeq=${isReset ? 'gap' : expectedSequence}, PayloadLen=${payload.length}, Loss=${isLoss}, Reset=${isReset}`);
    }

    // 保留区与 crc16 在上层 store 里展示，这里仅提取图传段并继续 H264 解析。
    appendStreamPayload(payload);
};

const ingestCustomBytes = (bytes: Uint8Array) => {
    if (!bytes.length) return;

    rawUpdateCount += 1;
    lastRawLength = bytes.length;
    if (bytes.length >= 1) {
        lastPacketHeader = bytes[0];
    }
    lastPacketSequence = null;
    lastPayloadPreviewHex = toHexPreview(bytes);
    lastReceivedAtText = new Date().toLocaleTimeString();

    if (bytes.length >= FRAME_SIZE) {
        const frameCountInBlob = Math.floor(bytes.length / FRAME_SIZE);
        const blobStart = bytes.length - frameCountInBlob * FRAME_SIZE;
        rawFrameCountHint = frameCountInBlob;
        rawTrailingBytesHint = blobStart;
        for (let i = 0; i < frameCountInBlob; i += 1) {
            const start = blobStart + i * FRAME_SIZE;
            parseCustomFrame(bytes.subarray(start, start + FRAME_SIZE), i, frameCountInBlob);
        }
        return;
    }

    if (bytes.length === FRAME_VIDEO_BYTES) {
        appendStreamPayload(bytes);
        return;
    }

    parserErrors += 1;
};

const toByteArray = (input: unknown): Uint8Array | null => {
    if (!input) return null;
    if (input instanceof Uint8Array) return input;
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    return null;
};

const workerGlobal = self as {
    onmessage: ((event: MessageEvent<WorkerInMessage>) => void) | null;
};

workerGlobal.onmessage = (event: MessageEvent<WorkerInMessage>) => {
    const message = event.data;
    if (!message || message.type !== 'chunk') return;

    const bytes = toByteArray(message.bytes);
    if (!bytes) {
        parserErrors += 1;
        postStats();
        return;
    }

    ingestCustomBytes(bytes);
    postStats();
};

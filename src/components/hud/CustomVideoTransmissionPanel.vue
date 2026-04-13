<template>
    <div ref="wrapperRef" class="custom-video-panel">
        <canvas ref="canvasRef" class="video-canvas"></canvas>

        <div v-if="unsupportedReason" class="placeholder">
            {{ unsupportedReason }}
        </div>
        <div v-else-if="!isStreaming" class="placeholder">
            等待 CustomByteBlock 图传...
        </div>

        <div class="status-overlay">
            <span class="status-pill" :class="{ online: isStreaming, offline: !isStreaming }">
                {{ isStreaming ? '解码中' : '等待中' }}
            </span>
            <span class="status-item">FPS {{ decodedFps }}</span>
            <span class="status-item">Seq 丢包 {{ droppedPackets }}</span>
            <span class="status-item">包数 {{ packetCount }}</span>
            <span class="status-item">解析错 {{ parserErrors }}</span>
            <span class="status-item">解码错 {{ decoderErrors }}</span>
        </div>

        <div class="debug-overlay">
            <div class="debug-title">CustomByteBlock 原始数据</div>
            <div class="debug-row">更新次数: {{ rawUpdateCount }}</div>
            <div class="debug-row">最近长度: {{ lastRawLength }} bytes</div>
            <div class="debug-row">最近包头: {{ lastPacketHeaderHex }}</div>
            <div class="debug-row">最近序号: {{ lastPacketSequenceDisplay }}</div>
            <div class="debug-row">最近更新: {{ lastReceivedAtText }}</div>
            <div class="debug-row">HEX预览: {{ lastPayloadPreviewHex }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRobotStore } from '@/stores/robotData';

const PACKET_HEADER = 0xA4;
const PACKET_SIZE = 254;
const PACKET_PAYLOAD_SIZE = 250;
const TARGET_FPS = 60;
const FRAME_INTERVAL_US = Math.floor(1_000_000 / TARGET_FPS);
const MAX_STREAM_BUFFER_BYTES = 2 * 1024 * 1024;
const MAX_ACCESS_UNIT_BYTES = 512 * 1024;

const robotStore = useRobotStore();
const wrapperRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const unsupportedReason = ref('');
const isStreaming = ref(false);
const decodedFps = ref(0);
const packetCount = ref(0);
const droppedPackets = ref(0);
const parserErrors = ref(0);
const decoderErrors = ref(0);
const rawUpdateCount = ref(0);
const lastRawLength = ref(0);
const lastPacketHeader = ref<number | null>(null);
const lastPacketSequence = ref<number | null>(null);
const lastPayloadPreviewHex = ref('-');
const lastReceivedAtText = ref('-');

const lastPacketHeaderHex = computed(() => {
    if (lastPacketHeader.value === null) return '-';
    return `0x${lastPacketHeader.value.toString(16).padStart(2, '0').toUpperCase()}`;
});

const lastPacketSequenceDisplay = computed(() => {
    if (lastPacketSequence.value === null) return '-';
    return `${lastPacketSequence.value}`;
});

let ctx: CanvasRenderingContext2D | null = null;
let resizeObserver: ResizeObserver | null = null;
let streamTimer: ReturnType<typeof setTimeout> | null = null;
let fpsTimer: ReturnType<typeof setInterval> | null = null;
let decoder: VideoDecoder | null = null;
let currentCodec = '';
let expectedSequence: number | null = null;
let streamBuffer: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
let pendingAccessUnit: Uint8Array[] = [];
let pendingHasVcl = false;
let pendingBytes = 0;
let decodedFrameCount = 0;
let fpsWindowStart = 0;
let frameIndex = 0;
let syncedToKeyFrame = false;

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

const markStreaming = () => {
    isStreaming.value = true;
    if (streamTimer) clearTimeout(streamTimer);
    streamTimer = setTimeout(() => {
        isStreaming.value = false;
    }, 1500);
};

const updateCanvasSize = () => {
    const wrapper = wrapperRef.value;
    const canvas = canvasRef.value;
    if (!wrapper || !canvas || !ctx) return;

    const width = Math.max(1, Math.floor(wrapper.clientWidth));
    const height = Math.max(1, Math.floor(wrapper.clientHeight));
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const closeDecoder = () => {
    if (decoder && decoder.state !== 'closed') {
        decoder.close();
    }
    decoder = null;
    syncedToKeyFrame = false;
};

const parseAvcCodecFromSps = (nal: Uint8Array): string | null => {
    const payload = getNalPayload(nal);
    if (payload.length < 3) return null;
    const rbsp = toRbsp(payload);
    if (rbsp.length < 3) return null;
    const h = (value: number) => value.toString(16).padStart(2, '0');
    return `avc1.${h(rbsp[0])}${h(rbsp[1])}${h(rbsp[2])}`;
};

const createDecoder = (codec: string): boolean => {
    if (!ctx) return false;

    closeDecoder();

    try {
        decoder = new VideoDecoder({
            output: (frame) => {
                if (ctx && canvasRef.value) {
                    ctx.drawImage(frame, 0, 0, canvasRef.value.clientWidth, canvasRef.value.clientHeight);
                    decodedFrameCount += 1;
                    markStreaming();
                }
                frame.close();
            },
            error: (error) => {
                decoderErrors.value += 1;
                syncedToKeyFrame = false;
                console.error('Custom HUD VideoDecoder error:', error);
            },
        });

        decoder.configure({
            codec,
            optimizeForLatency: true,
            hardwareAcceleration: 'prefer-hardware',
        });

        currentCodec = codec;
        frameIndex = 0;
        syncedToKeyFrame = false;
        return true;
    } catch (error) {
        closeDecoder();
        console.warn(`Custom HUD decoder configure failed: ${codec}`, error);
        return false;
    }
};

const ensureDecoderFromSps = (nal: Uint8Array) => {
    const parsedCodec = parseAvcCodecFromSps(nal);
    if (!parsedCodec) return;
    if (decoder && decoder.state === 'configured' && currentCodec === parsedCodec) return;

    const codecCandidates = [
        parsedCodec,
        'avc1.640034',
        'avc1.640033',
        'avc1.640032',
        'avc1.4d0032',
        'avc1.42e01e',
    ];

    for (const candidate of codecCandidates) {
        if (createDecoder(candidate)) {
            unsupportedReason.value = '';
            return;
        }
    }

    unsupportedReason.value = '当前环境无法配置 H264 解码器';
};

const decodeAccessUnit = (nals: Uint8Array[], hasVcl: boolean) => {
    if (!hasVcl || !nals.length) return;
    if (!decoder || decoder.state !== 'configured') return;

    const isKey = nals.some((nal) => getNalType(nal) === 5);
    if (!syncedToKeyFrame && !isKey) return;
    if (isKey) syncedToKeyFrame = true;

    const data = concatBytes(nals);

    try {
        decoder.decode(
            new EncodedVideoChunk({
                type: isKey ? 'key' : 'delta',
                timestamp: frameIndex * FRAME_INTERVAL_US,
                data,
            })
        );
        frameIndex += 1;
    } catch (error) {
        decoderErrors.value += 1;
        syncedToKeyFrame = false;
        console.warn('Custom HUD decode chunk failed:', error);
    }
};

const flushPendingAccessUnit = () => {
    if (!pendingAccessUnit.length) return;
    const nals = pendingAccessUnit;
    const hasVcl = pendingHasVcl;
    pendingAccessUnit = [];
    pendingHasVcl = false;
    pendingBytes = 0;
    decodeAccessUnit(nals, hasVcl);
};

const handleNal = (nal: Uint8Array) => {
    const nalType = getNalType(nal);
    if (nalType < 0) return;

    if (nalType === 7) {
        ensureDecoderFromSps(nal);
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
    return out;
};

const appendStreamPayload = (payload: Uint8Array) => {
    streamBuffer = appendBytes(streamBuffer, payload);
    if (streamBuffer.length > MAX_STREAM_BUFFER_BYTES) {
        parserErrors.value += 1;
        streamBuffer = streamBuffer.slice(streamBuffer.length - MAX_STREAM_BUFFER_BYTES);
    }

    const nalUnits = extractNalUnits();
    for (const nal of nalUnits) {
        handleNal(nal);
    }
};

const parseCustomPacket = (packet: Uint8Array) => {
    if (packet.length < PACKET_SIZE) {
        parserErrors.value += 1;
        return;
    }

    if (packet[0] !== PACKET_HEADER) {
        parserErrors.value += 1;
        return;
    }

    packetCount.value += 1;
    lastPacketHeader.value = packet[0];

    const sequence = packet[1];
    lastPacketSequence.value = sequence;
    if (expectedSequence !== null) {
        const gap = (sequence - expectedSequence + 256) % 256;
        if (gap !== 0) {
            droppedPackets.value += gap;
        }
    }
    expectedSequence = (sequence + 1) % 256;

    const payload = packet.subarray(2, 2 + PACKET_PAYLOAD_SIZE);
    appendStreamPayload(payload);
};

const ingestCustomBytes = (bytes: Uint8Array) => {
    if (!bytes.length) return;

    rawUpdateCount.value += 1;
    lastRawLength.value = bytes.length;
    if (bytes.length >= 1) {
        lastPacketHeader.value = bytes[0];
    }
    if (bytes.length >= 2) {
        lastPacketSequence.value = bytes[1];
    }
    lastPayloadPreviewHex.value = toHexPreview(bytes);
    lastReceivedAtText.value = new Date().toLocaleTimeString();

    if (bytes.length >= PACKET_SIZE && bytes[0] === PACKET_HEADER) {
        const packetCountInBlob = Math.floor(bytes.length / PACKET_SIZE);
        for (let i = 0; i < packetCountInBlob; i += 1) {
            const start = i * PACKET_SIZE;
            parseCustomPacket(bytes.subarray(start, start + PACKET_SIZE));
        }
        return;
    }

    if (bytes.length === PACKET_PAYLOAD_SIZE) {
        appendStreamPayload(bytes);
        return;
    }

    parserErrors.value += 1;
    appendStreamPayload(bytes);
};

const toByteArray = (input: unknown): Uint8Array | null => {
    if (!input) return null;
    if (input instanceof Uint8Array) return input;
    if (Array.isArray(input)) {
        const valid = input.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
        return valid ? new Uint8Array(input as number[]) : null;
    }
    if (typeof input === 'string') {
        try {
            const bin = atob(input);
            const out = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i += 1) {
                out[i] = bin.charCodeAt(i);
            }
            return out;
        } catch {
            return null;
        }
    }
    return null;
};

const startFpsSampler = () => {
    if (fpsTimer) return;
    decodedFrameCount = 0;
    decodedFps.value = 0;
    fpsWindowStart = performance.now();
    fpsTimer = setInterval(() => {
        const now = performance.now();
        const elapsed = Math.max(1, now - fpsWindowStart);
        decodedFps.value = Math.round((decodedFrameCount * 1000) / elapsed);
        decodedFrameCount = 0;
        fpsWindowStart = now;
    }, 500);
};

const stopFpsSampler = () => {
    if (!fpsTimer) return;
    clearInterval(fpsTimer);
    fpsTimer = null;
    decodedFps.value = 0;
    decodedFrameCount = 0;
};

let stopDataWatch: (() => void) | null = null;

onMounted(() => {
    if (typeof VideoDecoder === 'undefined' || typeof EncodedVideoChunk === 'undefined') {
        unsupportedReason.value = '当前运行环境不支持 WebCodecs';
        return;
    }

    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) {
        unsupportedReason.value = '无法初始化视频画布';
        return;
    }

    updateCanvasSize();

    if ('ResizeObserver' in window && wrapperRef.value) {
        resizeObserver = new ResizeObserver(() => updateCanvasSize());
        resizeObserver.observe(wrapperRef.value);
    }

    startFpsSampler();

    stopDataWatch = watch(
        () => robotStore.robot.CustomByteBlockData?.data,
        (rawData) => {
            const bytes = toByteArray(rawData);
            if (!bytes) return;
            ingestCustomBytes(bytes);
        }
    );
});

onUnmounted(() => {
    if (stopDataWatch) {
        stopDataWatch();
        stopDataWatch = null;
    }

    if (streamTimer) {
        clearTimeout(streamTimer);
        streamTimer = null;
    }

    stopFpsSampler();

    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }

    flushPendingAccessUnit();
    closeDecoder();
    ctx = null;
});
</script>

<style scoped lang="sass">
.custom-video-panel
    position: relative
    width: 100%
    height: 100%
    min-width: 220px
    min-height: 140px
    overflow: hidden
    border-radius: 12px
    background: radial-gradient(circle at 30% 20%, rgba(65, 95, 145, 0.24), rgba(4, 8, 20, 0.92) 58%)

.video-canvas
    width: 100%
    height: 100%
    display: block

.placeholder
    position: absolute
    inset: 0
    display: flex
    align-items: center
    justify-content: center
    color: rgba(230, 238, 255, 0.82)
    font-size: 12px
    letter-spacing: 0.04em
    background: linear-gradient(120deg, rgba(8, 12, 28, 0.75), rgba(10, 36, 52, 0.55))

.status-overlay
    position: absolute
    left: 8px
    right: 8px
    bottom: 8px
    display: flex
    flex-wrap: wrap
    gap: 6px
    pointer-events: none

.status-pill,
.status-item
    height: 20px
    padding: 0 8px
    border-radius: 999px
    font-size: 11px
    line-height: 20px
    letter-spacing: 0.02em
    background: rgba(5, 10, 22, 0.62)
    border: 1px solid rgba(183, 212, 255, 0.24)
    color: rgba(236, 245, 255, 0.92)

.status-pill.online
    border-color: rgba(117, 255, 174, 0.52)
    color: rgba(151, 255, 199, 0.96)

.status-pill.offline
    border-color: rgba(255, 138, 138, 0.45)
    color: rgba(255, 166, 166, 0.96)

.debug-overlay
    position: absolute
    left: 8px
    top: 8px
    max-width: min(92%, 520px)
    padding: 10px 12px
    border-radius: 10px
    border: 1px solid rgba(150, 210, 255, 0.28)
    background: rgba(3, 8, 18, 0.68)
    color: rgba(234, 244, 255, 0.94)
    font-size: 11px
    line-height: 1.35
    letter-spacing: 0.02em
    pointer-events: none

.debug-title
    margin-bottom: 4px
    font-weight: 600
    color: rgba(164, 213, 255, 0.98)

.debug-row
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>

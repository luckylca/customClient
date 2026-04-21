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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { customByteBlockStream } from '@/services/CustomByteBlockStream';

const TARGET_FPS = 60;
const FRAME_INTERVAL_US = Math.floor(1_000_000 / TARGET_FPS);

type ParserWorkerInMessage = {
    type: 'chunk';
    bytes: ArrayBuffer;
};

type ParserWorkerStatsMessage = {
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
};

type ParserWorkerCodecMessage = {
    type: 'codec';
    codec: string;
};

type ParserWorkerAccessUnitMessage = {
    type: 'au';
    data: ArrayBuffer;
    isKey: boolean;
};

type ParserWorkerOutMessage = ParserWorkerStatsMessage | ParserWorkerCodecMessage | ParserWorkerAccessUnitMessage;

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
let parserWorker: Worker | null = null;
let stopStreamSubscription: (() => void) | null = null;
let currentCodec = '';
let decodedFrameCount = 0;
let fpsWindowStart = 0;
let frameIndex = 0;
let syncedToKeyFrame = false;

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

const ensureDecoderFromCodec = (codecHint: string) => {
    if (decoder && decoder.state === 'configured' && currentCodec === codecHint) return;

    const codecCandidates = [
        codecHint,
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

const decodeAccessUnit = (data: Uint8Array, isKey: boolean) => {
    if (!data.length) return;
    if (!decoder || decoder.state !== 'configured') return;

    if (!syncedToKeyFrame && !isKey) return;
    if (isKey) syncedToKeyFrame = true;

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

const handleWorkerMessage = (event: MessageEvent<ParserWorkerOutMessage>) => {
    const message = event.data;
    if (!message) return;

    if (message.type === 'stats') {
        rawUpdateCount.value = message.rawUpdateCount;
        lastRawLength.value = message.lastRawLength;
        lastPacketHeader.value = message.lastPacketHeader;
        lastPacketSequence.value = message.lastPacketSequence;
        lastPayloadPreviewHex.value = message.lastPayloadPreviewHex;
        lastReceivedAtText.value = message.lastReceivedAtText;
        packetCount.value = message.packetCount;
        droppedPackets.value = message.droppedPackets;
        parserErrors.value = message.parserErrors;
        return;
    }

    if (message.type === 'codec') {
        ensureDecoderFromCodec(message.codec);
        return;
    }

    if (message.type === 'au') {
        decodeAccessUnit(new Uint8Array(message.data), message.isKey);
    }
};

const handleWorkerError = (error: ErrorEvent) => {
    parserErrors.value += 1;
    console.error('Custom HUD parser worker error:', error);
};

const postChunkToWorker = (bytes: Uint8Array) => {
    if (!parserWorker) return;
    if (!bytes.length) return;
    const transferable = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    const payload: ParserWorkerInMessage = {
        type: 'chunk',
        bytes: transferable,
    };
    parserWorker.postMessage(payload, [transferable]);
};

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

    parserWorker = new Worker(new URL('../../workers/customVideoParser.worker.ts', import.meta.url), {
        type: 'module',
    });
    parserWorker.addEventListener('message', handleWorkerMessage);
    parserWorker.addEventListener('error', handleWorkerError);

    stopStreamSubscription = customByteBlockStream.subscribe((bytes) => {
        postChunkToWorker(bytes);
    });
});

onUnmounted(() => {
    if (stopStreamSubscription) {
        stopStreamSubscription();
        stopStreamSubscription = null;
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

    if (parserWorker) {
        parserWorker.removeEventListener('message', handleWorkerMessage);
        parserWorker.removeEventListener('error', handleWorkerError);
        parserWorker.terminate();
        parserWorker = null;
    }

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

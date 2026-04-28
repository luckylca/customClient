<template>
    <div ref="wrapperRef" class="custom-video-panel">
        <canvas ref="canvasRef" class="video-canvas"></canvas>

        <div v-if="unsupportedReason" class="placeholder">
            {{ unsupportedReason }}
        </div>

        <!-- 关键：已经解出帧后，不再用 placeholder 覆盖 canvas -->
        <div v-else-if="!hasDecodedFrame && !isStreaming" class="placeholder">
            等待 CustomByteBlock 图传...
        </div>

        <div v-show="showDebugPanel" class="status-overlay">
            <span class="status-pill" :class="statusClass">
                {{ streamStatusText }}
            </span>

            <span class="status-item">FPS {{ decodedFps }}</span>
            <span class="status-item">包数 {{ packetCount }}</span>
            <span class="status-item">丢包 {{ droppedPackets }}</span>
            <span class="status-item">丢包率 {{ packetLossRate }}</span>
            <span class="status-item">解析错 {{ parserErrors }}</span>
            <span class="status-item">解码错 {{ decoderErrors }}</span>
            <span class="status-item">Codec {{ codecDisplay }}</span>
            <span class="status-item">关键帧 {{ syncedToKeyFrame ? "已同步" : "未同步" }}</span>
        </div>

        <div v-show="showDebugPanel" class="debug-overlay">
            <div class="debug-title">CustomByteBlock / H264 状态</div>
            <div class="debug-row">视频结论: {{ decodeSummary }}</div>
            <div class="debug-row">更新次数: {{ rawUpdateCount }}</div>
            <div class="debug-row">最近长度: {{ lastRawLength }} bytes</div>
            <div class="debug-row">最近包头: {{ lastPacketHeaderHex }}</div>
            <div class="debug-row">最近序号: {{ lastPacketSequenceDisplay }}</div>
            <div class="debug-row">最近更新: {{ lastReceivedAtText }}</div>
            <div class="debug-row">当前 Codec: {{ codecDisplay }}</div>
            <div class="debug-row">HEX预览: {{ lastPayloadPreviewHex }}</div>

            <div class="debug-title second">画面诊断</div>
            <div class="debug-row">VideoFrame: {{ frameSizeText }}</div>
            <div class="debug-row">Canvas: {{ canvasSizeText }}</div>
            <div class="debug-row">中心亮度: {{ avgBrightnessText }}</div>
            <div class="debug-row">绘制状态: {{ drawDebugText }}</div>
        </div>

        <div v-show="showDebugPanel" class="health-overlay" :class="healthClass">
            {{ decodeHealthHint }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { customByteBlockStream } from "@/services/CustomByteBlockStream";

const TARGET_FPS = 10;
const FRAME_INTERVAL_US = Math.floor(1_000_000 / TARGET_FPS);

type ParserWorkerStatsMessage = {
    type: "stats";
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
    type: "codec";
    codec: string;
};

type ParserWorkerAccessUnitMessage = {
    type: "au";
    data: ArrayBuffer;
    isKey: boolean;
};

type ParserWorkerOutMessage =
    | ParserWorkerStatsMessage
    | ParserWorkerCodecMessage
    | ParserWorkerAccessUnitMessage;

const wrapperRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const unsupportedReason = ref("");
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
const lastPayloadPreviewHex = ref("-");
const lastReceivedAtText = ref("-");
const detectedCodec = ref("-");
const hasDecodedFrame = ref(false);
const keyframeSeen = ref(false);
const lastDecodeAtText = ref("-");
const syncedToKeyFrame = ref(false);

const frameSizeText = ref("-");
const canvasSizeText = ref("-");
const avgBrightnessText = ref("-");
const drawDebugText = ref("尚未绘制");

const showDebugPanel = ref(false);
const handleToggleDebugPanel = () => {
    showDebugPanel.value = !showDebugPanel.value;
};

const decoderConfigured = computed(() => {
    return !!decoder && decoder.state === "configured";
});

const codecDisplay = computed(() => {
    return detectedCodec.value || "-";
});

const packetLossRate = computed(() => {
    const totalExpected = packetCount.value + droppedPackets.value;

    if (totalExpected === 0) return "0.00%";

    return ((droppedPackets.value / totalExpected) * 100).toFixed(2) + "%";
});

const streamStatusText = computed(() => {
    if (unsupportedReason.value) return "环境不支持";
    if (hasDecodedFrame.value && isStreaming.value) return "视频正常";
    if (hasDecodedFrame.value) return "已出图";
    if (decoderConfigured.value && keyframeSeen.value) return "等待出图";
    if (decoderConfigured.value) return "等待关键帧";
    if (packetCount.value > 0) return "收到码流";
    return "等待中";
});

const statusClass = computed(() => {
    if (unsupportedReason.value) return "offline";
    if (hasDecodedFrame.value) return "online";
    if (decoderErrors.value > 0 || parserErrors.value > 0) return "warning";
    if (packetCount.value > 0) return "warning";
    return "offline";
});

const decodeSummary = computed(() => {
    if (unsupportedReason.value) return unsupportedReason.value;

    if (hasDecodedFrame.value && isStreaming.value) {
        if (avgBrightnessText.value !== "-" && Number(avgBrightnessText.value) < 5) {
            return "WebCodecs 已输出 VideoFrame，但画面亮度接近 0，疑似黑帧";
        }

        return "H264 已成功解码并绘制到 Canvas";
    }

    if (hasDecodedFrame.value) {
        return "曾经成功出图，当前等待新帧";
    }

    if (decoderConfigured.value && syncedToKeyFrame.value) {
        return "已经配置解码器，正在投喂画面";
    }

    if (decoderConfigured.value && !syncedToKeyFrame.value) {
        return "已经配置解码器，正在等待完整 SPS/PPS/IDR 关键帧";
    }

    if (packetCount.value > 0 && detectedCodec.value !== "-") {
        return "已经识别到 H264 码流，正在等待有效画帧";
    }

    if (packetCount.value > 0) {
        return "已经收到数据，正在解析流";
    }

    return "暂无数据流入";
});

const decodeHealthHint = computed(() => {
    if (unsupportedReason.value) return unsupportedReason.value;

    if (hasDecodedFrame.value && isStreaming.value) {
        return `最近成功出图: ${lastDecodeAtText.value} | ${drawDebugText.value}`;
    }

    if (hasDecodedFrame.value) {
        return `已解出过画面: ${lastDecodeAtText.value} | ${drawDebugText.value}`;
    }

    if (decoderErrors.value > 0) {
        return "解码器异常，已自动重置，等待下一个完整关键帧";
    }

    if (parserErrors.value > 0) {
        return "解析错误，可能存在丢包、乱序或码流损坏";
    }

    if (keyframeSeen.value) {
        return "正在解码出图...";
    }

    if (packetCount.value > 0) {
        return "有码流输入，等待完整 SPS/PPS/IDR 关键帧中...";
    }

    return "暂无图传输入";
});

const healthClass = computed(() => {
    if (hasDecodedFrame.value && isStreaming.value) {
        if (avgBrightnessText.value !== "-" && Number(avgBrightnessText.value) < 5) {
            return "error";
        }

        return "ok";
    }

    if (decoderErrors.value > 0 || parserErrors.value > 0) return "error";

    return "idle";
});

const lastPacketHeaderHex = computed(() => {
    return lastPacketHeader.value === null
        ? "-"
        : `0x${lastPacketHeader.value.toString(16).padStart(2, "0").toUpperCase()}`;
});

const lastPacketSequenceDisplay = computed(() => {
    return lastPacketSequence.value === null ? "-" : `${lastPacketSequence.value}`;
});

let ctx: CanvasRenderingContext2D | null = null;
let resizeObserver: ResizeObserver | null = null;
let streamTimer: ReturnType<typeof setTimeout> | null = null;
let fpsTimer: ReturnType<typeof setInterval> | null = null;
let decoder: VideoDecoder | null = null;
let parserWorker: Worker | null = null;
let stopStreamSubscription: (() => void) | null = null;

let currentCodec = "";
let decodedFrameCount = 0;
let fpsWindowStart = 0;
let frameIndex = 0;
let isConfiguring = false;

let pendingKeyAU: {
    data: Uint8Array;
    isKey: boolean;
} | null = null;

const markStreaming = () => {
    isStreaming.value = true;

    if (streamTimer) {
        clearTimeout(streamTimer);
    }

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

    canvasSizeText.value = `${width}x${height} css / ${canvas.width}x${canvas.height} px / dpr=${dpr.toFixed(2)}`;
};

const closeDecoder = () => {
    if (decoder && decoder.state !== "closed") {
        try {
            decoder.close();
        } catch {
            // ignore
        }
    }

    decoder = null;
    syncedToKeyFrame.value = false;
};

const sampleCanvasBrightness = (
    canvas: HTMLCanvasElement,
    cssWidth: number,
    cssHeight: number
): number | null => {
    if (!ctx) return null;

    try {
        const dpr = window.devicePixelRatio || 1;

        const sampleCssSize = 24;
        const samplePxSize = Math.max(4, Math.floor(sampleCssSize * dpr));

        const sampleX = Math.max(
            0,
            Math.min(
                canvas.width - samplePxSize,
                Math.floor((cssWidth / 2) * dpr - samplePxSize / 2)
            )
        );

        const sampleY = Math.max(
            0,
            Math.min(
                canvas.height - samplePxSize,
                Math.floor((cssHeight / 2) * dpr - samplePxSize / 2)
            )
        );

        const imageData = ctx.getImageData(sampleX, sampleY, samplePxSize, samplePxSize);
        const data = imageData.data;

        let total = 0;

        for (let i = 0; i < data.length; i += 4) {
            total += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }

        return total / (data.length / 4);
    } catch (error) {
        console.warn("[Custom HUD] 读取 Canvas 像素失败:", error);
        return null;
    }
};

const drawVideoFrame = (frame: VideoFrame) => {
    const canvas = canvasRef.value;

    if (!ctx || !canvas) {
        drawDebugText.value = "ctx 或 canvas 不存在";
        return;
    }

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    if (cssWidth <= 0 || cssHeight <= 0) {
        drawDebugText.value = "Canvas 显示尺寸为 0";
        console.warn("[Custom HUD] Canvas 显示尺寸为 0，无法绘制");
        return;
    }

    const frameWidth =
        frame.displayWidth ||
        frame.codedWidth ||
        frame.visibleRect?.width ||
        0;

    const frameHeight =
        frame.displayHeight ||
        frame.codedHeight ||
        frame.visibleRect?.height ||
        0;

    frameSizeText.value = `display=${frame.displayWidth}x${frame.displayHeight}, coded=${frame.codedWidth}x${frame.codedHeight}`;

    if (frameWidth <= 0 || frameHeight <= 0) {
        drawDebugText.value = "VideoFrame 宽高异常";
        return;
    }

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // 先填一个深灰底，避免透明/未绘制时误判
    ctx.fillStyle = "rgb(8, 12, 20)";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // 保持比例完整显示
    const scale = Math.min(cssWidth / frameWidth, cssHeight / frameHeight);

    const drawWidth = Math.max(1, frameWidth * scale);
    const drawHeight = Math.max(1, frameHeight * scale);
    const drawX = (cssWidth - drawWidth) / 2;
    const drawY = (cssHeight - drawHeight) / 2;

    ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight);

    // 绿色边框：只要你看到绿色框，就证明 Canvas 绘制路径正常
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, drawWidth, drawHeight);

    // 如果未开启调试面板（或限制频率采样），跳过高负担的像素回读
    if (!showDebugPanel.value) {
        avgBrightnessText.value = "-";
        drawDebugText.value = "已绘制（不采样亮度）";
        return;
    }

    const brightness = sampleCanvasBrightness(canvas, cssWidth, cssHeight);

    if (brightness === null) {
        avgBrightnessText.value = "-";
        drawDebugText.value = "已绘制，但无法读取中心亮度";
    } else {
        avgBrightnessText.value = brightness.toFixed(2);

        if (brightness < 5) {
            drawDebugText.value = "已绘制，但中心几乎全黑，疑似编码源黑帧/YUV 输入问题";
            console.warn(
                `[Custom HUD] 已绘制 VideoFrame，但中心平均亮度=${brightness.toFixed(2)}，疑似黑帧`
            );
        } else {
            drawDebugText.value = "已绘制，画面存在有效亮度";
        }
    }
};

const createDecoder = (codec: string): boolean => {
    if (!ctx) return false;

    closeDecoder();

    try {
        decoder = new VideoDecoder({
            output: frame => {
                try {
                    drawVideoFrame(frame);

                    decodedFrameCount += 1;
                    hasDecodedFrame.value = true;
                    lastDecodeAtText.value = new Date().toLocaleTimeString();
                    markStreaming();
                } finally {
                    frame.close();
                }
            },

            error: error => {
                decoderErrors.value += 1;
                syncedToKeyFrame.value = false;
                keyframeSeen.value = false;
                pendingKeyAU = null;

                console.warn(`[Custom HUD] 解码器底层报错[${codec}]:`, error);

                const codecToRecreate = currentCodec;

                closeDecoder();

                if (codecToRecreate) {
                    setTimeout(() => {
                        createDecoder(codecToRecreate);
                    }, 300);
                }
            },
        });

        const config: VideoDecoderConfig = {
            codec,

            // 低码率低分辨率，软件解码通常更稳
            // 如果你确认硬解更好，可以改成 "prefer-hardware"
            hardwareAcceleration: "prefer-software",

            optimizeForLatency: true,
        };

        // Annex B 模式不要传 description
        decoder.configure(config);

        currentCodec = codec;
        detectedCodec.value = codec;

        frameIndex = 0;
        syncedToKeyFrame.value = false;
        keyframeSeen.value = false;
        hasDecodedFrame.value = false;
        lastDecodeAtText.value = "-";

        frameSizeText.value = "-";
        avgBrightnessText.value = "-";
        drawDebugText.value = "解码器已创建，等待 VideoFrame";

        return true;
    } catch (error) {
        console.warn("[Custom HUD] 创建 VideoDecoder 失败:", error);
        closeDecoder();
        return false;
    }
};

const drainPendingKeyAU = () => {
    if (!pendingKeyAU) return;
    if (!decoder || decoder.state !== "configured") return;

    const item = pendingKeyAU;
    pendingKeyAU = null;

    decodeAccessUnit(item.data, item.isKey);
};

const ensureDecoderFromCodec = async (codecHint: string) => {
    if (isConfiguring) return;

    if (
        decoder &&
        decoder.state === "configured" &&
        currentCodec === codecHint
    ) {
        drainPendingKeyAU();
        return;
    }

    isConfiguring = true;

    const codecCandidates = Array.from(
        new Set([
            codecHint,
            "avc1.42e01e",
            "avc1.4d001f",
            "avc1.4d0032",
            "avc1.64001f",
            "avc1.640032",
            "avc1.640034",
        ])
    );

    let validCodec = "";

    for (const candidate of codecCandidates) {
        try {
            const support = await VideoDecoder.isConfigSupported({
                codec: candidate,
                hardwareAcceleration: "prefer-software",
                optimizeForLatency: true,
            });

            if (support.supported) {
                validCodec = candidate;
                break;
            }
        } catch {
            // try next
        }
    }

    if (validCodec) {
        const ok = createDecoder(validCodec);

        if (ok) {
            unsupportedReason.value = "";
            drainPendingKeyAU();
        } else {
            unsupportedReason.value = "VideoDecoder 初始化失败";
        }
    } else {
        unsupportedReason.value = "当前浏览器环境无法初始化 H264 解码器";
    }

    isConfiguring = false;
};

const resetDecoderAfterDecodeError = () => {
    try {
        if (decoder && decoder.state === "configured") {
            decoder.reset();
        }
    } catch {
        // ignore
    }

    syncedToKeyFrame.value = false;
    keyframeSeen.value = false;
    pendingKeyAU = null;
};

const decodeAccessUnit = (data: Uint8Array, isKey: boolean) => {
    if (!data.length) return;
    if (!decoder || decoder.state !== "configured") return;

    if (!syncedToKeyFrame.value) {
        if (!isKey) return;

        syncedToKeyFrame.value = true;
        keyframeSeen.value = true;
    }

    // 低延迟：队列太长时丢 delta，不丢 key
    if (!isKey && decoder.decodeQueueSize > 4) {
        return;
    }

    try {
        const chunk = new EncodedVideoChunk({
            type: isKey ? "key" : "delta",
            timestamp: frameIndex * FRAME_INTERVAL_US,
            data,
        });

        decoder.decode(chunk);
        frameIndex += 1;
    } catch (error) {
        decoderErrors.value += 1;

        console.warn("[Custom HUD] 执行 decode() 时报错:", error);

        resetDecoderAfterDecodeError();
    }
};

const tryDecodeOrQueue = (data: Uint8Array, isKey: boolean) => {
    if (!decoder || decoder.state !== "configured") {
        // decoder 还没 ready 时，只缓存关键帧
        if (isKey) {
            pendingKeyAU = {
                data: new Uint8Array(data),
                isKey,
            };
        }

        return;
    }

    if (pendingKeyAU && !syncedToKeyFrame.value) {
        drainPendingKeyAU();
    }

    decodeAccessUnit(data, isKey);
};

const startFpsSampler = () => {
    if (fpsTimer) return;

    decodedFrameCount = 0;
    decodedFps.value = 0;
    fpsWindowStart = performance.now();

    fpsTimer = setInterval(() => {
        const now = performance.now();

        decodedFps.value = Math.round(
            (decodedFrameCount * 1000) / Math.max(1, now - fpsWindowStart)
        );

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

const handleWorkerMessage = async (
    event: MessageEvent<ParserWorkerOutMessage>
) => {
    const message = event.data;

    if (!message) return;

    if (message.type === "stats") {
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

    if (message.type === "codec") {
        await ensureDecoderFromCodec(message.codec);
        return;
    }

    if (message.type === "au") {
        tryDecodeOrQueue(new Uint8Array(message.data), message.isKey);
    }
};

const handleWorkerError = (error: ErrorEvent) => {
    parserErrors.value += 1;

    console.error(
        `[Custom HUD] Worker 崩溃详情: ${error.message} (${error.filename}:${error.lineno})`
    );
};

const postChunkToWorker = (bytes: Uint8Array) => {
    if (!parserWorker || !bytes.length) return;

    const transferable = bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength
    );

    parserWorker.postMessage(
        {
            type: "chunk",
            bytes: transferable,
        },
        [transferable]
    );
};

onMounted(() => {
    window.addEventListener("hud-debug-panel-toggle", handleToggleDebugPanel);

    if (typeof VideoDecoder === "undefined") {
        unsupportedReason.value = "当前运行环境不支持 WebCodecs";
        return;
    }

    const canvas = canvasRef.value;

    if (!canvas) return;

    ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
    });

    if (!ctx) {
        unsupportedReason.value = "无法初始化视频画布";
        return;
    }

    updateCanvasSize();

    if ("ResizeObserver" in window && wrapperRef.value) {
        resizeObserver = new ResizeObserver(() => updateCanvasSize());
        resizeObserver.observe(wrapperRef.value);
    }

    startFpsSampler();

    parserWorker = new Worker(
        new URL("../../workers/customVideoParser.worker.ts", import.meta.url),
        {
            type: "module",
        }
    );

    parserWorker.addEventListener("message", handleWorkerMessage);
    parserWorker.addEventListener("error", handleWorkerError);

    stopStreamSubscription = customByteBlockStream.subscribe((event: any) => {
        const rawBytes = event instanceof Uint8Array ? event : event?.data;

        if (!rawBytes || rawBytes.length === 0) return;

        postChunkToWorker(rawBytes);
    });
});

onUnmounted(() => {
    window.removeEventListener("hud-debug-panel-toggle", handleToggleDebugPanel);

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
    position: relative
    z-index: 0
    width: 100%
    height: 100%
    display: block
    background: #050914

.placeholder
    position: absolute
    z-index: 1
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
    z-index: 3
    left: 8px
    right: 8px
    bottom: 8px
    display: flex
    flex-wrap: wrap
    gap: 6px
    pointer-events: none

.status-pill, .status-item
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

.status-pill.warning
    border-color: rgba(255, 214, 102, 0.5)
    color: rgba(255, 229, 153, 0.96)

.debug-overlay
    position: absolute
    z-index: 3
    left: 8px
    top: 8px
    max-width: min(92%, 600px)
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

.debug-title.second
    margin-top: 8px

.debug-row
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.health-overlay
    position: absolute
    z-index: 3
    left: 8px
    right: 8px
    bottom: 38px
    min-height: 24px
    padding: 4px 10px
    border-radius: 8px
    font-size: 11px
    line-height: 16px
    letter-spacing: 0.02em
    pointer-events: none
    border: 1px solid rgba(183, 212, 255, 0.2)
    background: rgba(6, 12, 26, 0.62)
    color: rgba(226, 236, 255, 0.9)

.health-overlay.ok
    border-color: rgba(117, 255, 174, 0.32)
    color: rgba(151, 255, 199, 0.96)

.health-overlay.error
    border-color: rgba(255, 138, 138, 0.32)
    color: rgba(255, 173, 173, 0.96)

.health-overlay.idle
    border-color: rgba(255, 214, 102, 0.24)
    color: rgba(255, 229, 153, 0.94)
</style>
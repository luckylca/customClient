<template>
    <div class="rm-video-player" :style="{ width: width + 'px', height: height + 'px' }">
        <canvas ref="canvasRef" :width="width" :height="height"></canvas>
        <div v-if="!isStreaming" class="placeholder">等待图传信号...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 定义属性：允许外部控制画布大小
const props = defineProps({
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 }
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isStreaming = ref(false);
let decoder: VideoDecoder | null = null;
let streamTimer: any = null;

// 由于配置了 nodeIntegration: true，直接引入 electron
const { ipcRenderer } = window.require('electron');

/**
 * 解析 HEVC NALU 类型
 * 用于区分关键帧 (Key Frame) 和 增量帧 (Delta Frame)
 */
const getFrameType = (buffer: Uint8Array): 'key' | 'delta' => {
    if (buffer.length < 6) return 'delta';

    // 寻找 NALU 起始码 (00 00 00 01 或 00 00 01)
    let offset = 0;
    if (buffer[0] === 0 && buffer[1] === 0 && buffer[2] === 1) offset = 3;
    else if (buffer[0] === 0 && buffer[1] === 0 && buffer[2] === 0 && buffer[3] === 1) offset = 4;
    else return 'delta';

    // HEVC NALU Header 第一个字节的第 1-6 位是 Type
    const naluType = (buffer[offset] & 0x7E) >> 1;

    // IDR_W_RADL (19) 和 IDR_N_LP (20) 是常见的关键帧类型
    return (naluType >= 16 && naluType <= 21) ? 'key' : 'delta';
};

/**
 * 初始化 WebCodecs 解码器
 */
const initDecoder = (ctx: CanvasRenderingContext2D) => {
    decoder = new VideoDecoder({
        output: (frame) => {
            ctx.drawImage(frame, 0, 0, props.width, props.height);
            frame.close(); // 释放显存
            isStreaming.value = true;

            // 心跳检测，3秒没帧显示占位符
            clearTimeout(streamTimer);
            streamTimer = setTimeout(() => isStreaming.value = false, 3000);
        },
        error: (e) => console.error('VideoDecoder 错误:', e),
    });

    decoder.configure({
        codec: 'hev1.1.6.L120.90', // RoboMaster 采用 HEVC 编码 
        optimizeForLatency: true    // 极致低延迟模式
    });
};

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initDecoder(ctx);

    // 接收主进程封装好的完整图传帧 [cite: 552-554]
    ipcRenderer.on('video-frame', (_event: any, buffer: Buffer) => {
        const uint8Data = new Uint8Array(buffer);

        if (decoder && decoder.state === 'configured') {
            try {
                decoder.decode(new EncodedVideoChunk({
                    type: getFrameType(uint8Data),
                    timestamp: performance.now(),
                    data: uint8Data,
                }));
            } catch (err) {
                console.warn('解码失败，尝试重置解码器:', err);
            }
        }
    });
});

onUnmounted(() => {
    ipcRenderer.removeAllListeners('video-frame');
    if (decoder && decoder.state !== 'closed') {
        decoder.close();
    }
    clearTimeout(streamTimer);
});
</script>

<style scoped>
.rm-video-player {
    position: relative;
    background: #000;
    overflow: hidden;
}

canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-family: sans-serif;
}
</style>
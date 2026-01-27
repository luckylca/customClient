<template>
    <div class="rm-video-player" :style="{ width: width + 'px', height: height + 'px' }">
        <canvas ref="canvasRef" :width="width" :height="height"></canvas>
        
        <!-- 延迟显示 -->
        <div class="latency-indicator" v-if="isStreaming">
            <!-- <svg viewBox="0 0 24 24" class="icon">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.24,17.76L11.25,12.75V7H12.75V12.2L17.3,16.7L16.24,17.76Z" />
            </svg> -->
            <span :class="latencyColor">{{ latency }} ms</span>
        </div>

        <div v-if="!isStreaming" class="placeholder">等待图传信号...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 定义属性：允许外部控制画布大小
const props = defineProps({
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 }
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isStreaming = ref(false);
const latency = ref(0);
let decoder: VideoDecoder | null = null;
let streamTimer: any = null;

// 根据延迟动态改变颜色
const latencyColor = computed(() => {
    if (latency.value < 50) return 'text-green';
    if (latency.value < 100) return 'text-yellow';
    return 'text-red';
});

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
            
            // 计算解码延迟
            const decodedTime = performance.now();
            const frameTimestamp = frame.timestamp; // 我们将 arrivalTime 存入了 timestamp
            // 简单平滑处理，或者直接显示瞬时值
            latency.value = Math.max(0, Math.floor(decodedTime - frameTimestamp));

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
                // 记录到达时间
                const arrivalTime = performance.now();
                
                decoder.decode(new EncodedVideoChunk({
                    type: getFrameType(uint8Data),
                    timestamp: arrivalTime, // 使用到达时间作为时间戳
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

.latency-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: white;
    font-family: monospace;
    font-size: 14px;
    z-index: 10;
    pointer-events: none; /* 防止遮挡点击 */
}

.icon {
    width: 16px;
    height: 16px;
    opacity: 0.8;
}

.text-green { color: #4caf50; }
.text-yellow { color: #ffeb3b; }
.text-red { color: #f44336; }
</style>
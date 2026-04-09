import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVideoStatsStore = defineStore('videoStats', () => {
    const decodedFps = ref(0);

    let decodedFrameCount = 0;
    let windowStart = performance.now();
    let fpsTimer: ReturnType<typeof setInterval> | null = null;

    const reportDecodedFrame = () => {
        decodedFrameCount += 1;
    };

    const startDecodeFpsSampling = () => {
        if (fpsTimer) return;
        decodedFrameCount = 0;
        decodedFps.value = 0;
        windowStart = performance.now();
        fpsTimer = setInterval(() => {
            const now = performance.now();
            const elapsed = Math.max(1, now - windowStart);
            decodedFps.value = Math.round((decodedFrameCount * 1000) / elapsed);
            decodedFrameCount = 0;
            windowStart = now;
        }, 500);
    };

    const stopDecodeFpsSampling = () => {
        if (fpsTimer) {
            clearInterval(fpsTimer);
            fpsTimer = null;
        }
        decodedFrameCount = 0;
        decodedFps.value = 0;
    };

    return {
        decodedFps,
        reportDecodedFrame,
        startDecodeFpsSampling,
        stopDecodeFpsSampling,
    };
});

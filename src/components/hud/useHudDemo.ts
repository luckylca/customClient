import { ref } from 'vue';

const demoTicker = ref(0);
let started = false;

const startTicker = () => {
    if (started) return;
    started = true;
    const startTime = performance.now();
    window.setInterval(() => {
        demoTicker.value = performance.now() - startTime;
    }, 200);
};

export const useHudDemoTicker = () => {
    startTicker();
    return demoTicker;
};

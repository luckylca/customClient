import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface InputTelemetryState {
    mouseX: number;
    mouseY: number;
    mouseZ: number;
    leftButtonDown: boolean;
    rightButtonDown: boolean;
    midButtonDown: boolean;
    keyboardValue: number;
    keysPressed: string[];
    lastUpdatedAt: number;
}

export const useInputTelemetryStore = defineStore('inputTelemetry', () => {
    const state = ref<InputTelemetryState>({
        mouseX: 0,
        mouseY: 0,
        mouseZ: 0,
        leftButtonDown: false,
        rightButtonDown: false,
        midButtonDown: false,
        keyboardValue: 0,
        keysPressed: [],
        lastUpdatedAt: Date.now(),
    });

    const patch = (partial: Partial<InputTelemetryState>) => {
        state.value = {
            ...state.value,
            ...partial,
            lastUpdatedAt: Date.now(),
        };
    };

    const reset = () => {
        state.value = {
            mouseX: 0,
            mouseY: 0,
            mouseZ: 0,
            leftButtonDown: false,
            rightButtonDown: false,
            midButtonDown: false,
            keyboardValue: 0,
            keysPressed: [],
            lastUpdatedAt: Date.now(),
        };
    };

    return { state, patch, reset };
});

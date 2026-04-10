import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface AppSettings {
    hideCursor: boolean;
    showCrosshair: boolean;
    showFps: boolean;
    showNotifications: boolean;
    autoReconnectVideo: boolean;
    lowLatencyMode: boolean;
    mouseSensitivity: number;
}

export interface KeyBinding {
    key: string;
    keyName: string;
    scriptId: string;
}

const defaultAppSettings = (): AppSettings => ({
    hideCursor: true,
    showCrosshair: true,
    showFps: false,
    showNotifications: true,
    autoReconnectVideo: true,
    lowLatencyMode: true,
    mouseSensitivity: 1.0,
});

const APP_SETTINGS_KEY = 'rm-app-settings';
const KEY_BINDINGS_KEY = 'rm-key-bindings';

export const useSettingStore = defineStore('setting', () => {
    const appSettings = ref<AppSettings>(defaultAppSettings());
    const keyBindings = ref<KeyBinding[]>([]);
    const scriptNotification = ref({ show: false, text: '' });

    const loadAppSettings = () => {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem(APP_SETTINGS_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as Partial<AppSettings>;
            appSettings.value = {
                ...defaultAppSettings(),
                ...parsed,
            };
        } catch (error) {
            console.warn('App settings load failed:', error);
        }
    };

    const loadKeyBindings = () => {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem(KEY_BINDINGS_KEY);
            if (raw) {
                keyBindings.value = JSON.parse(raw);
            }
        } catch (error) {
            console.warn('Key bindings load failed:', error);
        }
    };

    const saveAppSettings = () => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(appSettings.value));
    };

    const updateAppSettings = (patch: Partial<AppSettings>) => {
        appSettings.value = {
            ...appSettings.value,
            ...patch,
        };
    };

    const resetAppSettings = () => {
        appSettings.value = defaultAppSettings();
    };

    const saveKeyBindings = () => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(KEY_BINDINGS_KEY, JSON.stringify(keyBindings.value));
    };

    const triggerScript = (scriptId: string) => {
        let text = '';
        if (scriptId === 'aim_assist') {
            text = '🎯 状态：辅助自瞄触发';
            // TODO: execute actual logic
        } else if (scriptId === 'auto_buy') {
            text = '💎 状态：自动买单触发';
            // TODO: execute actual logic
        } else {
            text = `未知脚本: ${scriptId}`;
        }
        
        scriptNotification.value.text = text;
        scriptNotification.value.show = true;
    };

    loadAppSettings();
    loadKeyBindings();
    watch(appSettings, saveAppSettings, { deep: true });
    watch(keyBindings, saveKeyBindings, { deep: true });

    return {
        appSettings,
        keyBindings,
        scriptNotification,
        updateAppSettings,
        resetAppSettings,
        triggerScript
    };
})

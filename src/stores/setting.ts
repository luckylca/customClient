import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface AppSettings {
    hideCursor: boolean;
    showCrosshair: boolean;
    showFps: boolean;
    showNotifications: boolean;
    autoReconnectVideo: boolean;
    lowLatencyMode: boolean;
    masterVolume: number;
}

const defaultAppSettings = (): AppSettings => ({
    hideCursor: true,
    showCrosshair: true,
    showFps: false,
    showNotifications: true,
    autoReconnectVideo: true,
    lowLatencyMode: true,
    masterVolume: 70,
});

const APP_SETTINGS_KEY = 'rm-app-settings';

export const useSettingStore = defineStore('setting', () => {
    const appSettings = ref<AppSettings>(defaultAppSettings());

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

    loadAppSettings();
    watch(appSettings, saveAppSettings, { deep: true });

    return {
        appSettings,
        updateAppSettings,
        resetAppSettings,
    };
})

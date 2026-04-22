import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { AutoBuy42mm5 } from '@/services/AutoTaskServices';
import { useRobotStore } from '@/stores/robotData';

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

export interface ScriptNotificationItem {
    id: number;
    text: string;
    createdAt: number;
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
    const scriptNotifications = ref<ScriptNotificationItem[]>([]);
    const robotStore = useRobotStore();
    let scriptNotificationSeq = 0;

    const MAX_SCRIPT_NOTIFICATIONS = 6;
    const SCRIPT_NOTIFICATION_LIFETIME_MS = 2400;
    const SCRIPT_TRIGGER_DEBOUNCE_MS = 220;
    const scriptLastTriggeredAt: Record<string, number> = {};

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

    const removeScriptNotification = (id: number) => {
        scriptNotifications.value = scriptNotifications.value.filter((item) => item.id !== id);
        if (scriptNotifications.value.length === 0) {
            scriptNotification.value.show = false;
        }
    };

    const pushScriptNotification = (text: string) => {
        const id = ++scriptNotificationSeq;
        const item: ScriptNotificationItem = {
            id,
            text,
            createdAt: Date.now(),
        };

        scriptNotification.value.text = text;
        scriptNotification.value.show = true;
        scriptNotifications.value.push(item);

        if (scriptNotifications.value.length > MAX_SCRIPT_NOTIFICATIONS) {
            scriptNotifications.value.shift();
        }

        setTimeout(() => {
            removeScriptNotification(id);
        }, SCRIPT_NOTIFICATION_LIFETIME_MS);
    };

    const triggerScript = (scriptId: string) => {
        const now = Date.now();
        const lastAt = scriptLastTriggeredAt[scriptId] || 0;
        if (now - lastAt < SCRIPT_TRIGGER_DEBOUNCE_MS) {
            return;
        }
        scriptLastTriggeredAt[scriptId] = now;

        const dynamic = robotStore.robot.RobotDynamicStatusData as Record<string, unknown> | undefined;
        const ammoRaw = dynamic?.remainingAmmo ?? dynamic?.remaining_ammo;
        const ammoText = typeof ammoRaw === 'number' ? String(ammoRaw) : '未知';
        let text = '';
        if (scriptId === 'aim_assist') {
            text = '🎯 状态：辅助自瞄触发';
            // TODO: execute actual logic
        } else if (scriptId === 'auto_buy_43mm_5' || scriptId === 'auto_buy_42mm_5') {
            const sent = AutoBuy42mm5();
            if (sent) {
                const nextAmmo = robotStore.applyLocalAmmoDelta(5);
                text = `自动购买 42mm 5发子弹指令已发送（当前子弹：${nextAmmo}）`;
            } else {
                text = `自动购买 42mm 5发子弹发送失败（当前子弹：${ammoText}）`;
            }
        } else {
            text = `未知脚本: ${scriptId}`;
        }

        pushScriptNotification(text);
    };

    loadAppSettings();
    loadKeyBindings();
    watch(appSettings, saveAppSettings, { deep: true });
    watch(keyBindings, saveKeyBindings, { deep: true });

    return {
        appSettings,
        keyBindings,
        scriptNotification,
        scriptNotifications,
        updateAppSettings,
        resetAppSettings,
        removeScriptNotification,
        pushScriptNotification,
        triggerScript
    };
})

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
    ToggleHeroDeployMode,
    AutoResurrection,
    purchaseAmmoCommand,
    getAmmoPurchaseOptions,
    getAmmoPurchaseSuccessText,
    getAmmoPurchaseFailureText,
    getAmmoPurchaseUnsupportedText,
    getAmmoPurchaseInvalidQuantityText,
} from '@/services/AutoTaskServices';
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

export type ScriptTriggerResult = {
    consumed?: boolean;
};

const PURCHASE_PANEL_SCRIPT_ID = 'toggle_bullet_purchase_overlay';

const DEFAULT_KEY_BINDINGS: KeyBinding[] = [
    {
        key: 'KeyB',
        keyName: 'B',
        scriptId: PURCHASE_PANEL_SCRIPT_ID,
    },
];

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

const mergeDefaultKeyBindings = (bindings: KeyBinding[]) => {
    const merged = [...bindings];

    DEFAULT_KEY_BINDINGS.forEach((binding) => {
        const hasScript = merged.some((item) => item.scriptId === binding.scriptId);
        const hasKey = merged.some((item) => item.key === binding.key);
        if (!hasScript && !hasKey) {
            merged.push(binding);
        }
    });

    return merged;
};

const normalizeKeyBindings = (bindings: KeyBinding[]) => mergeDefaultKeyBindings(
    Array.isArray(bindings) ? bindings.filter((item) => item?.key && item?.scriptId) : []
);

const getCurrentAmmoText = (robotStore: ReturnType<typeof useRobotStore>) => {
    const dynamic = robotStore.robot.RobotDynamicStatusData as Record<string, unknown> | undefined;
    const ammoRaw = dynamic?.remainingAmmo ?? dynamic?.remaining_ammo;
    return typeof ammoRaw === 'number' ? String(ammoRaw) : '未知';
};

const openBulletPurchaseOverlay = () => {
    window.dispatchEvent(new CustomEvent('hud-bullet-purchase-overlay', {
        detail: {
            toggle: true,
        },
    }));
};

const openMinimapOverlay = () => {
    window.dispatchEvent(new CustomEvent('hud-minimap-overlay', {
        detail: {
            toggle: true,
        },
    }));
};

const openDebugPanel = () => {
    window.dispatchEvent(new CustomEvent('hud-debug-panel-toggle'));
};

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
            if (!raw) {
                keyBindings.value = normalizeKeyBindings([]);
                return;
            }

            keyBindings.value = normalizeKeyBindings(JSON.parse(raw));
        } catch (error) {
            console.warn('Key bindings load failed:', error);
            keyBindings.value = normalizeKeyBindings([]);
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

    const purchaseAmmo = (quantity: number) => {
        const role = robotStore.getAmmoPurchaseRole();
        if (!role) {
            const result = { ok: false, text: getAmmoPurchaseUnsupportedText() };
            pushScriptNotification(result.text);
            return result;
        }

        if (!getAmmoPurchaseOptions(role).includes(quantity)) {
            const result = { ok: false, text: getAmmoPurchaseInvalidQuantityText(role, quantity) };
            pushScriptNotification(result.text);
            return result;
        }

        const ammoText = getCurrentAmmoText(robotStore);
        const sent = purchaseAmmoCommand(role, quantity);
        if (!sent) {
            const result = { ok: false, text: getAmmoPurchaseFailureText(role, quantity, ammoText) };
            pushScriptNotification(result.text);
            return result;
        }

        const nextAmmo = robotStore.applyLocalAmmoDelta(quantity);
        const result = { ok: true, text: getAmmoPurchaseSuccessText(role, quantity, nextAmmo) };
        pushScriptNotification(result.text);
        return result;
    };

    const triggerScript = (scriptId: string): ScriptTriggerResult => {
        const now = Date.now();
        const lastAt = scriptLastTriggeredAt[scriptId] || 0;
        if (now - lastAt < SCRIPT_TRIGGER_DEBOUNCE_MS) {
            return {};
        }
        scriptLastTriggeredAt[scriptId] = now;

        let text = '';
        let result: ScriptTriggerResult = {};

        if (scriptId === 'aim_assist') {
            text = '🎯 状态：辅助自瞄触发';
        } else if (scriptId === 'auto_buy_43mm_5' || scriptId === 'auto_buy_42mm_5') {
            text = purchaseAmmo(5).text;
        } else if (scriptId === 'Hero_Deploy_Mode_Change') {
            const heroMode = robotStore.robot.HeroDeployModeData as Record<string, unknown> | undefined;
            const statusRaw = heroMode?.status;
            const currentStatus = typeof statusRaw === 'number' ? statusRaw : 0;
            const { sent, nextMode } = ToggleHeroDeployMode(currentStatus);
            const nextStatus = sent ? robotStore.applyLocalHeroDeployModeStatus(nextMode) : currentStatus;
            const modeText = nextStatus === 1 ? '已进入部署模式' : '已退出部署模式';
            text = sent
                ? `英雄部署模式切换指令已发送（${modeText}）`
                : `英雄部署模式切换发送失败（当前模式：${currentStatus === 1 ? '部署中' : '未部署'}）`;
        } else if (scriptId === 'auto_buy_17mm_20') {
            text = purchaseAmmo(20).text;
        } else if (scriptId === 'Resurrection') {
            const sent = AutoResurrection();
            text = sent ? '自动复活指令已发送' : '自动复活发送失败';
        } else if (scriptId === PURCHASE_PANEL_SCRIPT_ID) {
            openBulletPurchaseOverlay();
            text = '补弹面板已切换';
            result = { consumed: true };
        } else if (scriptId === 'toggle_minimap_overlay') {
            openMinimapOverlay();
            text = '小地图遮罩已切换';
            result = { consumed: true };
        } else if (scriptId === 'toggle_debug_panel') {
            openDebugPanel();
            text = '图传调试面板显示已切换';
        } else {
            text = `未知脚本: ${scriptId}`;
        }

        if (scriptId !== 'auto_buy_43mm_5' && scriptId !== 'auto_buy_42mm_5' && scriptId !== 'auto_buy_17mm_20') {
            pushScriptNotification(text);
        }

        return result;
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
        triggerScript,
        purchaseAmmo,
    };
})

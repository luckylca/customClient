<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import { InputHandler } from './services/InputHandler';
import { customByteBlockStream } from './services/CustomByteBlockStream';
import { useGlobalStore } from './stores/globalData';
import { useRobotStore } from './stores/robotData';
import { useSettingStore } from './stores/setting';
import Minimap from './components/hud/Minimap.vue';
import BulletPurchaseOverlay from './components/hud/BulletPurchaseOverlay.vue';
import type { CustomByteBlockStreamEvent } from './types/rmType';

let inputHandler: InputHandler | null = null;
const globalStore = useGlobalStore();
const robotStore = useRobotStore();
const settingStore = useSettingStore();
const MAX_VISIBLE_STACK = 5;
const scriptCloudItems = computed(() => [...settingStore.scriptNotifications].reverse().slice(0, MAX_VISIBLE_STACK));
const showMinimapOverlay = ref(false);
const showBulletPurchaseOverlay = ref(false);
const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };

const notifyCombatOverlay = (active: boolean) => {
  window.dispatchEvent(new CustomEvent('combat-overlay-active', { detail: { active } }));
};

const setMinimapOverlay = (nextVisible: boolean) => {
  showMinimapOverlay.value = nextVisible;
};

const setBulletPurchaseOverlay = (nextVisible: boolean) => {
  showBulletPurchaseOverlay.value = nextVisible;
};

const toggleMinimapOverlay = (nextVisible?: boolean) => {
  if (typeof nextVisible === 'boolean') {
    setMinimapOverlay(nextVisible);
    return;
  }
  showMinimapOverlay.value = !showMinimapOverlay.value;
};

const toggleBulletPurchaseOverlay = (nextVisible?: boolean) => {
  if (typeof nextVisible === 'boolean') {
    setBulletPurchaseOverlay(nextVisible);
    return;
  }
  showBulletPurchaseOverlay.value = !showBulletPurchaseOverlay.value;
};

const isAnyGlobalOverlayVisible = computed(() => showMinimapOverlay.value || showBulletPurchaseOverlay.value);

watch(isAnyGlobalOverlayVisible, (active) => {
  notifyCombatOverlay(active);
}, { immediate: true });

watch(showBulletPurchaseOverlay, (visible) => {
  if (visible) {
    showMinimapOverlay.value = false;
  }
});

watch(showMinimapOverlay, (visible) => {
  if (visible) {
    showBulletPurchaseOverlay.value = false;
  }
});

const closeTopmostOverlay = () => {
  if (showBulletPurchaseOverlay.value) {
    showBulletPurchaseOverlay.value = false;
    return true;
  }
  if (showMinimapOverlay.value) {
    showMinimapOverlay.value = false;
    return true;
  }
  return false;
};

const toByteArray = (input: unknown): Uint8Array | null => {
  if (!input) return null;
  if (input instanceof Uint8Array) return input;
  if (input instanceof ArrayBuffer) return new Uint8Array(input);
  if (Array.isArray(input)) {
    const valid = input.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
    return valid ? new Uint8Array(input as number[]) : null;
  }
  if (typeof input === 'object' && input !== null) {
    const maybeBuffer = input as { type?: string; data?: unknown };
    if (maybeBuffer.type === 'Buffer' && Array.isArray(maybeBuffer.data)) {
      const valid = maybeBuffer.data.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
      return valid ? new Uint8Array(maybeBuffer.data as number[]) : null;
    }
  }
  return null;
};

const normalizeCustomByteBlockEvent = (payload: unknown): CustomByteBlockStreamEvent | null => {
  if (!payload || typeof payload !== 'object') return null;
  const event = payload as CustomByteBlockStreamEvent & { lastFrame?: Record<string, unknown> };
  const data = toByteArray(event.data);
  if (!data) return null;

  const lastFrame = event.lastFrame
    ? {
        ...event.lastFrame,
        frame: toByteArray(event.lastFrame.frame) || undefined,
        videoData: toByteArray(event.lastFrame.videoData) || undefined,
        sidebandData: toByteArray(event.lastFrame.sidebandData) || undefined,
        crc16: toByteArray(event.lastFrame.crc16) || undefined,
      }
    : undefined;

  return {
    ...event,
    data,
    videoData: toByteArray(event.videoData) || undefined,
    sidebandData: toByteArray(event.sidebandData) || undefined,
    crc16: toByteArray(event.crc16) || undefined,
    lastFrame,
  };
};

const handleMqttMessage = (_event: any, payload: { topic: string; data: unknown }) => {
  if (!payload || !payload.topic) return;

  if (payload.topic === 'CustomByteBlock') {
    const event = normalizeCustomByteBlockEvent(payload.data);
    if (!event) return;
    customByteBlockStream.publish(event);
    robotStore.updateCustomByteBlockStats(event);
    return;
  }

  globalStore.setGlobalMessage(payload.topic, payload.data);
  robotStore.setRobotMessage(payload.topic, payload.data);
};

const handleCustomByteBlockStream = (_event: any, payload: unknown) => {
  const event = normalizeCustomByteBlockEvent(payload);
  if (!event) return;
  customByteBlockStream.publish(event);
  robotStore.updateCustomByteBlockStats(event);
};

const handleHudMinimapOverlay = (event: Event) => {
  const customEvent = event as CustomEvent<{ visible?: boolean; toggle?: boolean }>;
  if (typeof customEvent.detail?.visible === 'boolean') {
    setMinimapOverlay(customEvent.detail.visible);
    return;
  }
  if (customEvent.detail?.toggle) {
    toggleMinimapOverlay();
    return;
  }
  toggleMinimapOverlay();
};

const handleHudBulletPurchaseOverlay = (event: Event) => {
  const customEvent = event as CustomEvent<{ visible?: boolean; toggle?: boolean }>;
  if (typeof customEvent.detail?.visible === 'boolean') {
    setBulletPurchaseOverlay(customEvent.detail.visible);
    return;
  }
  if (customEvent.detail?.toggle) {
    toggleBulletPurchaseOverlay();
    return;
  }
  toggleBulletPurchaseOverlay();
};

const handleHudEscapeKey = (event: KeyboardEvent) => {
  if ((event.key === 'Escape' || event.key === 'Esc') && closeTopmostOverlay()) {
    event.preventDefault();
    event.stopPropagation();
  }
};

onMounted(() => {
  inputHandler = new InputHandler();
  if (ipcRenderer) {
    ipcRenderer.on('mqtt-message', handleMqttMessage);
    ipcRenderer.on('custom-byte-block-stream', handleCustomByteBlockStream);
  }
  window.addEventListener('hud-minimap-overlay', handleHudMinimapOverlay as EventListener);
  window.addEventListener('hud-bullet-purchase-overlay', handleHudBulletPurchaseOverlay as EventListener);
  window.addEventListener('keydown', handleHudEscapeKey, true);
});

onUnmounted(() => {
  if (inputHandler) {
    inputHandler.destroy();
  }
  if (ipcRenderer) {
    ipcRenderer.removeListener('mqtt-message', handleMqttMessage);
    ipcRenderer.removeListener('custom-byte-block-stream', handleCustomByteBlockStream);
  }
  window.removeEventListener('hud-minimap-overlay', handleHudMinimapOverlay as EventListener);
  window.removeEventListener('hud-bullet-purchase-overlay', handleHudBulletPurchaseOverlay as EventListener);
  window.removeEventListener('keydown', handleHudEscapeKey, true);
});

const parseEvent = (eventId: number, param: string) => {
    const params = param ? param.split(',') : [];
    switch (eventId) {
        case 1:
            return `击杀事件: 被击杀者 ${params[0]}, 击杀者 ${params[1]}`;
        case 2:
            return `前哨站被摧毁: 目标 ${param}`;
        case 3:
            return `大能量机关激活: ${params[0]}臂, 平均${params[1]}环`;
        case 4:
            return `能量机关已激活: ${param === '1' ? '小能量机关' : '大能量机关'}`;
        case 5:
            return `己方英雄造成狙击伤害: 累计 ${param}`;
        case 6:
            return `对方英雄造成狙击伤害: 累计 ${param}`;
        case 7:
            return `对方呼叫空中支援`;
        case 8:
            return `对方空中支援被反制: 剩余可反制 ${param} 次`;
        case 9: {
            const sideStr = params[0] === '1' ? '红方' : '蓝方';
            let targetStr = '';
            switch(params[1]) {
                case '1': targetStr = '前哨站'; break;
                case '2': targetStr = '基地固定目标'; break;
                case '3': targetStr = '基地随机固定目标'; break;
                case '4': targetStr = '基地随机移动目标'; break;
                case '5': targetStr = '基地末端移动目标'; break;
            }
            return `飞镖命中: ${sideStr} 击中 ${targetStr}`;
        }
        case 10:
            return `对方飞镖闸门开启`;
        case 11:
            return `基地遭到攻击`;
        case 12:
            return `对方前哨站停转`;
        case 13:
            return `对方基地护甲展开`;
        case 14:
            return `对方请求四级装配, 强制退出缓冲`;
        case 15: {
            const resultStrs = ['成功', '拔出', '超时', '离开装配区过久', '工程战亡', '四级难度未满足完成协作时限', '主动退出', '完成装配但结算时未检测到有能量单元', '缓冲期到期，装配流程强制结束'];
            return `装配结果: ${resultStrs[Number(param)] || param}`;
        }
        default:
            return `未知事件: ${eventId} ${param}`;
    }
};

watch(() => globalStore.global.EnventData, (newEvents) => {
    if (newEvents && newEvents.length > 0) {
        newEvents.forEach(event => {
            if (event.eventId !== undefined) {
                const msg = parseEvent(event.eventId, event.param || '');
                settingStore.pushScriptNotification(msg);
            }
        });
    }
}, { deep: true });
</script>

<template>
  <v-app>
    <RouterView />

    <div v-if="settingStore.appSettings.showNotifications" class="script-toast-stack">
      <TransitionGroup name="notify-stack" tag="div">
        <div
          v-for="(item, index) in scriptCloudItems"
          :key="item.id"
          class="script-toast-item"
          :style="{
            '--stack-y': `${index * 12}px`,
            '--stack-scale': `${Math.max(0.95, 1 - index * 0.012)}`,
            '--stack-opacity': `${Math.max(0.58, 1 - index * 0.1)}`,
            '--z': `${2147483000 - index}`
          }"
        >
          <div class="script-toast-bubble">
            <div class="d-flex align-center justify-center font-weight-medium">
              {{ item.text }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <transition name="minimap-overlay-fade">
      <div
        v-if="showMinimapOverlay"
        class="minimap-mask"
        @click.self="showMinimapOverlay = false"
      >
        <div class="minimap-mask-panel">
          <div class="minimap-mask-header">
            <div>
              <div class="minimap-mask-title">小地图遮罩</div>
              <div class="minimap-mask-subtitle">按 ESC 或点击外部关闭</div>
            </div>
            <v-btn icon="mdi-close" variant="text" @click="showMinimapOverlay = false" />
          </div>
          <div class="minimap-mask-body">
            <Minimap :expanded="true" />
          </div>
        </div>
      </div>
    </transition>

    <BulletPurchaseOverlay
      :visible="showBulletPurchaseOverlay"
      @close="showBulletPurchaseOverlay = false"
    />
  </v-app>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.script-toast-stack {
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 2147483000;
  pointer-events: none;
}

.script-toast-item {
  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--z);
  transform: translate(-50%, var(--stack-y)) scale(var(--stack-scale));
  opacity: var(--stack-opacity);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
  will-change: transform, opacity;
}

.script-toast-bubble {
  min-width: 220px;
  max-width: 560px;
  padding: 10px 16px;
  border-radius: 999px;
  color: rgb(var(--v-theme-on-primary));
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.notify-stack-enter-active,
.notify-stack-leave-active,
.notify-stack-move {
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
}

.notify-stack-enter-from,
.notify-stack-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(var(--stack-y) - 12px)) scale(0.94);
}

.notify-stack-leave-active {
  position: absolute;
}

.minimap-mask {
  position: fixed;
  inset: 0;
  z-index: 2147482000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(3, 6, 14, 0.72);
  backdrop-filter: blur(12px);
}

.minimap-mask-panel {
  width: min(1080px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  padding: 20px 20px 24px;
  border-radius: 28px;
  background: rgba(9, 14, 24, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32);
}

.minimap-mask-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.minimap-mask-title {
  font-size: 28px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

.minimap-mask-subtitle {
  margin-top: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.62);
}

.minimap-mask-body {
  height: min(720px, calc(100vh - 180px));
  min-height: 320px;
}

.minimap-overlay-fade-enter-active,
.minimap-overlay-fade-leave-active {
  transition: opacity 160ms ease;
}

.minimap-overlay-fade-enter-from,
.minimap-overlay-fade-leave-to {
  opacity: 0;
}
</style>

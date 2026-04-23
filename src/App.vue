<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router'
import { InputHandler } from './services/InputHandler';
import { customByteBlockStream } from './services/CustomByteBlockStream';
import { useGlobalStore } from './stores/globalData';
import { useRobotStore } from './stores/robotData';
import { useSettingStore } from './stores/setting';

let inputHandler: InputHandler | null = null;
const globalStore = useGlobalStore();
const robotStore = useRobotStore();
const settingStore = useSettingStore();
const MAX_VISIBLE_STACK = 5;
const scriptCloudItems = computed(() => [...settingStore.scriptNotifications].reverse().slice(0, MAX_VISIBLE_STACK));
const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };

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

const handleMqttMessage = (_event: any, payload: { topic: string; data: unknown }) => {
  if (!payload || !payload.topic) return;

  if (payload.topic === 'CustomByteBlock') {
    const bytes = toByteArray((payload.data as { data?: unknown })?.data ?? payload.data);
    if (!bytes) return;
    customByteBlockStream.publish(bytes);
    robotStore.updateCustomByteBlockStats(bytes);
    return;
  }

  globalStore.setGlobalMessage(payload.topic, payload.data);
  robotStore.setRobotMessage(payload.topic, payload.data);
};

const handleCustomByteBlockStream = (_event: any, payload: unknown) => {
  const bytes = toByteArray((payload as { data?: unknown })?.data ?? payload);
  if (!bytes) return;
  customByteBlockStream.publish(bytes);
  robotStore.updateCustomByteBlockStats(bytes);
};

onMounted(() => {
  inputHandler = new InputHandler();
  if (ipcRenderer) {
    ipcRenderer.on('mqtt-message', handleMqttMessage);
    ipcRenderer.on('custom-byte-block-stream', handleCustomByteBlockStream);
  }
});

onUnmounted(() => {
  if (inputHandler) {
    inputHandler.destroy();
  }
  if (ipcRenderer) {
    ipcRenderer.removeListener('mqtt-message', handleMqttMessage);
    ipcRenderer.removeListener('custom-byte-block-stream', handleCustomByteBlockStream);
  }
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
  </v-app>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 建议加上，防止出现默认滚动条 */
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
  white-space: nowrap;
}

.notify-stack-enter-active,
.notify-stack-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.notify-stack-enter-from,
.notify-stack-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(var(--stack-y) - 14px)) scale(calc(var(--stack-scale) + 0.02));
}

.notify-stack-move {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .script-toast-stack {
    top: 14px;
  }

  .script-toast-bubble {
    min-width: 180px;
    max-width: 340px;
    padding: 8px 12px;
  }
}
</style>

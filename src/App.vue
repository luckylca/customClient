<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';
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

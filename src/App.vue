<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
    
    <!-- 全局快捷键状态提示 -->
    <v-snackbar
      v-model="settingStore.scriptNotification.show"
      :timeout="2000"
      color="primary"
      location="top"
      rounded="pill"
      elevation="24"
    >
      <div class="d-flex align-center justify-center font-weight-medium">
        {{ settingStore.scriptNotification.text }}
      </div>
    </v-snackbar>
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
</style>

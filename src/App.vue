<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';
import { InputHandler } from './services/InputHandler';
import { useGlobalStore } from './stores/globalData';
import { useRobotStore } from './stores/robotData';

let inputHandler: InputHandler | null = null;
const globalStore = useGlobalStore();
const robotStore = useRobotStore();
const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };

const handleMqttMessage = (_event: any, payload: { topic: string; data: unknown }) => {
  if (!payload || !payload.topic) return;
  globalStore.setGlobalMessage(payload.topic, payload.data);
  robotStore.setRobotMessage(payload.topic, payload.data);
};

onMounted(() => {
  inputHandler = new InputHandler();
  if (ipcRenderer) {
    ipcRenderer.on('mqtt-message', handleMqttMessage);
  }
});

onUnmounted(() => {
  if (inputHandler) {
    inputHandler.destroy();
  }
  if (ipcRenderer) {
    ipcRenderer.removeListener('mqtt-message', handleMqttMessage);
  }
});
</script>

<template>
  <v-app>
    <RouterView />
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

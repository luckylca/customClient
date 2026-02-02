<template>
    <v-overlay :model-value="modelValue" class="esc-overlay" contained>
        <div class="menu">
            <v-card class="menu-card" hover elevated rounded="pill" elevation="20" @click="continueGame">继续比赛</v-card>
            <v-card class="menu-card" hover elevated rounded="pill" elevation="20" @click="goHome">回到首页</v-card>
            <v-card class="menu-card" hover elevated rounded="pill" elevation="20" @click="openSettings">设置</v-card>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { ipcRenderer } = window.require('electron');
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();
// keep reactivity when parent toggles overlay
const modelValue = toRef(props, 'modelValue');

function continueGame() {
    emit('update:modelValue', false);
}
function goHome() {
    router.push({ name: 'layout' });
    ipcRenderer.send('app-toggle-fullscreen')
    ipcRenderer.send('stop-mqtt-service')
}
function openSettings() {
    router.push({ name: 'setting', query: { from: route.fullPath } });
}

</script>

<style scoped lang="sass">
.esc-overlay
    align-items: center
    justify-content: center

.menu
    display: flex
    flex-direction: column
    gap: 12px

.menu-card
    padding: 30px
    margin: 10px auto
    width: 400px
    text-align: center
    font-size: 24px
    box-sizing: border-box
    user-select: none
</style>

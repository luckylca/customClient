<template>
    <v-app>
        <v-main class="fill-height hud-main">
            <v-theme-provider theme="dark">
                <div class="container">
                    <imageTransmit class="video-layer" />
                    <HUDContainer :minimal="true" />
                </div>
            </v-theme-provider>
        </v-main>
        <escMenu v-model="overlay" />
    </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import escMenu from '@/components/escMenu.vue';
import imageTransmit from '@/components/imageTransmission.vue';
import HUDContainer from '@/components/hud/HUDContainer.vue';
const overlay = ref(false);

const handleGlobalEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        console.log('全局监听：用户按下了 Esc');
        overlay.value = !overlay.value;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleGlobalEsc);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalEsc);
});
</script>

<style scoped lang="sass">
.container
    display: flex
    position: fixed
    inset: 0
    width: 100vw
    height: 100vh
    cursor: none
    background: #0a0c12
    color: #f5f7ff

.video-layer
    width: 100%
    height: 100%

.hud-main
    padding: 0 !important
</style>

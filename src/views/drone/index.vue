<template>
    <v-app>
        <v-main class="fill-height">
            <div class="container">
                <imageTransmit />
            </div>
        </v-main>
        <escMenu v-model="overlay" />
    </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import escMenu from '@/components/escMenu.vue';
import { ipcRenderer } from 'electron';
import imageTransmit from '@/components/imageTransmission.vue';
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
    width: 100%
    height: 100%
</style>
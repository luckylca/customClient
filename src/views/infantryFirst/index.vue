// src/views/infantryFirst/index.vue
// 步兵1号视角界面，显示图传和HUD

<template>
    <v-app>
        <v-main class="fill-height hud-main">
            <v-theme-provider theme="dark">
                <div ref="lockTarget" class="container" @mousedown="handleBattleViewMouseDown">
                    <imageTransmit class="video-layer" />
                    <HUDContainer :minimal="true" />
                </div>
            </v-theme-provider>
        </v-main>
        <escMenu v-model="overlay" />
    </v-app>
</template>

<script setup lang="ts">
import escMenu from '@/components/escMenu.vue';
import imageTransmit from '@/components/imageTransmission.vue';
import HUDContainer from '@/components/hud/HUDContainer.vue';
import { useCombatOverlay } from '@/composables/useCombatOverlay';

const { overlay, lockTarget, handleBattleViewMouseDown } = useCombatOverlay();
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

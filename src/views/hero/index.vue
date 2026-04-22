// src/views/hero/index.vue
// 英雄视角界面，显示图传和HUD

<template>
    <v-app>
        <v-main class="fill-height hud-main">
            <v-theme-provider theme="dark">
                <div ref="lockTarget" class="container" @mousedown="handleBattleViewMouseDown">
                    <imageTransmit class="video-layer" />
                    <HUDContainer :minimal="true" />
                </div>
                <div class="picture-in-video">
                    <svg class="pip-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line
                            v-for="line in pipLines"
                            :key="line.id"
                            :x1="line.x1"
                            :y1="line.y1"
                            :x2="line.x2"
                            :y2="line.y2"
                            :stroke="line.color"
                            :stroke-width="line.width"
                            :opacity="line.opacity ?? 1"
                            stroke-linecap="round"
                        />

                        <rect
                            v-for="rect in pipRects"
                            :key="rect.id"
                            :x="rect.x"
                            :y="rect.y"
                            :width="rect.w"
                            :height="rect.h"
                            :fill="rect.fill"
                            :stroke="rect.stroke"
                            :stroke-width="rect.strokeWidth"
                            :opacity="rect.opacity ?? 1"
                            :rx="rect.radius"
                            :ry="rect.radius"
                        />

                        <ellipse
                            v-for="circle in pipCircles"
                            :key="circle.id"
                            :cx="circle.cx"
                            :cy="circle.cy"
                            :rx="circle.r * circleRxCompensation"
                            :ry="circle.r"
                            :fill="circle.fill"
                            :stroke="circle.stroke"
                            :stroke-width="circle.strokeWidth"
                            :opacity="circle.opacity ?? 1"
                        />
                    </svg>
                    <div class="pip-label">英雄视角</div>
                </div>
            </v-theme-provider>
        </v-main>
        <escMenu v-model="overlay" />
    </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import escMenu from '@/components/escMenu.vue';
import imageTransmit from '@/components/imageTransmission.vue';
import HUDContainer from '@/components/hud/HUDContainer.vue';
import { useCombatOverlay } from '@/composables/useCombatOverlay';

const { overlay, lockTarget, handleBattleViewMouseDown } = useCombatOverlay();

const viewportSize = ref({ width: 1920, height: 1080 });

const updateViewportSize = () => {
    viewportSize.value = {
        width: Math.max(window.innerWidth, 1),
        height: Math.max(window.innerHeight, 1),
    };
};

// 由于当前 svg 使用 preserveAspectRatio="none"，x 轴会被按宽高比拉伸。
// 用 height/width 修正 rx，视觉上可保持为真圆。
const circleRxCompensation = computed(() => viewportSize.value.height / viewportSize.value.width);

onMounted(() => {
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateViewportSize);
});

type PipLine = {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    width: number;
    opacity?: number;
};

type PipRect = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    radius?: number;
    opacity?: number;
};

type PipCircle = {
    id: string;
    cx: number;
    cy: number;
    r: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity?: number;
};

// 所有坐标均使用 0-100 百分比坐标系（对应 svg viewBox 0 0 100 100）
const pipLines: PipLine[] = [
    { id: 'l-1', x1: 39.063, y1: 77.778, x2: 32.292, y2: 100, color: '#00FFFF', width: 0.1, opacity: 0.8 },
    { id: 'l-2', x1: 60.938, y1: 77.778, x2: 67.708, y2: 100, color: '#00FFFF', width: 0.1, opacity: 0.8 },

    { id: 'l-3', x1: 50, y1: 87.963, x2: 50, y2: 81.481, color: '#FF3333', width: 1.1 },
    { id: 'l-4', x1: 50, y1: 81.481, x2: 48.958, y2: 83.333, color: '#FF3333', width: 1.1 },
    { id: 'l-5', x1: 50, y1: 81.481, x2: 51.042, y2: 83.333, color: '#FF3333', width: 1.1 },

    { id: 'l-6', x1: 75.521, y1: 46.296, x2: 78.646, y2: 46.296, color: '#CCFF33', width: 0.1 },
    { id: 'l-7', x1: 76.563, y1: 48.611, x2: 78.125, y2: 50, color: '#CCFF33', width: 0.1 },
    { id: 'l-8', x1: 78.125, y1: 50, x2: 76.563, y2: 51.389, color: '#CCFF33', width: 0.1 },

    { id: 'l-9', x1: 86.719, y1: 50, x2: 86.719, y2: 13.889, color: '#CCFF33', width: 0.1 },
];

const pipRects: PipRect[] = [
    { id: 'r-1', x: 39.063, y: 38.889, w: 21.875, h: 39.889, fill: 'none', stroke: '#FF00FF', strokeWidth: 0.1, opacity: 0.6 },
    { id: 'r-2', x: 75.521, y: 48.148, w: 6.25, h: 3.704, fill: 'none', stroke: '#CCFF33', strokeWidth: 0.1 },
    { id: 'r-3', x: 84.896, y: 46.759, w: 3.646, h: 6.481, fill: 'none', stroke: '#CCFF33', strokeWidth: 0.1 },
];

const pipCircles: PipCircle[] = [
    { id: 'c-1', cx: 51.042, cy: 50, r: 4.167, fill: 'none', stroke: '#CCFF33', strokeWidth: 0.1 },
    { id: 'c-2', cx: 52.865, cy: 53.241, r: 1.563, fill: 'none', stroke: '#CCFF33', strokeWidth: 0.1 },
];
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

.picture-in-video
    position: fixed
    inset: 0
    width: 100vw
    height: 100vh
    border: 0
    border-radius: 0
    overflow: hidden
    background: transparent
    box-shadow: none
    z-index: 1800
    pointer-events: none

.pip-canvas
    position: absolute
    inset: 0
    width: 100%
    height: 100%

.pip-label
    position: absolute
    left: 8px
    bottom: 6px
    font-size: 11px
    letter-spacing: 0.3px
    color: rgba(226, 232, 240, 0.9)
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5)
</style>
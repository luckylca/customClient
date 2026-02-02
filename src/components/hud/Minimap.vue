<template>
    <div class="minimap">
        <div class="map-grid"></div>
        <div class="map-center"></div>
        <div class="robot-marker" :style="robotStyle">
            <div class="heading"></div>
        </div>
        <div class="coords">
            <div>X: {{ position.x.toFixed(1) }}</div>
            <div>Y: {{ position.y.toFixed(1) }}</div>
            <div>Yaw: {{ position.yaw.toFixed(1) }}°</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const position = computed(() => ({
    x: demoMode.value
        ? 2 + 1.2 * Math.sin(demoTick.value / 2500)
        : robot.RobotPositionData?.x ?? 0,
    y: demoMode.value
        ? 1.4 + 1.1 * Math.cos(demoTick.value / 2200)
        : robot.RobotPositionData?.y ?? 0,
    yaw: demoMode.value
        ? (demoTick.value / 40) % 360
        : robot.RobotPositionData?.yaw ?? 0,
}));

const robotStyle = computed(() => ({
    transform: `translate(-50%, -50%) rotate(${position.value.yaw}deg)`,
}));
</script>

<style scoped lang="sass">
.minimap
    position: relative
    width: 100%
    height: 100%
    background: rgba(13, 16, 23, 0.7)
    border-radius: var(--md-radius-lg)
    overflow: hidden

.map-grid
    position: absolute
    inset: 12px
    background-image: linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
    background-size: 24px 24px
    border-radius: var(--md-radius-md)

.map-center
    position: absolute
    left: 50%
    top: 50%
    width: 6px
    height: 6px
    background: #00e5ff
    border-radius: 50%
    transform: translate(-50%, -50%)
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.6)

.robot-marker
    position: absolute
    left: 50%
    top: 50%
    width: 18px
    height: 18px
    background: rgba(255, 255, 255, 0.2)
    border: 2px solid #7c4dff
    border-radius: 6px
    display: flex
    align-items: center
    justify-content: center
    transition: transform 120ms ease

.robot-marker .heading
    width: 0
    height: 0
    border-left: 6px solid transparent
    border-right: 6px solid transparent
    border-bottom: 10px solid #7c4dff
    transform: translateY(-6px)

.coords
    position: absolute
    right: 12px
    bottom: 12px
    font-size: 11px
    color: var(--hud-text-secondary)
    display: flex
    flex-direction: column
    gap: 2px
</style>

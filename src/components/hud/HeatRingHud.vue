<template>
    <div class="heat-ring-hud" aria-label="热量圆环">
        <svg class="heat-ring-svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle
                class="heat-ring-track"
                :cx="center"
                :cy="center"
                :r="radius"
                fill="none"
                :stroke-width="strokeWidth"
            />
            <circle
                class="heat-ring-progress"
                :cx="center"
                :cy="center"
                :r="radius"
                fill="none"
                :stroke="heatColor"
                :stroke-width="strokeWidth"
                :stroke-dasharray="strokeDasharray"
                stroke-linecap="round"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const center = 50;
const radius = 44;
const strokeWidth = 4;
const circumference = 2 * Math.PI * radius;

const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const hasData = computed(() => !!robot.RobotDynamicStatusData);
const useDemo = computed(() => demoMode.value || !hasData.value);

const dynamic = computed(() => (robot.RobotDynamicStatusData || {}) as Record<string, unknown>);
const statics = computed(() => (robot.RobotStaticStatusData || {}) as Record<string, unknown>);

const pickNumber = (obj: Record<string, unknown>, camel: string, snake: string, fallback = 0): number => {
    const value = obj[camel] ?? obj[snake];
    return typeof value === 'number' ? value : fallback;
};

const currentHeat = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(80 + 75 * Math.sin(demoTick.value / 2600)))
        : pickNumber(dynamic.value, 'currentHeat', 'current_heat', 0)
);

const maxHeat = computed(() => pickNumber(statics.value, 'maxHeat', 'max_heat', 160));

const heatRatio = computed(() => {
    if (maxHeat.value <= 0) return 0;
    return Math.min(1, Math.max(0, currentHeat.value / maxHeat.value));
});

const strokeDasharray = computed(() => {
    const visible = circumference * heatRatio.value;
    return `${visible} ${circumference}`;
});

const heatColor = computed(() => {
    const ratio = heatRatio.value;
    const hue = 30 - ratio * 30;
    const lightness = 68 - ratio * 34;
    return `hsl(${hue} 95% ${lightness}%)`;
});
</script>

<style scoped lang="sass">
.heat-ring-hud
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    aspect-ratio: 1 / 1
    overflow: hidden

.heat-ring-svg
    width: 100%
    height: 100%
    overflow: visible

.heat-ring-track
    stroke: rgba(255, 255, 255, 0.14)

.heat-ring-progress
    transform-origin: center
    transform: rotate(-90deg) scaleX(-1)
    transition: stroke-dasharray 120ms linear, stroke 120ms linear
    filter: drop-shadow(0 0 5px rgba(244, 67, 54, 0.35))
</style>

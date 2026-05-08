<template>
    <div class="heat-ring-hud" aria-label="热量圆环">
        <div class="ammo-text" :class="{ disabled: frictionEnabled === false }">{{ remainingAmmo }}</div>
        <div class="ring-shell">
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
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const center = 50;
const radius = 44;
const strokeWidth = 2.5;
const circumference = 2 * Math.PI * radius;

const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const hasData = computed(() => !!robot.RobotDynamicStatusData);
const useDemo = computed(() => demoMode.value || !hasData.value);

const dynamic = computed(() => (robot.RobotDynamicStatusData || {}) as Record<string, unknown>);
const statics = computed(() => (robot.RobotStaticStatusData || {}) as Record<string, unknown>);
const lobShotReserved = computed(() => (
    robot.CustomByteBlockLobShotReservedData
    || robot.CustomByteBlockData?.lobShotReserved
    || null
));

const pickNumber = (obj: Record<string, unknown>, camel: string, snake: string, fallback = 0): number => {
    const value = obj[camel] ?? obj[snake];
    return typeof value === 'number' ? value : fallback;
};

const remainingAmmo = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(40 + 20 * Math.sin(demoTick.value / 3200)))
        : pickNumber(dynamic.value, 'remainingAmmo', 'remaining_ammo', 0)
);

const currentHeat = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(80 + 75 * Math.sin(demoTick.value / 2600)))
        : pickNumber(dynamic.value, 'currentHeat', 'current_heat', 0)
);

const maxHeat = computed(() => pickNumber(statics.value, 'maxHeat', 'max_heat', 160));

const frictionEnabled = computed(() => {
    if (useDemo.value) {
        return Math.floor(demoTick.value / 2600) % 3 !== 0;
    }

    const value = lobShotReserved.value?.frictionMode;
    return typeof value === 'boolean' ? value : null;
});

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
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    overflow: hidden

.ammo-text
    position: absolute
    left: 8%
    top: 50%
    z-index: 1
    min-width: 0
    max-width: 24%
    transform: translateY(-50%)
    font-size: clamp(8px, calc(8.5cqh * var(--hud-content-scale, 1)), 13px)
    font-weight: 700
    color: var(--hud-text-primary)
    line-height: 1
    text-align: right
    opacity: 0.92
    transition: opacity 120ms linear, color 120ms linear, filter 120ms linear
    pointer-events: none

    &.disabled
        color: var(--hud-text-tertiary)
        opacity: 0.45
        filter: saturate(0.2)

.ring-shell
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%

.heat-ring-svg
    width: 100%
    height: 100%
    aspect-ratio: 1 / 1
    overflow: visible
    display: block

.heat-ring-track
    stroke: rgba(255, 255, 255, 0.14)

.heat-ring-progress
    transform-origin: center
    transform: rotate(-90deg) scaleX(-1)
    transition: stroke-dasharray 120ms linear, stroke 120ms linear
    filter: drop-shadow(0 0 4px rgba(244, 67, 54, 0.28))

.hud-layer.minimal .ammo-text
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65)

.hud-layer.compact .ammo-text
    left: 7%
    max-width: 22%
    font-size: clamp(7px, calc(7.5cqh * var(--hud-content-scale, 1)), 11px)

.hud-layer.compact .ring-shell
    width: 100%

.hud-layer.minimal .ring-shell
    width: 100%

.hud-layer.minimal .ammo-text
    left: 7%
    max-width: 22%
</style>

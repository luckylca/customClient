<template>
    <div class="triple-ring-hud" aria-label="状态三环">
        <svg class="triple-ring-svg" viewBox="0 0 100 100" role="img">
            <circle
                v-for="ring in rings"
                :key="ring.key + '-track'"
                class="ring-track"
                :cx="center"
                :cy="center"
                :r="ring.radius"
                fill="none"
                :stroke-width="strokeWidth"
            />
            <circle
                v-for="ring in rings"
                :key="ring.key + '-progress'"
                class="ring-progress"
                :cx="center"
                :cy="center"
                :r="ring.radius"
                fill="none"
                :stroke="ring.color"
                :stroke-width="strokeWidth"
                :stroke-dasharray="ring.dasharray"
                stroke-linecap="round"
            />
            <text class="level-text" x="50" y="52" text-anchor="middle" dominant-baseline="middle">
                {{ level }}
            </text>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const center = 50;
const strokeWidth = 4;

const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const hasData = computed(() => !!robot.RobotDynamicStatusData || !!robot.RobotStaticStatusData);
const useDemo = computed(() => demoMode.value || !hasData.value);

const dynamic = computed(() => (robot.RobotDynamicStatusData || {}) as Record<string, unknown>);
const statics = computed(() => (robot.RobotStaticStatusData || {}) as Record<string, unknown>);

const pickNumber = (obj: Record<string, unknown>, camel: string, snake: string, fallback = 0): number => {
    const value = obj[camel] ?? obj[snake];
    return typeof value === 'number' ? value : fallback;
};

const clampRatio = (value: number) => Math.min(1, Math.max(0, value));

const currentHealth = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(3200 + 600 * Math.sin(demoTick.value / 6000)))
        : pickNumber(dynamic.value, 'currentHealth', 'current_health', 0)
);

const maxHealth = computed(() => pickNumber(statics.value, 'maxHealth', 'max_health', 4000));

const currentPower = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(80 + 15 * Math.sin(demoTick.value / 3500)))
        : pickNumber(dynamic.value, 'currentChassisEnergy', 'current_chassis_energy', 0)
);

const maxPower = computed(() => pickNumber(statics.value, 'maxChassisEnergy', 'max_chassis_energy', 100));

const currentExp = computed(() =>
    useDemo.value
        ? Math.floor((demoTick.value / 100) % 500)
        : pickNumber(dynamic.value, 'currentExperience', 'current_experience', 0)
);

const expToUpgrade = computed(() =>
    useDemo.value
        ? Math.max(0, 500 - currentExp.value)
        : pickNumber(dynamic.value, 'experienceForUpgrade', 'experience_for_upgrade', 100)
);

const level = computed(() =>
    useDemo.value
        ? 1 + Math.floor((demoTick.value / 12000) % 5)
        : pickNumber(statics.value, 'level', 'level', 1)
);

const healthRatio = computed(() => maxHealth.value > 0 ? clampRatio(currentHealth.value / maxHealth.value) : 0);
const powerRatio = computed(() => maxPower.value > 0 ? clampRatio(currentPower.value / maxPower.value) : 0);
const expRatio = computed(() => {
    const maxExp = currentExp.value + expToUpgrade.value;
    return maxExp > 0 ? clampRatio(currentExp.value / maxExp) : 0;
});

const ringDasharray = (radius: number, ratio: number) => {
    const circumference = 2 * Math.PI * radius;
    return `${circumference * ratio} ${circumference}`;
};

const rings = computed(() => [
    {
        key: 'health',
        radius: 44,
        color: '#F44336',
        dasharray: ringDasharray(44, healthRatio.value),
    },
    {
        key: 'power',
        radius: 36,
        color: '#40C4FF',
        dasharray: ringDasharray(36, powerRatio.value),
    },
    {
        key: 'experience',
        radius: 28,
        color: '#FFD54F',
        dasharray: ringDasharray(28, expRatio.value),
    },
]);
</script>

<style scoped lang="sass">
.triple-ring-hud
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    aspect-ratio: 1 / 1
    overflow: hidden

.triple-ring-svg
    width: 100%
    height: 100%
    overflow: visible

.ring-track
    stroke: rgba(255, 255, 255, 0.12)

.ring-progress
    transform-origin: center
    transform: rotate(-90deg) scaleX(-1)
    transition: stroke-dasharray 120ms linear

.level-text
    fill: var(--hud-text-primary)
    font-size: 24px
    font-weight: 700
    paint-order: stroke
    stroke: rgba(0, 0, 0, 0.45)
    stroke-width: 3px
    stroke-linejoin: round
</style>

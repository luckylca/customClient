<template>
    <div class="status-panel">
        <div class="section">
            <div class="section-title">功率</div>
            <div class="value-row">
                <div class="value">{{ currentPower }}</div>
                <div class="max">/ {{ maxPower }}</div>
            </div>
            <div class="hud-progress">
                <div
                    class="hud-progress-bar"
                    :style="{ width: powerPercent + '%', background: '#64B5F6' }"
                ></div>
            </div>
            <div class="meta-row">
                <div>缓冲: {{ currentBuffer }}</div>
                <div>热量: {{ currentHeat }} / {{ maxHeat }}</div>
            </div>
            <div class="meta-row">
                <div>冷却速率: {{ heatCooldownRate }}/s</div>
                <div>功率上限: {{ maxPowerSystem }}</div>
            </div>
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

const hasData = computed(() => !!robot.RobotDynamicStatusData);
const useDemo = computed(() => demoMode.value || !hasData.value);

const dynamic = computed(() => (robot.RobotDynamicStatusData || {}) as Record<string, unknown>);
const statics = computed(() => (robot.RobotStaticStatusData || {}) as Record<string, unknown>);

const pickNumber = (obj: Record<string, unknown>, camel: string, snake: string, fallback = 0): number => {
    const value = obj[camel] ?? obj[snake];
    return typeof value === 'number' ? value : fallback;
};

const currentPower = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(80 + 15 * Math.sin(demoTick.value / 3500)))
    : pickNumber(dynamic.value, 'currentChassisEnergy', 'current_chassis_energy', 0)
);
const maxPower = computed(() => pickNumber(statics.value, 'maxChassisEnergy', 'max_chassis_energy', 100));

const powerPercent = computed(() =>
    maxPower.value ? Math.min(100, (currentPower.value / maxPower.value) * 100) : 0
);

const currentBuffer = computed(() =>
    useDemo.value
        ? Math.floor(40 + 12 * Math.abs(Math.sin(demoTick.value / 3000)))
    : pickNumber(dynamic.value, 'currentBufferEnergy', 'current_buffer_energy', 0)
);

const currentHeat = computed(() =>
    useDemo.value
        ? Math.floor(60 + 20 * Math.abs(Math.cos(demoTick.value / 2500)))
    : pickNumber(dynamic.value, 'currentHeat', 'current_heat', 0)
);

const maxHeat = computed(() => pickNumber(statics.value, 'maxHeat', 'max_heat', 0));
const heatCooldownRate = computed(() => pickNumber(statics.value, 'heatCooldownRate', 'heat_cooldown_rate', 0));
const maxPowerSystem = computed(() => pickNumber(statics.value, 'maxPower', 'max_power', 0));
</script>

<style scoped lang="sass">
.status-panel
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    padding: 5%
    justify-content: center
    container-type: size

.section
    display: flex
    flex-direction: column
    gap: calc(3cqh * var(--hud-content-scale, 1))
    flex: 1
    justify-content: center

.section-title
    font-size: clamp(10px, calc(15cqh * var(--hud-content-scale, 1)), 24px)
    color: var(--hud-text-secondary)
    letter-spacing: 0.03em

.value-row
    display: flex
    align-items: baseline
    gap: calc(4cqw * var(--hud-content-scale, 1))

.value
    font-size: clamp(16px, calc(35cqh * var(--hud-content-scale, 1)), 48px)
    font-weight: 600

.max
    font-size: clamp(10px, calc(15cqh * var(--hud-content-scale, 1)), 24px)
    color: var(--hud-text-tertiary)

.meta-row
    display: flex
    justify-content: space-between
    gap: 10px
    font-size: clamp(9px, calc(10cqh * var(--hud-content-scale, 1)), 16px)
    color: var(--hud-text-tertiary)

</style>

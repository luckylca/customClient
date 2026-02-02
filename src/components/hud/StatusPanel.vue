<template>
    <div class="status-panel">
        <div class="section">
            <div class="section-title">生命值</div>
            <div class="value-row">
                <div class="value">{{ currentHealth }}</div>
                <div class="max">/ {{ maxHealth }}</div>
            </div>
            <div class="hud-progress">
                <div
                    class="hud-progress-bar"
                    :style="{ width: healthPercent + '%', background: healthColor }"
                    :class="{ 'health-critical': healthPercent < 20 }"
                ></div>
            </div>
        </div>
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
        </div>
        <div class="section">
            <div class="section-title">缓冲能量</div>
            <div class="value-row">
                <div class="value">{{ currentBuffer }}</div>
                <div class="max">/ {{ maxBuffer }}</div>
            </div>
            <div class="hud-progress">
                <div
                    class="hud-progress-bar"
                    :style="{ width: bufferPercent + '%', background: '#81C784' }"
                ></div>
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

const currentHealth = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(3200 + 600 * Math.sin(demoTick.value / 6000)))
        : robot.RobotDynamicStatusData?.current_health ?? 0
);
const maxHealth = computed(() => robot.RobotStaticStatusData?.max_health ?? 4000);
const currentPower = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(80 + 15 * Math.sin(demoTick.value / 3500)))
        : robot.RobotDynamicStatusData?.current_chassis_energy ?? 0
);
const maxPower = computed(() => robot.RobotStaticStatusData?.max_chassis_energy ?? 100);
const currentBuffer = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(40 + 12 * Math.cos(demoTick.value / 4200)))
        : robot.RobotDynamicStatusData?.current_buffer_energy ?? 0
);
const maxBuffer = computed(() => robot.RobotStaticStatusData?.max_buffer_energy ?? 60);

const healthPercent = computed(() =>
    maxHealth.value ? Math.min(100, (currentHealth.value / maxHealth.value) * 100) : 0
);
const powerPercent = computed(() =>
    maxPower.value ? Math.min(100, (currentPower.value / maxPower.value) * 100) : 0
);
const bufferPercent = computed(() =>
    maxBuffer.value ? Math.min(100, (currentBuffer.value / maxBuffer.value) * 100) : 0
);

const healthColor = computed(() => {
    if (healthPercent.value > 60) return 'var(--md-health-high)';
    if (healthPercent.value > 30) return 'var(--md-health-medium)';
    return 'var(--md-health-low)';
});
</script>

<style scoped lang="sass">
.status-panel
    display: flex
    flex-direction: column
    gap: 14px
    padding: 4px

.section
    display: flex
    flex-direction: column
    gap: 6px
    padding-bottom: 6px
    border-bottom: 1px solid rgba(255, 255, 255, 0.08)

.section:last-child
    border-bottom: none
    padding-bottom: 0

.section-title
    font-size: 12px
    color: var(--hud-text-secondary)
    letter-spacing: 0.03em

.value-row
    display: flex
    align-items: baseline
    gap: 6px

.value
    font-size: 22px
    font-weight: 600

.max
    font-size: 12px
    color: var(--hud-text-tertiary)
</style>

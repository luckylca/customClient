<template>
    <div class="status-panel">
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

const currentBuffer = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(40 + 12 * Math.cos(demoTick.value / 4200)))
        : robot.RobotDynamicStatusData?.current_buffer_energy ?? 0
);
const maxBuffer = computed(() => robot.RobotStaticStatusData?.max_buffer_energy ?? 60);

const bufferPercent = computed(() =>
    maxBuffer.value ? Math.min(100, (currentBuffer.value / maxBuffer.value) * 100) : 0
);
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
    gap: 3cqh
    flex: 1
    justify-content: center

.section-title
    font-size: clamp(10px, 15cqh, 24px)
    color: var(--hud-text-secondary)
    letter-spacing: 0.03em

.value-row
    display: flex
    align-items: baseline
    gap: 4cqw

.value
    font-size: clamp(16px, 35cqh, 48px)
    font-weight: 600

.max
    font-size: clamp(10px, 15cqh, 24px)
    color: var(--hud-text-tertiary)
</style>

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
            <div class="meta-row">
                <div>状态: {{ aliveStateText }}</div>
                <div>受击总量: {{ totalDamage }}</div>
            </div>
            <div class="meta-row">
                <div>复活: {{ respawnStateText }}</div>
                <div>判罚: {{ penaltyType }}</div>
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

const healthPercent = computed(() =>
    maxHealth.value ? Math.min(100, (currentHealth.value / maxHealth.value) * 100) : 0
);

const healthColor = computed(() => {
    if (healthPercent.value > 60) return 'var(--md-health-high)';
    if (healthPercent.value > 30) return 'var(--md-health-medium)';
    return 'var(--md-health-low)';
});

const aliveStateText = computed(() => {
    if (useDemo.value) return '存活';
    const state = robot.RobotStaticStatusData?.alive_state ?? 0;
    if (state === 1) return '存活';
    if (state === 2) return '战亡';
    return '未知';
});

const totalDamage = computed(() =>
    useDemo.value ? Math.floor(120 + 40 * Math.abs(Math.sin(demoTick.value / 2800))) : robot.RobotInjuryStatData?.total_damage ?? 0
);

const respawnStateText = computed(() => {
    if (useDemo.value) return '未触发';
    const pending = robot.RobotRespawnStatusData?.is_pending_respawn;
    if (pending) {
        const current = robot.RobotRespawnStatusData?.current_respawn_progress ?? 0;
        const total = robot.RobotRespawnStatusData?.total_respawn_progress ?? 0;
        return `读条 ${current}/${total}`;
    }
    return '正常';
});

const penaltyType = computed(() => {
    if (useDemo.value) return '无';
    const code = robot.PenaltyInfoData?.penalty_type;
    if (!code) return '无';
    return `类型 ${code}`;
});
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

.meta-row
    display: flex
    justify-content: space-between
    gap: 10px
    font-size: clamp(9px, 10cqh, 16px)
    color: var(--hud-text-tertiary)

</style>

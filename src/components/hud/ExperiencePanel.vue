<template>
    <div class="status-panel">
        <div class="section">
            <div class="section-title">升级经验</div>
            <div class="value-row">
                <div class="value">{{ currentExp }}</div>
                <div class="max">待升级还需: {{ expToUpgrade }}</div>
            </div>
            <div class="hud-progress">
                <div
                    class="hud-progress-bar"
                    :style="{ width: expPercent + '%', background: '#BA68C8' }"
                ></div>
            </div>
            <div class="meta-row">
                <div>等级: Lv.{{ level }}</div>
                <div>脱战: {{ outOfCombat }}</div>
            </div>
            <div class="meta-row">
                <div>补血权限: {{ canRemoteHeal }}</div>
                <div>补弹权限: {{ canRemoteAmmo }}</div>
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

const pickNumber = (key: string, fallback = 0): number => {
    const value = dynamic.value[key];
    return typeof value === 'number' ? value : fallback;
};

const pickBoolean = (key: string, fallback = false): boolean => {
    const value = dynamic.value[key];
    return typeof value === 'boolean' ? value : fallback;
};

const currentExp = computed(() =>
    useDemo.value
        ? Math.floor((demoTick.value / 100) % 500)
        : pickNumber('currentExperience', 0)
);
const expToUpgrade = computed(() => 
    useDemo.value
        ? 500 - currentExp.value
        : pickNumber('experienceForUpgrade', 100)
);

const maxExp = computed(() => currentExp.value + expToUpgrade.value);

const expPercent = computed(() =>
    maxExp.value > 0 ? Math.min(100, (currentExp.value / maxExp.value) * 100) : 0
);

const level = computed(() => robot.RobotStaticStatusData?.level ?? 1);

const outOfCombat = computed(() => {
    if (useDemo.value) return '否';
    const active = pickBoolean('isOutOfCombat', false);
    const left = pickNumber('outOfCombatCountdown', 0);
    return active ? `${left}s` : '否';
});

const canRemoteHeal = computed(() => (pickBoolean('canRemoteHeal', false) ? '是' : '否'));
const canRemoteAmmo = computed(() => (pickBoolean('canRemoteAmmo', false) ? '是' : '否'));
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

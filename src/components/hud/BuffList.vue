<template>
    <div class="buff-list">
        <div v-if="buffs.length === 0" class="empty">当前无增益</div>
        <div v-for="buff in buffs" :key="buff.id" class="buff-item">
            <div class="buff-name">{{ buff.label }}</div>
            <div class="buff-time">{{ buff.left }}s</div>
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

const buffLabel = (type: number) => {
    switch (type) {
        case 1:
            return '攻击增益';
        case 2:
            return '防御增益';
        case 3:
            return '冷却加速';
        case 4:
            return '功率增益';
        case 5:
            return '回血增益';
        case 6:
            return '补弹增益';
        default:
            return '未知增益';
    }
};

const buffs = computed(() => {
    if (demoMode.value && (!robot.BuffData || robot.BuffData.length === 0)) {
        const seconds = 15 + Math.floor(10 * Math.abs(Math.sin(demoTick.value / 3000)));
        return [
            { id: 'demo-buff-1', label: '攻击增益', left: seconds },
            { id: 'demo-buff-2', label: '防御增益', left: seconds - 4 },
        ];
    }
    return (robot.BuffData ?? []).map((buff, index) => ({
        id: `${buff.robot_id}-${index}`,
        label: buffLabel(buff.buff_type),
        left: buff.buff_left_time ?? 0,
    }));
});
</script>

<style scoped lang="sass">
.buff-list
    display: flex
    flex-direction: column
    gap: 10px
    padding: 4px

.buff-item
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px 12px
    border-radius: 12px
    background: rgba(255, 255, 255, 0.08)
    border: 1px solid rgba(255, 255, 255, 0.08)

.buff-name
    font-size: 12px
    color: var(--hud-text-secondary)
    letter-spacing: 0.02em

.buff-time
    font-size: 14px
    font-weight: 600

.empty
    font-size: 12px
    color: var(--hud-text-tertiary)
</style>

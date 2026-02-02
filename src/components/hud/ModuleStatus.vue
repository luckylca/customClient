<template>
    <div class="module-status">
        <div v-for="item in modules" :key="item.key" class="module-item">
            <div class="module-name">{{ item.label }}</div>
            <div class="module-chip" :class="statusClass(item.status)">
                {{ statusText(item.status) }}
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

const modules = computed(() => {
    const data = robot.RobotModuleStatusData;
    const demoPulse = Math.floor((demoTick.value / 4000) % 3);
    return [
        { key: 'main_controller', label: '主控', status: demoMode.value ? 1 : data?.main_controller ?? 0 },
        { key: 'video_transmission', label: '图传', status: demoMode.value ? 1 : data?.video_transmission ?? 0 },
        { key: 'power_manager', label: '电源', status: demoMode.value ? 1 : data?.power_manager ?? 0 },
        { key: 'rfid', label: 'RFID', status: demoMode.value ? 1 : data?.rfid ?? 0 },
        { key: 'uwb', label: 'UWB', status: demoMode.value ? 1 : data?.uwb ?? 0 },
        { key: 'armor', label: '装甲', status: demoMode.value ? 1 : data?.armor ?? 0 },
        { key: 'small_shooter', label: '17mm', status: demoMode.value ? 1 : data?.small_shooter ?? 0 },
        { key: 'big_shooter', label: '42mm', status: demoMode.value ? 1 : data?.big_shooter ?? 0 },
        { key: 'capacitor', label: '电容', status: demoMode.value ? (demoPulse === 2 ? 2 : 1) : data?.capacitor ?? 0 },
    ];
});

const statusText = (status: number) => {
    if (status === 0) return '未知';
    if (status === 1) return '正常';
    if (status === 2) return '异常';
    if (status === 3) return '离线';
    return '未知';
};

const statusClass = (status: number) => {
    if (status === 1) return 'ok';
    if (status === 2) return 'warn';
    if (status === 3) return 'bad';
    return 'idle';
};
</script>

<style scoped lang="sass">
.module-status
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 10px

.module-item
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px
    padding: 8px
    background: rgba(255, 255, 255, 0.06)
    border-radius: 10px

.module-name
    font-size: 12px
    color: var(--hud-text-secondary)

.module-chip
    padding: 4px 10px
    border-radius: 999px
    font-size: 11px
    font-weight: 600

.module-chip.ok
    background: rgba(76, 175, 80, 0.2)
    color: #a5d6a7

.module-chip.warn
    background: rgba(255, 152, 0, 0.2)
    color: #ffcc80

.module-chip.bad
    background: rgba(244, 67, 54, 0.2)
    color: #ef9a9a

.module-chip.idle
    background: rgba(255, 255, 255, 0.12)
    color: rgba(255, 255, 255, 0.6)
</style>

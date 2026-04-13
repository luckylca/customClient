<template>
    <div class="team-asset-panel">
        <div class="asset-row">
            <div class="label">剩余金币</div>
            <div class="value primary">{{ remainingEconomy }}</div>
        </div>
        <div class="asset-row">
            <div class="label">累计金币</div>
            <div class="value">{{ totalEconomy }}</div>
        </div>
        <div class="asset-row">
            <div class="label">科技等级</div>
            <div class="value">Lv.{{ techLevel }}</div>
        </div>
        <div class="asset-row">
            <div class="label">加密等级</div>
            <div class="value">Lv.{{ encryptionLevel }}</div>
        </div>

        <div class="hud-progress">
            <div class="hud-progress-bar" :style="{ width: economyPercent + '%', background: '#81C784' }"></div>
        </div>
        <div class="meta-row">
            <div>经济利用率</div>
            <div>{{ economyPercent.toFixed(0) }}%</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useGlobalStore } from '@/stores/globalData';
import { useHudDemoTicker } from './useHudDemo';

const { global: globalData } = useGlobalStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();
const logistics = computed(() => (globalData.GlobalLogisticsStatusData || {}) as Record<string, unknown>);
const pickNumber = (key: string, fallback = 0): number => {
    const value = logistics.value[key];
    return typeof value === 'number' ? value : fallback;
};

const hasData = computed(() => {
    const g = globalData.GlobalLogisticsStatusData;
    return !!(g && Object.keys(g).length > 0);
});

const useDemo = computed(() => demoMode.value || !hasData.value);

const remainingEconomy = computed(() =>
    useDemo.value
        ? Math.floor(520 + 120 * Math.sin(demoTick.value / 2400))
    : pickNumber('remainingEconomy', 0)
);

const totalEconomy = computed(() =>
    useDemo.value
        ? Math.floor(2800 + (demoTick.value / 40) % 900)
    : pickNumber('totalEconomyObtained', 0)
);

const techLevel = computed(() =>
    useDemo.value
        ? 2 + Math.floor(Math.abs(Math.sin(demoTick.value / 9000)) * 2)
    : pickNumber('techLevel', 0)
);

const encryptionLevel = computed(() =>
    useDemo.value
        ? 1 + Math.floor(Math.abs(Math.cos(demoTick.value / 7600)) * 2)
    : pickNumber('encryptionLevel', 0)
);

const economyPercent = computed(() => {
    const total = Math.max(totalEconomy.value, 1);
    return Math.min(100, (Math.max(remainingEconomy.value, 0) / total) * 100);
});
</script>

<style scoped lang="sass">
.team-asset-panel
    display: flex
    flex-direction: column
    gap: 10px
    height: 100%

.asset-row
    display: flex
    justify-content: space-between
    align-items: center
    gap: 8px
    padding: 8px 10px
    border-radius: 10px
    background: rgba(255, 255, 255, 0.08)
    border: 1px solid rgba(255, 255, 255, 0.08)

.label
    font-size: 12px
    color: var(--hud-text-secondary)

.value
    font-size: 14px
    font-weight: 600
    color: var(--hud-text-primary)

.value.primary
    color: #ffd54f

.meta-row
    display: flex
    justify-content: space-between
    font-size: 12px
    color: var(--hud-text-tertiary)
</style>

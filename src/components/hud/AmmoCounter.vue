<template>
    <div class="ammo-counter">
        <div class="ammo-row">
            <div class="ammo-title">剩余弹量</div>
            <div class="ammo-value">{{ remainingAmmo }}</div>
        </div>
        <div class="hud-progress">
            <div
                class="hud-progress-bar"
                :style="{ width: ammoPercent + '%', background: '#FFD54F' }"
            ></div>
        </div>
        <div class="heat-row">
            <div class="heat-title">热量</div>
            <div class="heat-value">{{ currentHeat }} / {{ maxHeat }}</div>
        </div>
        <div class="hud-progress">
            <div
                class="hud-progress-bar"
                :style="{ width: heatPercent + '%', background: heatColor }"
                :class="{ 'heat-overheat': heatPercent > 85 }"
            ></div>
        </div>
        <div class="stat-row">
            <div>射速: {{ fireRate.toFixed(1) }} m/s</div>
            <div>累计发弹: {{ totalFired }}</div>
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

const remainingAmmo = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(420 + 80 * Math.sin(demoTick.value / 3800)))
        : robot.RobotDynamicStatusData?.remaining_ammo ?? 0
);
const totalFired = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(1200 + 200 * Math.cos(demoTick.value / 5200)))
        : robot.RobotDynamicStatusData?.total_projectiles_fired ?? 0
);
const currentHeat = computed(() =>
    useDemo.value
        ? Math.max(0, Math.floor(60 + 50 * Math.sin(demoTick.value / 2600)))
        : robot.RobotDynamicStatusData?.current_heat ?? 0
);
const maxHeat = computed(() => robot.RobotStaticStatusData?.max_heat ?? 160);
const fireRate = computed(() =>
    useDemo.value
        ? Math.max(0, 8 + 4 * Math.abs(Math.sin(demoTick.value / 2000)))
        : robot.RobotDynamicStatusData?.last_projectile_fire_rate ?? 0
);

const ammoPercent = computed(() => {
    const maxAmmo = Math.max(remainingAmmo.value + totalFired.value, 1);
    return Math.min(100, (remainingAmmo.value / maxAmmo) * 100);
});

const heatPercent = computed(() =>
    maxHeat.value ? Math.min(100, (currentHeat.value / maxHeat.value) * 100) : 0
);

const heatColor = computed(() => {
    if (heatPercent.value < 50) return 'var(--md-heat-safe)';
    if (heatPercent.value < 80) return 'var(--md-heat-warning)';
    return 'var(--md-heat-danger)';
});
</script>

<style scoped lang="sass">
.ammo-counter
    display: flex
    flex-direction: column
    gap: 12px
    padding: 4px

.ammo-row,
.heat-row
    display: flex
    align-items: center
    justify-content: space-between
    padding: 2px 0

.ammo-title,
.heat-title
    font-size: 12px
    color: var(--hud-text-secondary)
    letter-spacing: 0.02em

.ammo-value
    font-size: 24px
    font-weight: 600

.heat-value
    font-size: 14px
    font-weight: 500

.stat-row
    display: flex
    justify-content: space-between
    font-size: 12px
    color: var(--hud-text-tertiary)
    padding-top: 4px
    border-top: 1px solid rgba(255, 255, 255, 0.08)
</style>

<template>
    <div class="minimap" :class="{ expanded }">
        <button class="minimap-card" type="button" @click="requestOpen">
            <img class="minimap-image" :src="minimapImage" alt="小地图" />
            <div class="minimap-overlay">
                <div class="overlay-top">
                    <div class="overlay-title">小地图</div>
                    <div class="overlay-subtitle">{{ subtitleText }}</div>
                </div>
                <div class="overlay-bottom">
                    <span class="badge" :class="teamSideClass">{{ teamLabel }}</span>
                    <span class="hint">点击放大</span>
                </div>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import minimapImage from '@/assets/小地图.png';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const props = withDefaults(
    defineProps<{
        expanded?: boolean;
    }>(),
    {
        expanded: false,
    }
);

const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const teamSideClass = computed(() => {
    if (robot.color === '红' || robot.color === 'red') return 'team-red';
    if (robot.color === '蓝' || robot.color === 'blue') return 'team-blue';
    return 'team-neutral';
});

const teamLabel = computed(() => {
    if (demoMode.value) return 'DEMO';
    if (teamSideClass.value === 'team-red') return 'RED';
    if (teamSideClass.value === 'team-blue') return 'BLUE';
    return 'UNKNOWN';
});

const subtitleText = computed(() => {
    if (demoMode.value) return `演示 · ${Math.round((demoTick.value / 1000) % 60)}s`;
    if (robot.RobotPositionData) return '实时数据';
    return '等待定位';
});

const requestOpen = () => {
    window.dispatchEvent(new CustomEvent('hud-minimap-overlay', {
        detail: {
            visible: true,
        },
    }));
};
</script>

<style scoped>
.minimap {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
}

.minimap.expanded {
    width: 100%;
    height: 100%;
}

.minimap-card {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: var(--md-radius-xl);
    overflow: hidden;
    background: rgba(10, 12, 18, 0.96);
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.minimap-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.92;
    filter: contrast(1.06) saturate(0.92) brightness(0.92);
}

.minimap-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    background: linear-gradient(180deg, rgba(5, 6, 10, 0.24), rgba(5, 6, 10, 0.5));
    color: var(--hud-text-primary);
    text-align: left;
}

.overlay-top,
.overlay-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.overlay-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08em;
}

.overlay-subtitle,
.hint {
    font-size: 11px;
    color: var(--hud-text-secondary);
}

.badge {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.08);
}

.badge.team-red {
    color: #ff8a80;
}

.badge.team-blue {
    color: #82b1ff;
}

.badge.team-neutral {
    color: var(--hud-text-secondary);
}

.minimap.expanded .minimap-card {
    border-radius: var(--md-radius-2xl);
}

.minimap.expanded .minimap-image {
    filter: contrast(1.1) saturate(1) brightness(0.98);
}

.minimap.expanded .overlay-title {
    font-size: 20px;
}

.minimap.expanded .overlay-subtitle,
.minimap.expanded .hint {
    font-size: 12px;
}
</style>

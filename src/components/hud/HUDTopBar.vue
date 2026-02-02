<template>
    <div class="hud-topbar">
        <div class="team-pill" :class="teamClass">{{ teamLabel }}</div>
        <div class="stage">
            <div class="stage-label">{{ stageLabel }}</div>
            <div class="stage-time">{{ countdown }}</div>
        </div>
        <div class="score">
            <div class="score-item">
                <span class="label">红方</span>
                <span class="value red">{{ redScore }}</span>
            </div>
            <div class="score-divider">|</div>
            <div class="score-item">
                <span class="label">蓝方</span>
                <span class="value blue">{{ blueScore }}</span>
            </div>
        </div>
        <div class="status-pill" :class="{ paused: globalData.GameStatusData?.is_paused }">
            {{ globalData.GameStatusData?.is_paused ? '暂停中' : '运行中' }}
        </div>
        <div class="robot-pill">
            {{ robot.type || '步兵' }} / {{ robot.id || '--' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useGlobalStore } from '@/stores/globalData';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

const { global: globalData } = useGlobalStore();
const { robot } = useRobotStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const useDemo = computed(() => demoMode.value || !globalData.GameStatusData?.stage_countdown_sec);

const stageLabel = computed(() => {
    const stage = useDemo.value
        ? 4
        : globalData.GameStatusData?.current_stage ?? 0;
    switch (stage) {
        case 1:
            return '准备阶段';
        case 2:
            return '自检阶段';
        case 3:
            return '倒计时';
        case 4:
            return '比赛进行中';
        case 5:
            return '结算中';
        default:
            return '未开始';
    }
});

const countdown = computed(() => {
    const seconds = useDemo.value
        ? 120 - Math.floor((demoTick.value / 1000) % 120)
        : globalData.GameStatusData?.stage_countdown_sec ?? 0;
    const min = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0');
    return `${min}:${sec}`;
});

const teamLabel = computed(() => (robot.color === 'red' ? '红方' : robot.color === 'blue' ? '蓝方' : '未选'));
const teamClass = computed(() => (robot.color === 'red' ? 'team-red' : robot.color === 'blue' ? 'team-blue' : 'team-neutral'));

const redScore = computed(() =>
    useDemo.value
        ? Math.floor(20 + 10 * Math.sin(demoTick.value / 5000))
        : globalData.GameStatusData?.red_score ?? 0
);

const blueScore = computed(() =>
    useDemo.value
        ? Math.floor(18 + 12 * Math.cos(demoTick.value / 5200))
        : globalData.GameStatusData?.blue_score ?? 0
);
</script>

<style scoped lang="sass">
// ==========================================
// HUD TopBar - Material Design 3 Styles
// ==========================================

.hud-topbar
    display: flex
    align-items: center
    gap: var(--md-spacing-lg)
    height: 100%
    font-family: var(--md-font-family)

// Team Pills - MD3 Pill Style
.team-pill
    padding: var(--md-spacing-xs) var(--md-spacing-md)
    border-radius: var(--md-radius-full)
    font-size: var(--md-label-medium)
    font-weight: 500
    letter-spacing: 0.06em
    transition: all var(--md-duration-short4) var(--md-easing-standard)

.team-red
    background: rgba(229, 57, 53, 0.2)
    color: var(--md-team-red)

.team-blue
    background: rgba(30, 136, 229, 0.2)
    color: var(--md-team-blue)

.team-neutral
    background: var(--hud-bg-glass)
    color: var(--hud-text-secondary)

// Stage Display
.stage
    display: flex
    flex-direction: column
    gap: 2px

.stage-label
    font-size: var(--md-label-medium)
    color: var(--hud-text-secondary)

.stage-time
    font-size: var(--md-title-large)
    font-weight: 500
    font-variant-numeric: tabular-nums

// Score Display
.score
    display: flex
    align-items: center
    gap: var(--md-spacing-sm)
    margin-left: auto

.score-item
    display: flex
    align-items: center
    gap: var(--md-spacing-xs)
    font-size: var(--md-label-medium)

.score-item .value
    font-size: var(--md-title-medium)
    font-weight: 500
    font-variant-numeric: tabular-nums

.score-item .value.red
    color: var(--md-team-red)

.score-item .value.blue
    color: var(--md-team-blue)

.score-divider
    opacity: 0.4
    color: var(--hud-text-tertiary)

// Status Pill
.status-pill
    padding: var(--md-spacing-xs) var(--md-spacing-md)
    border-radius: var(--md-radius-full)
    background: rgba(46, 125, 50, 0.2)
    color: var(--md-health-high)
    font-size: var(--md-label-medium)
    font-weight: 500

.status-pill.paused
    background: rgba(255, 152, 0, 0.2)
    color: var(--md-health-medium)

// Robot Pill
.robot-pill
    padding: var(--md-spacing-xs) var(--md-spacing-md)
    border-radius: var(--md-radius-full)
    background: var(--hud-bg-glass)
    font-size: var(--md-label-medium)
    color: var(--hud-text-primary)
</style>

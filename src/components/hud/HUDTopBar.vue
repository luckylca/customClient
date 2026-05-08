// src/components/hud/HUDTopBar.vue
// 显示HUD顶部信息栏的组件

<template>
    <div class="hud-topbar">
        <div class="team-pill" :class="teamClass">{{ teamLabel }}</div>
        <div class="stage">
            <div class="stage-label">{{ stageLabel }}</div>
            <div class="stage-time">{{ countdown }}</div>
        </div>
        <div class="mode-row">
            <div
                v-for="item in modeItems"
                :key="item.key"
                class="mode-chip"
                :class="item.className"
            >
                <span class="mode-label">{{ item.label }}</span>
                <span class="mode-value">{{ item.value }}</span>
            </div>
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
        <div class="status-pill" :class="{ paused: isPaused }">
            {{ isPaused ? '暂停中' : '运行中' }}
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

const gameStatus = computed(() => (globalData.GameStatusData || {}) as Record<string, unknown>);
const lobShotReserved = computed(() => (
    robot.CustomByteBlockLobShotReservedData
    || robot.CustomByteBlockData?.lobShotReserved
    || null
));
const pickNumber = (key: string, fallback = 0): number => {
    const value = gameStatus.value[key];
    return typeof value === 'number' ? value : fallback;
};
const pickBoolean = (key: string, fallback = false): boolean => {
    const value = gameStatus.value[key];
    return typeof value === 'boolean' ? value : fallback;
};
const boolText = (value?: boolean): string => {
    if (value === true) return '开';
    if (value === false) return '关';
    return '-';
};
const boolClass = (value?: boolean): string => {
    if (value === true) return 'on';
    if (value === false) return 'off';
    return 'unknown';
};
const modeClass = (value?: number): string => {
    if (typeof value !== 'number') return 'unknown';
    return value === 0 ? 'off' : 'on';
};
const jointModeMap: Record<number, string> = {
    0: '失能',
    1: '上台阶',
    2: '悬挂',
    3: '收腿',
};
const chassisModeMap: Record<number, string> = {
    0: '失能',
    1: '自由',
    2: '跟随',
    3: '小陀螺',
};

const useDemo = computed(() => demoMode.value || !pickNumber('stageCountdownSec', 0));
const isPaused = computed(() => pickBoolean('isPaused', false));

const stageLabel = computed(() => {
    const stage = useDemo.value
        ? 4
        : pickNumber('currentStage', 0);
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
        : pickNumber('stageCountdownSec', 0);
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

const demoModes = computed(() => {
    const t = demoTick.value;
    return {
        frictionMode: Math.floor(t / 2500) % 2 === 0,
        visionMode: Math.floor(t / 5000) % 3 !== 0,
        powerMode: Math.floor(t / 3600) % 2 === 0,
        chassisMode: Math.floor(t / 3200) % 4,
        jointMode: Math.floor(t / 4200) % 4,
    };
});

const chassisModeText = computed(() => {
    if (useDemo.value) return chassisModeMap[demoModes.value.chassisMode];
    if (lobShotReserved.value?.chassisModeLabel) return lobShotReserved.value.chassisModeLabel;
    const mode = lobShotReserved.value?.chassisMode;
    return typeof mode === 'number' ? (chassisModeMap[mode] || `未知${mode}`) : '-';
});

const jointModeText = computed(() => {
    if (useDemo.value) return jointModeMap[demoModes.value.jointMode];
    if (lobShotReserved.value?.jointModeLabel) return lobShotReserved.value.jointModeLabel;
    const mode = lobShotReserved.value?.jointMode;
    return typeof mode === 'number' ? (jointModeMap[mode] || `未知${mode}`) : '-';
});

const modeItems = computed(() => {
    if (useDemo.value) {
        return [
            {
                key: 'friction',
                label: '摩擦',
                value: boolText(demoModes.value.frictionMode),
                className: boolClass(demoModes.value.frictionMode),
            },
            {
                key: 'vision',
                label: '视觉',
                value: boolText(demoModes.value.visionMode),
                className: boolClass(demoModes.value.visionMode),
            },
            {
                key: 'power',
                label: '超电',
                value: boolText(demoModes.value.powerMode),
                className: boolClass(demoModes.value.powerMode),
            },
            {
                key: 'chassis',
                label: '底盘',
                value: chassisModeText.value,
                className: modeClass(demoModes.value.chassisMode),
            },
            {
                key: 'joint',
                label: '腿',
                value: jointModeText.value,
                className: modeClass(demoModes.value.jointMode),
            },
        ];
    }

    return [
        {
            key: 'friction',
            label: '摩擦',
            value: boolText(lobShotReserved.value?.frictionMode),
            className: boolClass(lobShotReserved.value?.frictionMode),
        },
        {
            key: 'vision',
            label: '视觉',
            value: boolText(lobShotReserved.value?.visionMode),
            className: boolClass(lobShotReserved.value?.visionMode),
        },
        {
            key: 'power',
            label: '超电',
            value: boolText(lobShotReserved.value?.powerMode),
            className: boolClass(lobShotReserved.value?.powerMode),
        },
        {
            key: 'chassis',
            label: '底盘',
            value: chassisModeText.value,
            className: modeClass(lobShotReserved.value?.chassisMode),
        },
        {
            key: 'joint',
            label: '腿',
            value: jointModeText.value,
            className: modeClass(lobShotReserved.value?.jointMode),
        },
    ];
});

const redScore = computed(() =>
    useDemo.value
        ? Math.floor(20 + 10 * Math.sin(demoTick.value / 5000))
    : pickNumber('redScore', 0)
);

const blueScore = computed(() =>
    useDemo.value
        ? Math.floor(18 + 12 * Math.cos(demoTick.value / 5200))
    : pickNumber('blueScore', 0)
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

.mode-row
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 8px
    flex: 1 1 auto
    min-width: 280px
    margin-left: 8px

.mode-chip
    display: flex
    align-items: center
    justify-content: center
    gap: 4px
    min-width: 0
    padding: 6px 8px
    border-radius: 999px
    background: rgba(255, 255, 255, 0.06)
    border: 1px solid rgba(255, 255, 255, 0.1)

    &.on
        color: var(--md-health-high)

    &.off
        color: var(--md-health-low)

    &.unknown
        color: var(--hud-text-tertiary)

.mode-label
    font-size: var(--md-label-small)
    color: var(--hud-text-tertiary)
    white-space: nowrap

.mode-value
    font-size: var(--md-label-medium)
    font-weight: 600
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

// Score Display
.score
    display: flex
    align-items: center
    gap: var(--md-spacing-sm)
    margin-left: auto
    flex: 0 0 auto

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

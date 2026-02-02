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
.hud-topbar
    display: flex
    align-items: center
    gap: 16px
    height: 100%

.team-pill
    padding: 6px 12px
    border-radius: 999px
    font-size: 12px
    font-weight: 600
    letter-spacing: 0.06em

.team-red
    background: rgba(229, 57, 53, 0.2)
    color: #ff8a80

.team-blue
    background: rgba(30, 136, 229, 0.2)
    color: #82b1ff

.team-neutral
    background: rgba(255, 255, 255, 0.12)
    color: rgba(255, 255, 255, 0.7)

.stage
    display: flex
    flex-direction: column
    gap: 2px

.stage-label
    font-size: 12px
    color: var(--hud-text-secondary)

.stage-time
    font-size: 20px
    font-weight: 600

.score
    display: flex
    align-items: center
    gap: 8px
    margin-left: auto

.score-item
    display: flex
    align-items: center
    gap: 6px
    font-size: 12px

.score-item .value
    font-size: 18px
    font-weight: 600

.score-item .value.red
    color: #ff8a80

.score-item .value.blue
    color: #82b1ff

.score-divider
    opacity: 0.4

.status-pill
    padding: 6px 12px
    border-radius: 999px
    background: rgba(46, 125, 50, 0.2)
    color: #a5d6a7
    font-size: 12px

.status-pill.paused
    background: rgba(255, 152, 0, 0.2)
    color: #ffe0b2

.robot-pill
    padding: 6px 12px
    border-radius: 999px
    background: rgba(255, 255, 255, 0.12)
    font-size: 12px
</style>

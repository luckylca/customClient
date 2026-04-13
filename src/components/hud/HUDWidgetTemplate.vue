<template>
    <div
        class="hud-widget-template"
        :class="`bg-${resolvedBackgroundMode}`"
        :style="surfaceStyle"
    >
        <div class="header">
            <div class="title">{{ titleText }}</div>
            <div class="tag">{{ sourceTag }}</div>
        </div>

        <div class="value-row">
            <div class="main-value">{{ mainValue }}</div>
            <div class="sub-value">{{ subValue }}</div>
        </div>

        <div class="hud-progress">
            <div class="hud-progress-bar" :style="{ width: progressPercent + '%', background: progressColor }"></div>
        </div>

        <div class="meta-row">
            <div>{{ metaLeft }}</div>
            <div>{{ metaRight }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useGlobalStore } from '@/stores/globalData';
import { useHudDemoTicker } from './useHudDemo';

const props = withDefaults(
    defineProps<{
        titleText?: string;
        sourceTag?: string;
        backgroundMode?: 'inherit' | 'transparent' | 'mask' | 'blur';
        backgroundOpacity?: number;
        blurIntensity?: number;
    }>(),
    {
        titleText: '自定义 HUD',
        sourceTag: 'Template',
        backgroundMode: 'inherit',
        backgroundOpacity: 0.35,
        blurIntensity: 8,
    }
);

const { robot } = useRobotStore();
const { global: globalData } = useGlobalStore();
const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const dynamic = computed(() => (robot.RobotDynamicStatusData || {}) as Record<string, unknown>);
const statics = computed(() => (robot.RobotStaticStatusData || {}) as Record<string, unknown>);
const gameStatus = computed(() => (globalData.GameStatusData || {}) as Record<string, unknown>);

const pickNumber = (obj: Record<string, unknown>, key: string, fallback = 0): number => {
    const value = obj[key];
    return typeof value === 'number' ? value : fallback;
};

// 背景模式默认继承 HUDContainer；仅在模板组件内需要独立背景时再覆盖。
const resolvedBackgroundMode = computed(() => props.backgroundMode);
const surfaceStyle = computed(() => ({
    '--tpl-mask-opacity': String(props.backgroundOpacity),
    '--tpl-blur': `${props.blurIntensity}px`,
}));

// Example: use robot dynamic + global status with demo fallback.
const hasData = computed(() => !!robot.RobotDynamicStatusData || pickNumber(gameStatus.value, 'stageCountdownSec', 0) > 0);
const useDemo = computed(() => demoMode.value || !hasData.value);

const mainValue = computed(() => {
    if (useDemo.value) return Math.floor(75 + 20 * Math.sin(demoTick.value / 2000));
    return pickNumber(dynamic.value, 'currentChassisEnergy', 0);
});

const subValue = computed(() => {
    if (useDemo.value) return '/ 100';
    const max = pickNumber(statics.value, 'maxChassisEnergy', 100);
    return `/ ${max}`;
});

const progressPercent = computed(() => {
    if (useDemo.value) return Math.floor(50 + 30 * Math.sin(demoTick.value / 2600));
    const current = pickNumber(dynamic.value, 'currentChassisEnergy', 0);
    const max = pickNumber(statics.value, 'maxChassisEnergy', 100);
    return max > 0 ? Math.min(100, (current / max) * 100) : 0;
});

const progressColor = computed(() => {
    if (progressPercent.value > 60) return '#64B5F6';
    if (progressPercent.value > 30) return '#FFD54F';
    return '#E57373';
});

const metaLeft = computed(() => {
    if (useDemo.value) return '演示模式';
    const level = robot.RobotStaticStatusData?.level ?? 1;
    return `等级 Lv.${level}`;
});

const metaRight = computed(() => {
    if (useDemo.value) return '数据占位';
    return `阶段 ${pickNumber(gameStatus.value, 'currentStage', 0)}`;
});
</script>

<style scoped lang="sass">
.hud-widget-template
    position: relative
    display: flex
    flex-direction: column
    gap: 10px
    width: 100%
    height: 100%
    padding: 10px
    border-radius: 12px
    overflow: hidden

    &::before,
    &::after
        content: ''
        position: absolute
        inset: 0
        pointer-events: none
        z-index: 0
        border-radius: inherit

    &::before
        background: transparent

    &::after
        display: none

    > *
        position: relative
        z-index: 1

// 继承模式：不额外加背景，由 HUDContainer 的全局/单组件背景接管。
.hud-widget-template.bg-inherit::before,
.hud-widget-template.bg-inherit::after
    display: none

// 透明模式：只保留内容。
.hud-widget-template.bg-transparent::before,
.hud-widget-template.bg-transparent::after
    display: none

// 遮罩模式：适合背景图上提升文本可读性。
.hud-widget-template.bg-mask::before
    background: rgba(0, 0, 0, var(--tpl-mask-opacity, 0.35))

// 模糊模式：在背景复杂时保持信息清晰。
.hud-widget-template.bg-blur::before
    background: rgba(0, 0, 0, 0.22)

.hud-widget-template.bg-blur::after
    display: block
    backdrop-filter: blur(var(--tpl-blur, 8px))
    -webkit-backdrop-filter: blur(var(--tpl-blur, 8px))
    background: rgba(255, 255, 255, 0.06)

.header
    display: flex
    align-items: center
    justify-content: space-between

.title
    font-size: 13px
    font-weight: 600
    color: var(--hud-text-primary)

.tag
    font-size: 10px
    color: var(--hud-text-tertiary)
    border: 1px solid rgba(255, 255, 255, 0.2)
    border-radius: 999px
    padding: 2px 8px

.value-row
    display: flex
    align-items: baseline
    gap: 8px

.main-value
    font-size: clamp(16px, 30cqh, 36px)
    font-weight: 700

.sub-value
    font-size: clamp(10px, 14cqh, 18px)
    color: var(--hud-text-tertiary)

.meta-row
    display: flex
    justify-content: space-between
    gap: 10px
    font-size: 11px
    color: var(--hud-text-secondary)
</style>

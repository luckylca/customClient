// src/components/hud/ControlHints.vue
// 显示控制提示的组件

<template>
    <div class="control-hints">
        <div
            v-for="hint in hints"
            :key="hint.key"
            class="hint"
            :class="hint.level"
        >
            {{ hint.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useGlobalStore } from '@/stores/globalData';

const LOW_AMMO_THRESHOLD = 5;
const SUFFICIENT_ECONOMY_THRESHOLD = 500;

const { robot } = useRobotStore();
const { global: globalData } = useGlobalStore();

type HintLevel = 'info' | 'success' | 'warning';

type ControlHint = {
    key: string;
    text: string;
    level: HintLevel;
};

const pickNumber = (obj: Record<string, unknown>, camel: string, snake: string): number | null => {
    const value = obj[camel] ?? obj[snake];
    return typeof value === 'number' ? value : null;
};

const lobShotReserved = computed(() => (
    robot.CustomByteBlockLobShotReservedData
    || robot.CustomByteBlockData?.lobShotReserved
    || null
));

const remainingAmmo = computed(() => pickNumber(
    (robot.RobotDynamicStatusData || {}) as Record<string, unknown>,
    'remainingAmmo',
    'remaining_ammo',
));

const remainingEconomy = computed(() => pickNumber(
    (globalData.GlobalLogisticsStatusData || {}) as Record<string, unknown>,
    'remainingEconomy',
    'remaining_economy',
));

const hints = computed<ControlHint[]>(() => {
    const items: ControlHint[] = [];
    const frictionMode = lobShotReserved.value?.frictionMode;

    items.push({
        key: 'friction-mode',
        text: frictionMode === true
            ? '当前摩擦轮已开，可以发弹'
            : frictionMode === false
                ? '当前摩擦轮未开，发弹前请先开启摩擦轮'
                : '当前摩擦轮状态未知，请确认回传数据',
        level: frictionMode === true ? 'success' : frictionMode === false ? 'warning' : 'info',
    });

    if (remainingAmmo.value !== null && remainingAmmo.value < LOW_AMMO_THRESHOLD) {
        items.push({
            key: 'low-ammo',
            text: `当前子弹数量只剩 ${remainingAmmo.value} 发`,
            level: 'warning',
        });
    }

    if (remainingEconomy.value !== null && remainingEconomy.value > SUFFICIENT_ECONOMY_THRESHOLD) {
        items.push({
            key: 'sufficient-economy',
            text: `当前经济充足，剩余金币 ${remainingEconomy.value}`,
            level: 'success',
        });
    }

    items.push(
        { key: 'open-menu', text: '按 P 打开菜单，连接图传源', level: 'info' },
        { key: 'match-menu', text: '按 ESC 打开比赛菜单', level: 'info' },
        { key: 'edit-hud', text: '按 Ctrl+E 进入 HUD 编辑模式', level: 'info' },
        { key: 'resize-hud', text: '拖动标题栏移动，拖动边缘调整大小', level: 'info' },
    );

    return items;
});
</script>

<style scoped lang="sass">
.control-hints
    display: flex
    flex-direction: column
    gap: 8px
    font-size: 12px
    color: var(--hud-text-secondary)
    padding: 4px

.hint
    padding: 8px 10px
    border-radius: 10px
    background: rgba(255, 255, 255, 0.08)
    border: 1px solid rgba(255, 255, 255, 0.08)

    &.success
        color: var(--md-health-high)
        background: rgba(76, 175, 80, 0.12)
        border-color: rgba(76, 175, 80, 0.22)

    &.warning
        color: var(--md-health-low)
        background: rgba(244, 67, 54, 0.12)
        border-color: rgba(244, 67, 54, 0.22)

    &.info
        color: var(--hud-text-secondary)
</style>

<template>
    <div class="inspector-panel">
        <div class="panel-header">
            <div class="panel-title">{{ title }}</div>
            <div class="panel-subtitle">已接收 {{ activeCount }}/{{ topics.length }}</div>
        </div>

        <div class="topic-list">
            <div v-for="topic in topics" :key="topic.key" class="topic-card" :class="{ active: topic.hasData }">
                <div class="topic-head">
                    <div class="topic-name">{{ topic.label }}</div>
                    <div class="topic-state" :class="topic.hasData ? 'ok' : 'idle'">
                        {{ topic.hasData ? '已接收' : '等待中' }}
                    </div>
                </div>
                <div v-if="topic.preview.length > 0" class="topic-body">
                    <div v-for="item in topic.preview" :key="item.key" class="kv-row">
                        <span class="kv-key">{{ item.key }}</span>
                        <span class="kv-value">{{ item.value }}</span>
                    </div>
                </div>
                <div v-else class="topic-empty">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useGlobalStore } from '@/stores/globalData';
import { useRobotStore } from '@/stores/robotData';

const props = withDefaults(
    defineProps<{
        scope?: 'robot' | 'global';
    }>(),
    {
        scope: 'robot',
    }
);

const { robot } = useRobotStore();
const { global: globalData } = useGlobalStore();
const demoMode = inject('hudDemoMode', computed(() => false));

const title = computed(() => (props.scope === 'robot' ? '机器人数据总览' : '全局数据总览'));

type TopicEntry = {
    key: string;
    label: string;
    value: unknown;
};

const robotEntries = computed<TopicEntry[]>(() => [
    { key: 'RobotStaticStatus', label: '固定状态', value: robot.RobotStaticStatusData },
    { key: 'RobotDynamicStatus', label: '实时状态', value: robot.RobotDynamicStatusData },
    { key: 'RobotModuleStatus', label: '模块状态', value: robot.RobotModuleStatusData },
    { key: 'RobotPosition', label: '位置姿态', value: robot.RobotPositionData },
    { key: 'RobotRespawnStatus', label: '复活状态', value: robot.RobotRespawnStatusData },
    { key: 'RobotInjuryStat', label: '受伤统计', value: robot.RobotInjuryStatData },
    { key: 'Buff', label: '增益状态', value: robot.BuffData },
    { key: 'PenaltyInfo', label: '判罚信息', value: robot.PenaltyInfoData },
    { key: 'RobotPathPlanInfo', label: '轨迹规划', value: robot.RobotPathPlanInfoData },
    { key: 'MapClickInfoNotify', label: '地图标记', value: robot.MapClickInfoNotifyData },
    { key: 'RadarInfoToClient', label: '雷达信息', value: robot.RadarInfoToClientData },
    { key: 'CustomByteBlock', label: '自定义字节流', value: robot.CustomByteBlockData },
    { key: 'AssemblyCommand', label: '装配指令', value: robot.AssemblyCommandData },
    { key: 'TechCoreMotionStateSync', label: '科技核心', value: robot.TechCoreMotionStateSyncData },
    { key: 'PerformanceSelection', label: '性能体系', value: robot.PerformanceSelectionData },
    { key: 'HeroDeployMode', label: '英雄部署', value: robot.HeroDeployModeData },
    { key: 'RuneStatus', label: '能量机关', value: robot.RuneStatusData },
    { key: 'SentinelStatusSync', label: '哨兵状态', value: robot.SentinelStatusSyncData },
    { key: 'DartInfo', label: '飞镖信息', value: robot.DartInfoData },
    { key: 'GuardCtrl', label: '哨兵控制结果', value: robot.GuardCtrlData },
    { key: 'AirSupport', label: '空中支援', value: robot.AirSupportData },
]);

const globalEntries = computed<TopicEntry[]>(() => [
    { key: 'GameStatus', label: '比赛状态', value: globalData.GameStatusData },
    { key: 'GlobalUnitStatus', label: '单位状态', value: globalData.GlobalUnitStatusData },
    { key: 'GlobalLogisticsStatus', label: '后勤状态', value: globalData.GlobalLogisticsStatusData },
    { key: 'GlobalSpecialMechanism', label: '特殊机制', value: globalData.GlobalSpecialMechanismData },
    { key: 'Event', label: '事件流', value: globalData.EnventData },
]);

const hasPayload = (value: unknown) => {
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
    return true;
};

const formatValue = (value: unknown): string => {
    if (value == null) return '--';
    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        return value
            .slice(0, 4)
            .map((item) => formatValue(item))
            .join(', ') + (value.length > 4 ? ' ...' : '');
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return String(value);
};

const flattenPreview = (value: unknown) => {
    if (value == null) return [] as Array<{ key: string; value: string }>;

    if (Array.isArray(value)) {
        return value.slice(0, 4).map((item, index) => ({
            key: `[${index}]`,
            value: formatValue(item),
        }));
    }

    if (typeof value === 'object') {
        const entries = Object.entries(value as Record<string, unknown>);
        return entries.slice(0, 8).map(([k, v]) => ({
            key: k,
            value: formatValue(v),
        }));
    }

    return [{ key: 'value', value: formatValue(value) }];
};

const sourceEntries = computed(() => (props.scope === 'robot' ? robotEntries.value : globalEntries.value));

const topics = computed(() =>
    sourceEntries.value.map((entry) => {
        const hasData = hasPayload(entry.value);
        const demoPreview = demoMode.value && !hasData
            ? [{ key: 'state', value: '演示模式数据占位' }]
            : flattenPreview(entry.value);
        return {
            key: entry.key,
            label: entry.label,
            hasData: hasData || demoMode.value,
            preview: demoPreview,
        };
    })
);

const activeCount = computed(() => topics.value.filter((topic) => topic.hasData).length);
</script>

<style scoped lang="sass">
.inspector-panel
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    gap: 10px

.panel-header
    display: flex
    align-items: baseline
    justify-content: space-between
    gap: 8px

.panel-title
    font-size: 14px
    font-weight: 600
    color: var(--hud-text-primary)

.panel-subtitle
    font-size: 11px
    color: var(--hud-text-tertiary)

.topic-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
    gap: 10px
    overflow: auto
    padding-right: 2px

.topic-card
    border-radius: 10px
    background: rgba(255, 255, 255, 0.06)
    border: 1px solid rgba(255, 255, 255, 0.08)
    padding: 8px
    display: flex
    flex-direction: column
    gap: 6px

.topic-card.active
    border-color: rgba(129, 199, 132, 0.6)

.topic-head
    display: flex
    align-items: center
    justify-content: space-between
    gap: 6px

.topic-name
    font-size: 12px
    font-weight: 600
    color: var(--hud-text-primary)

.topic-state
    font-size: 10px
    border-radius: 999px
    padding: 2px 8px

.topic-state.ok
    background: rgba(129, 199, 132, 0.2)
    color: #b9f6ca

.topic-state.idle
    background: rgba(255, 255, 255, 0.12)
    color: rgba(255, 255, 255, 0.7)

.topic-body
    display: flex
    flex-direction: column
    gap: 4px

.kv-row
    display: grid
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)
    gap: 8px
    font-size: 11px

.kv-key
    color: var(--hud-text-secondary)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.kv-value
    color: var(--hud-text-primary)
    text-align: right
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.topic-empty
    font-size: 11px
    color: var(--hud-text-tertiary)
</style>

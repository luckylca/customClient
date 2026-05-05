<template>
    <div class="hero-lob-mini">
        <div class="top-row">
            <div class="title">英雄状态</div>

            <div class="right-info">
                <span class="offline" :class="{ danger: offlineMotorCount > 0 }">
                    离线 {{ offlineMotorCount }}
                </span>

                <span class="flags" :class="{ empty: !hasData && !useDemo }">
                    {{ useDemo ? 'DEMO' : hasData ? flagsHex : '无数据' }}
                </span>
            </div>
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

        <div class="motor-grid">
            <div
                v-for="item in motorItems"
                :key="item.key"
                class="motor-item"
                :class="onlineClass(item.online)"
                :title="item.label"
            >
                <span class="dot"></span>
                <span class="name">{{ item.shortLabel }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';
import type { LobShotReservedPack } from '@/types/rmType';

const { robot } = useRobotStore();

const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const realLob = computed<LobShotReservedPack>(() => {
    return (
        robot.CustomByteBlockLobShotReservedData
        || robot.CustomByteBlockData?.lobShotReserved
        || {}
    ) as LobShotReservedPack;
});

const hasData = computed(() => {
    return !!robot.CustomByteBlockLobShotReservedData
        || !!robot.CustomByteBlockData?.lobShotReserved;
});

const useDemo = computed(() => {
    return demoMode.value || !hasData.value;
});

const demoLob = computed<LobShotReservedPack>(() => {
    const t = demoTick.value;

    const phase = Math.floor(t / 1800);

    const chassisMode = Math.floor(t / 3200) % 4;
    const jointMode = Math.floor(t / 4200) % 4;

    const pitchOnline = phase % 11 !== 0;
    const frictionLbOnline = phase % 9 !== 0;
    const loaderOnline = phase % 7 !== 0;

    const motorOnlineList = [
        true,               // bit0  chassislf
        true,               // bit1  chassisrf
        true,               // bit2  chassislb
        true,               // bit3  chassisrb
        true,               // bit4  jointleft
        true,               // bit5  jointright
        true,               // bit6  yaw
        pitchOnline,         // bit7  pitch
        true,               // bit8  frictionuf
        true,               // bit9  frictiondf
        frictionLbOnline,    // bit10 frictionlb
        true,               // bit11 frictionrb
        loaderOnline,        // bit12 loader
    ];

    let onlineFlagsRaw = 0;

    motorOnlineList.forEach((online, index) => {
        if (online) {
            onlineFlagsRaw |= 1 << index;
        }
    });

    const frictionMode = Math.floor(t / 2500) % 2 === 0;
    const visionMode = Math.floor(t / 5000) % 3 !== 0;
    const powerMode = Math.floor(t / 3600) % 2 === 0;

    if (frictionMode) onlineFlagsRaw |= 1 << 13;
    if (visionMode) onlineFlagsRaw |= 1 << 14;
    if (powerMode) onlineFlagsRaw |= 1 << 15;

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

    return {
        onlineFlagsRaw,

        chassislfMotorOnline: motorOnlineList[0],
        chassisrfMotorOnline: motorOnlineList[1],
        chassislbMotorOnline: motorOnlineList[2],
        chassisrbMotorOnline: motorOnlineList[3],

        jointleftMotorOnline: motorOnlineList[4],
        jointrightMotorOnline: motorOnlineList[5],

        yawMotorOnline: motorOnlineList[6],
        pitchMotorOnline: motorOnlineList[7],

        frictionufMotorOnline: motorOnlineList[8],
        frictiondfMotorOnline: motorOnlineList[9],
        frictionlbMotorOnline: motorOnlineList[10],
        frictionrbMotorOnline: motorOnlineList[11],

        loaderMotorOnline: motorOnlineList[12],

        frictionMode,
        visionMode,
        powerMode,

        jointMode,
        jointModeLabel: jointModeMap[jointMode],

        chassisMode,
        chassisModeLabel: chassisModeMap[chassisMode],

        modeReserved: 0,

        offlineMotorCount: motorOnlineList.filter((online) => !online).length,
    };
});

const lob = computed<LobShotReservedPack>(() => {
    return useDemo.value ? demoLob.value : realLob.value;
});

const flagsHex = computed(() => {
    const value = lob.value.onlineFlagsRaw;
    if (typeof value !== 'number') return '0x----';
    return `0x${value.toString(16).toUpperCase().padStart(4, '0')}`;
});

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

const onlineClass = (value?: boolean): string => {
    if (value === true) return 'online';
    if (value === false) return 'offline';
    return 'unknown';
};

const jointModeText = computed(() => {
    if (lob.value.jointModeLabel) return lob.value.jointModeLabel;

    const mode = lob.value.jointMode;
    const map: Record<number, string> = {
        0: '失能',
        1: '上台阶',
        2: '悬挂',
        3: '收腿',
    };

    return typeof mode === 'number' ? (map[mode] || `未知${mode}`) : '-';
});

const chassisModeText = computed(() => {
    if (lob.value.chassisModeLabel) return lob.value.chassisModeLabel;

    const mode = lob.value.chassisMode;
    const map: Record<number, string> = {
        0: '失能',
        1: '自由',
        2: '跟随',
        3: '小陀螺',
    };

    return typeof mode === 'number' ? (map[mode] || `未知${mode}`) : '-';
});

const modeItems = computed(() => [
    {
        key: 'friction',
        label: '摩擦',
        value: boolText(lob.value.frictionMode),
        className: boolClass(lob.value.frictionMode),
    },
    {
        key: 'vision',
        label: '视觉',
        value: boolText(lob.value.visionMode),
        className: boolClass(lob.value.visionMode),
    },
    {
        key: 'power',
        label: '超电',
        value: boolText(lob.value.powerMode),
        className: boolClass(lob.value.powerMode),
    },
    {
        key: 'chassis',
        label: '底盘',
        value: chassisModeText.value,
        className: modeClass(lob.value.chassisMode),
    },
    {
        key: 'joint',
        label: '腿',
        value: jointModeText.value,
        className: modeClass(lob.value.jointMode),
    },
]);

const motorItems = computed(() => [
    {
        key: 'chassis-lf',
        label: '左前底盘',
        shortLabel: 'LF',
        online: lob.value.chassislfMotorOnline,
    },
    {
        key: 'chassis-rf',
        label: '右前底盘',
        shortLabel: 'RF',
        online: lob.value.chassisrfMotorOnline,
    },
    {
        key: 'chassis-lb',
        label: '左后底盘',
        shortLabel: 'LB',
        online: lob.value.chassislbMotorOnline,
    },
    {
        key: 'chassis-rb',
        label: '右后底盘',
        shortLabel: 'RB',
        online: lob.value.chassisrbMotorOnline,
    },
    {
        key: 'joint-left',
        label: '左腿电机',
        shortLabel: 'JL',
        online: lob.value.jointleftMotorOnline,
    },
    {
        key: 'joint-right',
        label: '右腿电机',
        shortLabel: 'JR',
        online: lob.value.jointrightMotorOnline,
    },
    {
        key: 'yaw',
        label: 'Yaw 电机',
        shortLabel: 'YAW',
        online: lob.value.yawMotorOnline,
    },
    {
        key: 'pitch',
        label: 'Pitch 电机',
        shortLabel: 'PIT',
        online: lob.value.pitchMotorOnline,
    },
    {
        key: 'friction-uf',
        label: '上摩擦轮',
        shortLabel: 'UF',
        online: lob.value.frictionufMotorOnline,
    },
    {
        key: 'friction-df',
        label: '下摩擦轮',
        shortLabel: 'DF',
        online: lob.value.frictiondfMotorOnline,
    },
    {
        key: 'friction-lb',
        label: '左后摩擦轮',
        shortLabel: 'FL',
        online: lob.value.frictionlbMotorOnline,
    },
    {
        key: 'friction-rb',
        label: '右后摩擦轮',
        shortLabel: 'FR',
        online: lob.value.frictionrbMotorOnline,
    },
    {
        key: 'loader',
        label: '拨盘电机',
        shortLabel: '拨',
        online: lob.value.loaderMotorOnline,
    },
]);

const offlineMotorCount = computed(() => {
    if (typeof lob.value.offlineMotorCount === 'number') {
        return lob.value.offlineMotorCount;
    }

    return motorItems.value.filter((item) => item.online === false).length;
});
</script>

<style scoped lang="sass">
.hero-lob-mini
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    padding: 3%
    gap: 2cqh
    container-type: size
    color: var(--hud-text-primary)
    overflow: hidden

.top-row
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px

.title
    font-size: clamp(12px, 6cqh, 22px)
    font-weight: 700
    letter-spacing: 0.04em
    white-space: nowrap

.right-info
    display: flex
    align-items: center
    gap: 5px
    min-width: 0

.offline,
.flags
    padding: 2px 7px
    border-radius: 999px
    font-size: clamp(8px, 3cqh, 12px)
    white-space: nowrap
    background: rgba(255, 255, 255, 0.06)
    border: 1px solid rgba(255, 255, 255, 0.12)
    color: var(--hud-text-secondary)

.offline
    color: var(--md-health-high)

    &.danger
        color: var(--md-health-low)
        background: rgba(229, 115, 115, 0.12)

.flags.empty
    color: var(--hud-text-tertiary)

.mode-row
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 1cqw

.mode-chip
    display: flex
    align-items: center
    justify-content: center
    gap: 3px
    min-width: 0
    padding: 0.8cqh 0.8cqw
    border-radius: 8px
    background: rgba(0, 0, 0, 0.16)
    border: 1px solid rgba(255, 255, 255, 0.1)

    &.on
        color: var(--md-health-high)

    &.off
        color: var(--md-health-low)

    &.unknown
        color: var(--hud-text-tertiary)

.mode-label
    font-size: clamp(7px, 2.8cqh, 11px)
    color: var(--hud-text-tertiary)
    white-space: nowrap

.mode-value
    font-size: clamp(8px, 3.1cqh, 12px)
    font-weight: 700
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.motor-grid
    display: grid
    grid-template-columns: repeat(7, minmax(0, 1fr))
    gap: 1cqh 1cqw
    flex: 1
    min-height: 0

.motor-item
    display: flex
    align-items: center
    justify-content: center
    gap: 4px
    min-width: 0
    padding: 0.7cqh 0.6cqw
    border-radius: 7px
    font-size: clamp(7px, 2.8cqh, 11px)
    background: rgba(255, 255, 255, 0.045)
    border: 1px solid rgba(255, 255, 255, 0.08)

    .dot
        width: 6px
        height: 6px
        border-radius: 50%
        flex-shrink: 0

    .name
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

    &.online
        color: var(--hud-text-secondary)

        .dot
            background: var(--md-health-high)
            box-shadow: 0 0 6px var(--md-health-high)

    &.offline
        color: var(--md-health-low)
        background: rgba(229, 115, 115, 0.12)

        .dot
            background: var(--md-health-low)
            box-shadow: 0 0 6px var(--md-health-low)

    &.unknown
        color: var(--hud-text-tertiary)

        .dot
            background: rgba(255, 255, 255, 0.35)

@media (max-width: 520px)
    .mode-row
        grid-template-columns: repeat(3, minmax(0, 1fr))

    .motor-grid
        grid-template-columns: repeat(4, minmax(0, 1fr))
</style>
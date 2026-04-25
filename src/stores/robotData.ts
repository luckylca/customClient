import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingStore } from './setting'
import type { RobotInjuryStat,RobotRespawnStatus,RobotStaticStatus,RobotDynamicStatus,RobotModuleStatus,RobotPosition,Buff,PenaltyInfo,RobotPathPlanInfo,MapClickInfoNotify,RadarInfoToClient,CustomByteBlock,AssemblyCommand,TechCoreMotionStateSync,PerformanceSelection,HeroDeployMode,RuneStatus,SentinelStatusSync,DartInfo,GuardCtrl,AirSupport,LobShotReservedPack } from '../types/rmType'

const decodeProtoBytes = (value: unknown): Uint8Array | undefined => {
    if (!value) return undefined
    if (value instanceof Uint8Array) return value
    if (Array.isArray(value)) {
        const allByte = value.every((item) => typeof item === 'number' && item >= 0 && item <= 255)
        return allByte ? new Uint8Array(value as number[]) : undefined
    }
    if (typeof value === 'string') {
        try {
            const bin = atob(value)
            const out = new Uint8Array(bin.length)
            for (let i = 0; i < bin.length; i += 1) {
                out[i] = bin.charCodeAt(i)
            }
            return out
        } catch {
            return undefined
        }
    }
    if (typeof value === 'object' && value !== null) {
        const maybeBuffer = value as { type?: string; data?: unknown }
        if (maybeBuffer.type === 'Buffer' && Array.isArray(maybeBuffer.data)) {
            const allByte = maybeBuffer.data.every((item) => typeof item === 'number' && item >= 0 && item <= 255)
            if (allByte) {
                return new Uint8Array(maybeBuffer.data as number[])
            }
        }
    }
    return undefined
}

const toHexPreview = (bytes: Uint8Array, maxLen = 20): string => {
    if (!bytes.length) return '-'
    const clipped = bytes.subarray(0, maxLen)
    const parts = Array.from(clipped).map((value) => value.toString(16).padStart(2, '0').toUpperCase())
    return bytes.length > maxLen ? `${parts.join(' ')} ...` : parts.join(' ')
}

const toHexLines = (bytes: Uint8Array, bytesPerLine = 16, maxLines = 3): string => {
    if (!bytes.length) return '-'
    const maxLen = Math.min(bytes.length, bytesPerLine * maxLines)
    const lines: string[] = []
    for (let offset = 0; offset < maxLen; offset += bytesPerLine) {
        const row = bytes.subarray(offset, Math.min(offset + bytesPerLine, maxLen))
        const hex = Array.from(row).map((value) => value.toString(16).padStart(2, '0').toUpperCase()).join(' ')
        lines.push(hex)
    }
    if (bytes.length > maxLen) {
        lines.push('...')
    }
    return lines.join('\n')
}

const CUSTOM_BYTE_BLOCK_LOG_INTERVAL_MS = 500
const CUSTOM_BYTE_BLOCK_STORE_FLUSH_INTERVAL_MS = 200
const CUSTOM_BYTE_BLOCK_FRAME_SIZE = 300
const CUSTOM_BYTE_BLOCK_HEADER_0 = 0xA8
const CUSTOM_BYTE_BLOCK_HEADER_1 = 0xA7
const CUSTOM_BYTE_BLOCK_SEQUENCE_BYTES = 2
const CUSTOM_BYTE_BLOCK_VIDEO_BYTES = 270
const CUSTOM_BYTE_BLOCK_RESERVED_BYTES = 24
const CUSTOM_BYTE_BLOCK_VIDEO_OFFSET = 2 + CUSTOM_BYTE_BLOCK_SEQUENCE_BYTES
const CUSTOM_BYTE_BLOCK_RESERVED_OFFSET = CUSTOM_BYTE_BLOCK_VIDEO_OFFSET + CUSTOM_BYTE_BLOCK_VIDEO_BYTES
const CUSTOM_BYTE_BLOCK_CRC_OFFSET = CUSTOM_BYTE_BLOCK_RESERVED_OFFSET + CUSTOM_BYTE_BLOCK_RESERVED_BYTES
const LOB_SHOT_RESERVED_SIZE = 24
let lastCustomByteBlockLogAt = 0
let customByteBlockPendingUpdateCount = 0
let customByteBlockPendingBytes: Uint8Array | null = null
let customByteBlockPendingSideband: Uint8Array | null = null
let customByteBlockPendingCrc16: Uint8Array | null = null
let customByteBlockPendingHeaderValid = false
let customByteBlockPendingLobShotReserved: LobShotReservedPack | null = null
let customByteBlockFlushTimer: ReturnType<typeof setTimeout> | null = null
let lastCustomByteBlockStoreFlushAt = 0

interface ParsedCustomByteBlockFrame {
    frame: Uint8Array
    sequenceId: number
    videoData: Uint8Array
    reservedData: Uint8Array
    crc16: Uint8Array
    headerValid: boolean
}

const parseCustomByteBlockFrame = (bytes: Uint8Array): ParsedCustomByteBlockFrame | null => {
    if (bytes.length < CUSTOM_BYTE_BLOCK_FRAME_SIZE) return null

    const maxStart = bytes.length - CUSTOM_BYTE_BLOCK_FRAME_SIZE
    let frameStart = maxStart

    for (let start = maxStart; start >= 0; start -= 1) {
        if (bytes[start] === CUSTOM_BYTE_BLOCK_HEADER_0 && bytes[start + 1] === CUSTOM_BYTE_BLOCK_HEADER_1) {
            frameStart = start
            break
        }
    }

    const frame = bytes.subarray(frameStart, frameStart + CUSTOM_BYTE_BLOCK_FRAME_SIZE)
    const headerValid = frame[0] === CUSTOM_BYTE_BLOCK_HEADER_0 && frame[1] === CUSTOM_BYTE_BLOCK_HEADER_1
    const sequenceId = frame[2] | (frame[3] << 8)
    const videoData = frame.subarray(CUSTOM_BYTE_BLOCK_VIDEO_OFFSET, CUSTOM_BYTE_BLOCK_VIDEO_OFFSET + CUSTOM_BYTE_BLOCK_VIDEO_BYTES)
    const reservedData = frame.subarray(
        CUSTOM_BYTE_BLOCK_RESERVED_OFFSET,
        CUSTOM_BYTE_BLOCK_RESERVED_OFFSET + CUSTOM_BYTE_BLOCK_RESERVED_BYTES,
    )
    const crc16 = frame.subarray(CUSTOM_BYTE_BLOCK_CRC_OFFSET, CUSTOM_BYTE_BLOCK_CRC_OFFSET + 2)

    return {
        frame,
        sequenceId,
        videoData,
        reservedData,
        crc16,
        headerValid,
    }
}

const bit = (value: number, index: number): boolean => ((value >> index) & 0x01) === 1

const jointModeLabel = (mode: number): string => {
    const map: Record<number, string> = {
        0: '失能',
        1: '上台阶',
        2: '悬挂',
        3: '收腿',
    }
    return map[mode] || `未知(${mode})`
}

const chassisModeLabel = (mode: number): string => {
    const map: Record<number, string> = {
        0: '失能',
        1: '自由',
        2: '跟随',
        3: '小陀螺',
    }
    return map[mode] || `未知(${mode})`
}

const parseLobShotReservedPack = (reservedData?: Uint8Array | null): LobShotReservedPack | null => {
    if (!reservedData || reservedData.length < LOB_SHOT_RESERVED_SIZE) return null

    const raw = reservedData.subarray(0, LOB_SHOT_RESERVED_SIZE)
    const flags = raw[0] | (raw[1] << 8)
    const modeBits = raw[2]
    const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength)
    const offsetAngle = view.getInt16(3, true)
    const chassisMode = raw[5]

    const onlineBools = [
        bit(flags, 0), bit(flags, 1), bit(flags, 2), bit(flags, 3), bit(flags, 4), bit(flags, 5),
        bit(flags, 6), bit(flags, 7), bit(flags, 8), bit(flags, 9), bit(flags, 10), bit(flags, 11), bit(flags, 12),
    ]
    const offlineMotorCount = onlineBools.filter((value) => !value).length

    const jointMode = modeBits & 0x03
    const modeReserved = (modeBits >> 2) & 0x3f

    return {
        onlineFlagsRaw: flags,
        chassislfMotorOnline: bit(flags, 0),
        chassisrfMotorOnline: bit(flags, 1),
        chassislbMotorOnline: bit(flags, 2),
        chassisrbMotorOnline: bit(flags, 3),
        jointleftMotorOnline: bit(flags, 4),
        jointrightMotorOnline: bit(flags, 5),
        yawMotorOnline: bit(flags, 6),
        pitchMotorOnline: bit(flags, 7),
        frictionlfMotorOnline: bit(flags, 8),
        frictionrfMotorOnline: bit(flags, 9),
        frictionlbMotorOnline: bit(flags, 10),
        frictionrbMotorOnline: bit(flags, 11),
        loaderMotorOnline: bit(flags, 12),
        frictionMode: bit(flags, 13),
        visionMode: bit(flags, 14),
        powerMode: bit(flags, 15),
        jointMode,
        jointModeLabel: jointModeLabel(jointMode),
        modeReserved,
        offsetAngle,
        chassisMode,
        chassisModeLabel: chassisModeLabel(chassisMode),
        reservedBytes: raw.subarray(6, 24),
        offlineMotorCount,
    }
}

interface RobotData {
    color: string
    type: string
    id: string
    RobotInjuryStatData?: RobotInjuryStat
    RobotRespawnStatusData?: RobotRespawnStatus
    RobotStaticStatusData?: RobotStaticStatus
    RobotDynamicStatusData?: RobotDynamicStatus
    RobotModuleStatusData?: RobotModuleStatus
    RobotPositionData?: RobotPosition
    BuffData?: Buff[]
    PenaltyInfoData?: PenaltyInfo
    RobotPathPlanInfoData?: RobotPathPlanInfo
    MapClickInfoNotifyData?: MapClickInfoNotify
    RadarInfoToClientData?: RadarInfoToClient
    CustomByteBlockData: CustomByteBlock
    CustomByteBlockRawLength: number
    CustomByteBlockUpdateCount: number
    CustomByteBlockPreviewHex: string
    CustomByteBlockSidebandLength: number
    CustomByteBlockSidebandHex: string
    CustomByteBlockCrc16Hex: string
    CustomByteBlockHeaderValid: boolean
    CustomByteBlockLobShotReservedData?: LobShotReservedPack
    CustomByteBlockLastUpdatedAt: string
    AssemblyCommandData?: AssemblyCommand
    TechCoreMotionStateSyncData?: TechCoreMotionStateSync
    PerformanceSelectionData?: PerformanceSelection
    HeroDeployModeData?: HeroDeployMode
    RuneStatusData?: RuneStatus
    SentinelStatusSyncData?: SentinelStatusSync
    DartInfoData?: DartInfo
    GuardCtrlData?: GuardCtrl
    AirSupportData?: AirSupport
}
export const useRobotStore = defineStore('robot', () => {
    const robot = ref<RobotData>({
        color: '',
        type: '',
        id: '',
        CustomByteBlockData: { data: new Uint8Array(0) },
        CustomByteBlockRawLength: 0,
        CustomByteBlockUpdateCount: 0,
        CustomByteBlockPreviewHex: '-',
        CustomByteBlockSidebandLength: 0,
        CustomByteBlockSidebandHex: '-',
        CustomByteBlockCrc16Hex: '-',
        CustomByteBlockHeaderValid: false,
        CustomByteBlockLobShotReservedData: undefined,
        CustomByteBlockLastUpdatedAt: '-',
    })

    const flushCustomByteBlockStats = (force = false) => {
        if (customByteBlockPendingUpdateCount <= 0) return

        const now = Date.now()
        if (!force && now - lastCustomByteBlockStoreFlushAt < CUSTOM_BYTE_BLOCK_STORE_FLUSH_INTERVAL_MS) {
            return
        }

        robot.value.CustomByteBlockUpdateCount += customByteBlockPendingUpdateCount
        robot.value.CustomByteBlockRawLength = customByteBlockPendingBytes?.length || 0
        robot.value.CustomByteBlockPreviewHex = customByteBlockPendingBytes ? toHexPreview(customByteBlockPendingBytes) : '-'
        robot.value.CustomByteBlockSidebandLength = customByteBlockPendingSideband?.length || 0
        robot.value.CustomByteBlockSidebandHex = customByteBlockPendingSideband ? toHexPreview(customByteBlockPendingSideband, CUSTOM_BYTE_BLOCK_RESERVED_BYTES) : '-'
        robot.value.CustomByteBlockCrc16Hex = customByteBlockPendingCrc16 ? toHexPreview(customByteBlockPendingCrc16, 2) : '-'
        robot.value.CustomByteBlockHeaderValid = customByteBlockPendingHeaderValid
        robot.value.CustomByteBlockLobShotReservedData = customByteBlockPendingLobShotReserved || undefined
        robot.value.CustomByteBlockLastUpdatedAt = new Date(now).toLocaleTimeString()

        robot.value.CustomByteBlockData = {
            data: customByteBlockPendingBytes || new Uint8Array(0),
            sequenceId:
                customByteBlockPendingBytes && customByteBlockPendingBytes.length >= 4
                    ? (customByteBlockPendingBytes[2] | (customByteBlockPendingBytes[3] << 8))
                    : undefined,
            videoData:
                customByteBlockPendingBytes && customByteBlockPendingBytes.length >= CUSTOM_BYTE_BLOCK_FRAME_SIZE
                    ? customByteBlockPendingBytes.subarray(CUSTOM_BYTE_BLOCK_VIDEO_OFFSET, CUSTOM_BYTE_BLOCK_VIDEO_OFFSET + CUSTOM_BYTE_BLOCK_VIDEO_BYTES)
                    : undefined,
            sidebandData: customByteBlockPendingSideband || undefined,
            headerValid: customByteBlockPendingHeaderValid,
            crc16: customByteBlockPendingCrc16 || undefined,
            lobShotReserved: customByteBlockPendingLobShotReserved || undefined,
        }

        if (now - lastCustomByteBlockLogAt >= CUSTOM_BYTE_BLOCK_LOG_INTERVAL_MS) {
            lastCustomByteBlockLogAt = now
            console.log(
                `[RobotStore] CustomByteBlock length=${robot.value.CustomByteBlockRawLength} update=${robot.value.CustomByteBlockUpdateCount}\n${customByteBlockPendingBytes ? toHexLines(customByteBlockPendingBytes, 16, 4) : '-'}`
            )
        }

        customByteBlockPendingUpdateCount = 0
        customByteBlockPendingBytes = null
        customByteBlockPendingSideband = null
        customByteBlockPendingCrc16 = null
        customByteBlockPendingHeaderValid = false
        customByteBlockPendingLobShotReserved = null
        lastCustomByteBlockStoreFlushAt = now
    }

    const scheduleCustomByteBlockFlush = () => {
        if (customByteBlockFlushTimer) return
        customByteBlockFlushTimer = setTimeout(() => {
            customByteBlockFlushTimer = null
            flushCustomByteBlockStats(true)
        }, CUSTOM_BYTE_BLOCK_STORE_FLUSH_INTERVAL_MS)
    }

    const updateCustomByteBlockStats = (rawData: unknown) => {
        const bytes = decodeProtoBytes(rawData)
        if (!bytes) return

        const parsed = parseCustomByteBlockFrame(bytes)
        const frame = parsed?.frame ?? bytes

        customByteBlockPendingUpdateCount += 1
        customByteBlockPendingBytes = frame
        customByteBlockPendingSideband = parsed?.reservedData || null
        customByteBlockPendingCrc16 = parsed?.crc16 || null
        customByteBlockPendingHeaderValid = parsed?.headerValid || false
        customByteBlockPendingLobShotReserved = parseLobShotReservedPack(parsed?.reservedData)
        flushCustomByteBlockStats(false)

        if (customByteBlockPendingUpdateCount > 0) {
            scheduleCustomByteBlockFlush()
        }
    }

    const normalizeRobotPayload = (topic: string, data: unknown): unknown => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return data
        const src = data as Record<string, unknown>
        const out: Record<string, unknown> = { ...src }

        const normalizeCamel = (camel: string, snake: string) => {
            const camelVal = out[camel]
            const snakeVal = out[snake]
            if (camelVal === undefined && snakeVal !== undefined) out[camel] = snakeVal
            if (snake in out) delete out[snake]
        }

        if (topic === 'RobotDynamicStatus') {
            normalizeCamel('currentHealth', 'current_health')
            normalizeCamel('currentHeat', 'current_heat')
            normalizeCamel('lastProjectileFireRate', 'last_projectile_fire_rate')
            normalizeCamel('currentChassisEnergy', 'current_chassis_energy')
            normalizeCamel('currentBufferEnergy', 'current_buffer_energy')
            normalizeCamel('currentExperience', 'current_experience')
            normalizeCamel('experienceForUpgrade', 'experience_for_upgrade')
            normalizeCamel('totalProjectilesFired', 'total_projectiles_fired')
            normalizeCamel('remainingAmmo', 'remaining_ammo')
            normalizeCamel('isOutOfCombat', 'is_out_of_combat')
            normalizeCamel('outOfCombatCountdown', 'out_of_combat_countdown')
            normalizeCamel('canRemoteHeal', 'can_remote_heal')
            normalizeCamel('canRemoteAmmo', 'can_remote_ammo')
        }

        if (topic === 'RobotStaticStatus') {
            normalizeCamel('connectionState', 'connection_state')
            normalizeCamel('fieldState', 'field_state')
            normalizeCamel('aliveState', 'alive_state')
            normalizeCamel('robotId', 'robot_id')
            normalizeCamel('robotType', 'robot_type')
            normalizeCamel('performanceSystemShooter', 'performance_system_shooter')
            normalizeCamel('performanceSystemChassis', 'performance_system_chassis')
            normalizeCamel('maxHealth', 'max_health')
            normalizeCamel('maxHeat', 'max_heat')
            normalizeCamel('heatCooldownRate', 'heat_cooldown_rate')
            normalizeCamel('maxPower', 'max_power')
            normalizeCamel('maxBufferEnergy', 'max_buffer_energy')
            normalizeCamel('maxChassisEnergy', 'max_chassis_energy')
        }

        if (topic === 'RobotInjuryStat') {
            normalizeCamel('totalDamage', 'total_damage')
            normalizeCamel('collisionDamage', 'collision_damage')
            normalizeCamel('smallProjectileDamage', 'small_projectile_damage')
            normalizeCamel('largeProjectileDamage', 'large_projectile_damage')
            normalizeCamel('dartSplashDamage', 'dart_splash_damage')
            normalizeCamel('moduleOfflineDamage', 'module_offline_damage')
            normalizeCamel('offlineDamage', 'offline_damage')
            normalizeCamel('penaltyDamage', 'penalty_damage')
            normalizeCamel('serverKillDamage', 'server_kill_damage')
            normalizeCamel('killerId', 'killer_id')
        }

        if (topic === 'RobotRespawnStatus') {
            normalizeCamel('isPendingRespawn', 'is_pending_respawn')
            normalizeCamel('totalRespawnProgress', 'total_respawn_progress')
            normalizeCamel('currentRespawnProgress', 'current_respawn_progress')
            normalizeCamel('canFreeRespawn', 'can_free_respawn')
            normalizeCamel('goldCostForRespawn', 'gold_cost_for_respawn')
            normalizeCamel('canPayForRespawn', 'can_pay_for_respawn')
        }

        if (topic === 'PenaltyInfo') {
            normalizeCamel('penaltyType', 'penalty_type')
            normalizeCamel('penaltyEffectSec', 'penalty_effect_sec')
            normalizeCamel('totalPenaltyNum', 'total_penalty_num')
        }

        if (topic === 'RobotModuleStatus') {
            normalizeCamel('powerManager', 'power_manager')
            normalizeCamel('lightStrip', 'light_strip')
            normalizeCamel('smallShooter', 'small_shooter')
            normalizeCamel('bigShooter', 'big_shooter')
            normalizeCamel('videoTransmission', 'video_transmission')
            normalizeCamel('mainController', 'main_controller')
            normalizeCamel('laserDetectionModule', 'laser_detection_module')
        }

        if (topic === 'Buff') {
            normalizeCamel('robotId', 'robot_id')
            normalizeCamel('buffType', 'buff_type')
            normalizeCamel('buffLevel', 'buff_level')
            normalizeCamel('buffMaxTime', 'buff_max_time')
            normalizeCamel('buffLeftTime', 'buff_left_time')
        }

        if (topic === 'CustomByteBlock') {
            const bytes = decodeProtoBytes(out.data)
            if (bytes) out.data = bytes
        }

        return out
    }
    const initRobot = (color: string, type: string) => {
        robot.value.color = color
        robot.value.type = type
        const normalizedColor = color === '红' ? 'red' : color === '蓝' ? 'blue' : color
        const normalizedType = type.replace(/|\s/g, '')

        const redRobotIdMap: Record<string, string> = {
            '英雄': '1',
            '工程': '2',
            '步兵1': '3',
            '步兵2': '4',
            '步兵3': '5',
            '无人机': '6',
        }

        const blueRobotIdMap: Record<string, string> = {
            '英雄': '101',
            '工程': '102',
            '步兵1': '103',
            '步兵2': '104',
            '步兵3': '105',
            '无人机': '106',
        }

        if (normalizedColor === 'red') {
            robot.value.id = redRobotIdMap[normalizedType] ?? ''
        } else if (normalizedColor === 'blue') {
            robot.value.id = blueRobotIdMap[normalizedType] ?? ''
        } else {
            robot.value.id = ''
        }
        
    }

    const applyLocalAmmoDelta = (delta: number): number => {
        if (!Number.isFinite(delta) || delta === 0) {
            const dynamic = robot.value.RobotDynamicStatusData as Record<string, unknown> | undefined
            const current = dynamic?.remainingAmmo ?? dynamic?.remaining_ammo
            return typeof current === 'number' ? current : 0
        }

        const currentDynamic = (robot.value.RobotDynamicStatusData || {}) as Record<string, unknown>
        const rawCurrent = currentDynamic.remainingAmmo ?? currentDynamic.remaining_ammo
        const currentAmmo = typeof rawCurrent === 'number' ? rawCurrent : 0
        const nextAmmo = Math.max(0, currentAmmo + Math.trunc(delta))

        const nextDynamic: Record<string, unknown> = {
            ...currentDynamic,
            remainingAmmo: nextAmmo,
        }
        if ('remaining_ammo' in currentDynamic) {
            nextDynamic.remaining_ammo = nextAmmo
        }

        robot.value.RobotDynamicStatusData = nextDynamic as RobotDynamicStatus
        return nextAmmo
    }

    const applyLocalHeroDeployModeStatus = (status: number): number => {
        const normalizedStatus = status === 1 ? 1 : 0
        const current = (robot.value.HeroDeployModeData || {}) as Record<string, unknown>
        robot.value.HeroDeployModeData = {
            ...current,
            status: normalizedStatus,
        } as HeroDeployMode
        return normalizedStatus
    }

    const setRobotMessage = (topic: string, data: unknown) => {
        const normalized = normalizeRobotPayload(topic, data)
        switch (topic) {
            case 'RobotInjuryStat':
                robot.value.RobotInjuryStatData = normalized as RobotInjuryStat
                break
            case 'RobotRespawnStatus':
                robot.value.RobotRespawnStatusData = normalized as RobotRespawnStatus
                break
            case 'RobotStaticStatus':
                robot.value.RobotStaticStatusData = normalized as RobotStaticStatus
                console.log(`[RobotStore] Updated RobotStaticStatus: ${JSON.stringify(robot.value.RobotStaticStatusData)}`)
                break
            case 'RobotDynamicStatus':
                robot.value.RobotDynamicStatusData = normalized as RobotDynamicStatus
                break
            case 'RobotModuleStatus':
                robot.value.RobotModuleStatusData = normalized as RobotModuleStatus
                break
            case 'RobotPosition':
                robot.value.RobotPositionData = normalized as RobotPosition
                break
            case 'Buff':
                robot.value.BuffData = Array.isArray(normalized)
                    ? (normalized.map((item) => normalizeRobotPayload(topic, item)) as Buff[])
                    : ([normalizeRobotPayload(topic, normalized)] as Buff[])
                break
            case 'PenaltyInfo':
                robot.value.PenaltyInfoData = normalized as PenaltyInfo
                if (normalized) {
                    const penalty = normalized as PenaltyInfo
                    const typeMap: Record<number, string> = {
                        1: '黄牌',
                        2: '双方黄牌',
                        3: '红牌',
                        4: '超功率',
                        5: '超热量',
                        6: '超射速'
                    }
                    const typeValue = penalty.penalty_type ?? (penalty as any).penaltyType
                    const typeStr = typeValue ? (typeMap[typeValue] || `未知(${typeValue})`) : '未知'
                    const effectSec = penalty.penalty_effect_sec ?? (penalty as any).penaltyEffectSec ?? 0
                    const totalNum = penalty.total_penalty_num ?? (penalty as any).totalPenaltyNum ?? 0
                    const settingStore = useSettingStore()
                    settingStore.pushScriptNotification(`[判罚系统] 受到判罚 - ${typeStr} (时长: ${effectSec}s, 累计: ${totalNum}次)`)
                }
                break
            case 'RobotPathPlanInfo':
                robot.value.RobotPathPlanInfoData = normalized as RobotPathPlanInfo
                break
            case 'MapClickInfoNotify':
                robot.value.MapClickInfoNotifyData = normalized as MapClickInfoNotify
                break
            case 'RadarInfoToClient':
                robot.value.RadarInfoToClientData = normalized as RadarInfoToClient
                break
            case 'CustomByteBlock':
                updateCustomByteBlockStats((normalized as CustomByteBlock)?.data)
                break
            case 'AssemblyCommand':
                robot.value.AssemblyCommandData = normalized as AssemblyCommand
                break
            case 'TechCoreMotionStateSync':
                robot.value.TechCoreMotionStateSyncData = normalized as TechCoreMotionStateSync
                break
            case 'RobotPerformanceSelectionSync':
                robot.value.PerformanceSelectionData = normalized as PerformanceSelection
                break
            case 'DeployModeStatusSync':
                robot.value.HeroDeployModeData = normalized as HeroDeployMode
                break
            case 'RuneStatusSync':
                robot.value.RuneStatusData = normalized as RuneStatus
                break
            case 'SentinelStatusSync':
                robot.value.SentinelStatusSyncData = normalized as SentinelStatusSync
                break
            case 'DartSelectTargetStatusSync':
                robot.value.DartInfoData = normalized as DartInfo
                break
            case 'GuardCtrlResult':
                robot.value.GuardCtrlData = normalized as GuardCtrl
                break
            case 'AirSupportStatusSync':
                robot.value.AirSupportData = normalized as AirSupport
                break
        }
    }
    return { robot, initRobot, setRobotMessage, updateCustomByteBlockStats, applyLocalAmmoDelta, applyLocalHeroDeployModeStatus }
})

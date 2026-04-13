import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RobotInjuryStat,RobotRespawnStatus,RobotStaticStatus,RobotDynamicStatus,RobotModuleStatus,RobotPosition,Buff,PenaltyInfo,RobotPathPlanInfo,MapClickInfoNotify,RadarInfoToClient,CustomByteBlock,AssemblyCommand,TechCoreMotionStateSync,PerformanceSelection,HeroDeployMode,RuneStatus,SentinelStatusSync,DartInfo,GuardCtrl,AirSupport } from '../types/rmType'
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
    CustomByteBlockData?: CustomByteBlock
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
    const robot = ref<RobotData>({ color: '', type: '', id: '' })
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
                robot.value.CustomByteBlockData = normalized as CustomByteBlock
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
    return { robot, initRobot, setRobotMessage }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RobotInjuryStat,RobotRespawnStatus,RobotStaticStatus,RobotDynamicStatus,RobotModuleStatus,RobotPosition,Buff,PenaltyInfo,RobotPathPlanInfo,MapClickInfoNotify,RaderInfoToClient,CustomByteBlock,AssemblyCommand,TechCoreMotionStateSync,PerformanceSelection,HeroDeployMode,RuneStatus,SentinelStatusSync,DartInfo,GuardCtrl,AirSupport } from '../types/rmType'
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
    RaderInfoToClientData?: RaderInfoToClient
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
    const initRobot = (color: string, type: string) => {
        robot.value.color = color
        robot.value.type = type
        const normalizedColor = color === '红' ? 'red' : color === '蓝' ? 'blue' : color
        const normalizedType = type.replace(/|\s/g, '')

        const redMap: Record<string, string> = {
            '英雄': '0x0101',
            '工程': '0x0102',
            '步兵1': '0x0103',
            '步兵2': '0x0104',
            '步兵3': '0x0105',
            '无人机': '0x0106',
        }

        const blueMap: Record<string, string> = {
            '英雄': '0x0165',
            '工程': '0x0166',
            '步兵1': '0x0167',
            '步兵2': '0x0168',
            '步兵3': '0x0169',
            '无人机': '0x016A',
        }

        if (normalizedColor === 'red') {
            robot.value.id = redMap[normalizedType] ?? ''
        } else if (normalizedColor === 'blue') {
            robot.value.id = blueMap[normalizedType] ?? ''
        } else {
            robot.value.id = ''
        }
        
    }
    const setRobotMessage = (topic: string, data: unknown) => {
        switch (topic) {
            case 'RobotInjuryStat':
                robot.value.RobotInjuryStatData = data as RobotInjuryStat
                break
            case 'RobotRespawnStatus':
                robot.value.RobotRespawnStatusData = data as RobotRespawnStatus
                break
            case 'RobotStaticStatus':
                robot.value.RobotStaticStatusData = data as RobotStaticStatus
                break
            case 'RobotDynamicStatus':
                robot.value.RobotDynamicStatusData = data as RobotDynamicStatus
                break
            case 'RobotModuleStatus':
                robot.value.RobotModuleStatusData = data as RobotModuleStatus
                break
            case 'RobotPosition':
                robot.value.RobotPositionData = data as RobotPosition
                break
            case 'Buff':
                robot.value.BuffData = Array.isArray(data) ? (data as Buff[]) : [data as Buff]
                break
            case 'PenaltyInfo':
                robot.value.PenaltyInfoData = data as PenaltyInfo
                break
            case 'RobotPathPlanInfo':
                robot.value.RobotPathPlanInfoData = data as RobotPathPlanInfo
                break
            case 'MapClickInfoNotify':
                robot.value.MapClickInfoNotifyData = data as MapClickInfoNotify
                break
            case 'RaderInfoToClient':
                robot.value.RaderInfoToClientData = data as RaderInfoToClient
                break
            case 'CustomByteBlock':
                robot.value.CustomByteBlockData = data as CustomByteBlock
                break
            case 'AssemblyCommand':
                robot.value.AssemblyCommandData = data as AssemblyCommand
                break
            case 'TechCoreMotionStateSync':
                robot.value.TechCoreMotionStateSyncData = data as TechCoreMotionStateSync
                break
            case 'RobotPerformanceSelectionSync':
                robot.value.PerformanceSelectionData = data as PerformanceSelection
                break
            case 'DeployModeStatusSync':
                robot.value.HeroDeployModeData = data as HeroDeployMode
                break
            case 'RuneStatusSync':
                robot.value.RuneStatusData = data as RuneStatus
                break
            case 'SentinelStatusSync':
                robot.value.SentinelStatusSyncData = data as SentinelStatusSync
                break
            case 'DartSelectTargetStatusSync':
                robot.value.DartInfoData = data as DartInfo
                break
            case 'GuardCtrlResult':
                robot.value.GuardCtrlData = data as GuardCtrl
                break
            case 'AirSupportStatusSync':
                robot.value.AirSupportData = data as AirSupport
                break
        }
    }
    return { robot, initRobot, setRobotMessage }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
    GameStatus,
    GlobalUnitStatus,
    GlobalLogisticsStatus,
    GlobalSpecialMechanism,
    Event,
} from '../types/rmType'

type RobotHpValue = number | null

interface RobotHealthSide {
    hero1: RobotHpValue
    engineer2: RobotHpValue
    infantry3: RobotHpValue
    infantry4: RobotHpValue
    sentry7: RobotHpValue
}

interface GlobalUnitHealthView {
    /**
     * 原始顺序数组，方便调试。
     *
     * [0] 己方1号英雄
     * [1] 己方2号工程
     * [2] 己方3号步兵
     * [3] 己方4号步兵
     * [4] 己方7号哨兵
     *
     * [5] 对方1号英雄
     * [6] 对方2号工程
     * [7] 对方3号步兵
     * [8] 对方4号步兵
     * [9] 对方7号哨兵
     */
    raw: RobotHpValue[]

    our: RobotHealthSide
    enemy: RobotHealthSide

    updatedAt: number
}

interface GlobalData {
    GameStatusData: GameStatus
    GlobalUnitStatusData: GlobalUnitStatus
    GlobalLogisticsStatusData: GlobalLogisticsStatus
    GlobalSpecialMechanismData: GlobalSpecialMechanism
    EnventData: Event[]

    /**
     * 给前端显示用的血量映射数据。
     * 这是从 GlobalUnitStatusData.robotHealth 派生出来的。
     */
    GlobalUnitHealthData: GlobalUnitHealthView
}

const createEmptyRobotHealthSide = (): RobotHealthSide => {
    return {
        hero1: null,
        engineer2: null,
        infantry3: null,
        infantry4: null,
        sentry7: null,
    }
}

const createEmptyGlobalUnitHealthView = (): GlobalUnitHealthView => {
    return {
        raw: [],
        our: createEmptyRobotHealthSide(),
        enemy: createEmptyRobotHealthSide(),
        updatedAt: 0,
    }
}

export const useGlobalStore = defineStore('global', () => {
    const global = ref<GlobalData>({
        GameStatusData: {} as GameStatus,
        GlobalUnitStatusData: {} as GlobalUnitStatus,
        GlobalLogisticsStatusData: {} as GlobalLogisticsStatus,
        GlobalSpecialMechanismData: {} as GlobalSpecialMechanism,
        EnventData: [],

        GlobalUnitHealthData: createEmptyGlobalUnitHealthView(),
    })

    const normalizeGlobalPayload = (topic: string, data: unknown): unknown => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return data

        const out: Record<string, unknown> = { ...(data as Record<string, unknown>) }

        const normalizeCamel = (camel: string, snake: string) => {
            if (out[camel] === undefined && out[snake] !== undefined) {
                out[camel] = out[snake]
            }

            if (snake in out) {
                delete out[snake]
            }
        }

        if (topic === 'GameStatus') {
            normalizeCamel('currentRound', 'current_round')
            normalizeCamel('totalRounds', 'total_rounds')
            normalizeCamel('redScore', 'red_score')
            normalizeCamel('blueScore', 'blue_score')
            normalizeCamel('currentStage', 'current_stage')
            normalizeCamel('stageCountdownSec', 'stage_countdown_sec')
            normalizeCamel('stageElapsedSec', 'stage_elapsed_sec')
            normalizeCamel('isPaused', 'is_paused')
        }

        if (topic === 'GlobalLogisticsStatus') {
            normalizeCamel('remainingEconomy', 'remaining_economy')
            normalizeCamel('totalEconomyObtained', 'total_economy_obtained')
            normalizeCamel('techLevel', 'tech_level')
            normalizeCamel('encryptionLevel', 'encryption_level')
        }

        if (topic === 'GlobalUnitStatus') {
            normalizeCamel('baseHealth', 'base_health')
            normalizeCamel('baseStatus', 'base_status')
            normalizeCamel('baseShield', 'base_shield')

            normalizeCamel('outpostHealth', 'outpost_health')
            normalizeCamel('outpostStatus', 'outpost_status')

            normalizeCamel('enemyBaseHealth', 'enemy_base_health')
            normalizeCamel('enemyBaseStatus', 'enemy_base_status')
            normalizeCamel('enemyBaseShield', 'enemy_base_shield')

            normalizeCamel('enemyOutpostHealth', 'enemy_outpost_health')
            normalizeCamel('enemyOutpostStatus', 'enemy_outpost_status')

            normalizeCamel('robotHealth', 'robot_health')
            normalizeCamel('robotBullets', 'robot_bullets')

            normalizeCamel('totalDamageAlly', 'total_damage_ally')
            normalizeCamel('totalDamageEnemy', 'total_damage_enemy')
        }

        if (topic === 'GlobalSpecialMechanism') {
            normalizeCamel('mechanismId', 'mechanism_id')
            normalizeCamel('mechanismTimeSec', 'mechanism_time_sec')
        }

        if (topic === 'Event') {
            normalizeCamel('eventId', 'event_id')
        }

        return out
    }

    const toNumberOrNull = (value: unknown): RobotHpValue => {
        /**
         * 注意：
         * 0 是有效血量，代表已摧毁。
         * 所以这里不能用 if (!value) return null。
         */
        if (value === undefined || value === null) {
            return null
        }

        const n = Number(value)

        if (!Number.isFinite(n)) {
            return null
        }

        return n
    }

    const getRobotHealthArrayFromPayload = (payload: unknown): RobotHpValue[] => {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            return []
        }

        const record = payload as Record<string, unknown>

        /**
         * 正常情况下 normalize 后是 robotHealth。
         * 这里兼容 robot_health，是为了防止某些地方绕过 normalize。
         */
        const arr = record.robotHealth ?? record.robot_health

        if (!Array.isArray(arr)) {
            return []
        }

        return arr.map((item) => toNumberOrNull(item))
    }

    const buildGlobalUnitHealthView = (payload: unknown): GlobalUnitHealthView => {
        const healthArr = getRobotHealthArrayFromPayload(payload)

        const read = (index: number): RobotHpValue => {
            return healthArr[index] ?? null
        }

        /**
         * 这里就是“顺序数组 → 有名字对象”的核心适配。
         *
         * 协议顺序：
         * 己方 1、2、3、4、7
         * 对方 1、2、3、4、7
         */
        return {
            raw: healthArr,

            our: {
                hero1: read(0),
                engineer2: read(1),
                infantry3: read(2),
                infantry4: read(3),
                sentry7: read(4),
            },

            enemy: {
                hero1: read(5),
                engineer2: read(6),
                infantry3: read(7),
                infantry4: read(8),
                sentry7: read(9),
            },

            updatedAt: Date.now(),
        }
    }

    const setGlobalMessage = (topic: string, data: unknown) => {
        if (!global.value) return

        const normalized = normalizeGlobalPayload(topic, data)

        switch (topic) {
            case 'GameStatus':
                global.value.GameStatusData = normalized as GameStatus
                break

            case 'GlobalUnitStatus':
                /**
                 * 1. 保存原始全局单位状态。
                 */
                global.value.GlobalUnitStatusData = normalized as GlobalUnitStatus

                /**
                 * 2. 同时把 robotHealth 顺序数组转成可直接渲染的命名结构。
                 */
                global.value.GlobalUnitHealthData = buildGlobalUnitHealthView(normalized)
                break

            case 'GlobalLogisticsStatus':
                global.value.GlobalLogisticsStatusData = normalized as GlobalLogisticsStatus
                break

            case 'GlobalSpecialMechanism':
                global.value.GlobalSpecialMechanismData = normalized as GlobalSpecialMechanism
                break

            case 'Event':
                global.value.EnventData = Array.isArray(normalized)
                    ? (normalized.map((item) => normalizeGlobalPayload(topic, item)) as Event[])
                    : ([normalizeGlobalPayload(topic, normalized)] as Event[])
                break
        }
    }

    return {
        global,
        setGlobalMessage,
    }
})
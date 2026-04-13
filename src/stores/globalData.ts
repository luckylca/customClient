import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GameStatus,GlobalUnitStatus,GlobalLogisticsStatus,GlobalSpecialMechanism,Event } from '../types/rmType'
interface GlobalData {
    GameStatusData: GameStatus
    GlobalUnitStatusData: GlobalUnitStatus
    GlobalLogisticsStatusData: GlobalLogisticsStatus
    GlobalSpecialMechanismData: GlobalSpecialMechanism
    EnventData: Event[]
}
export const useGlobalStore = defineStore('global', () => {
    const global = ref<GlobalData>({
        GameStatusData: {} as GameStatus,
        GlobalUnitStatusData: {} as GlobalUnitStatus,
        GlobalLogisticsStatusData: {} as GlobalLogisticsStatus,
        GlobalSpecialMechanismData: {} as GlobalSpecialMechanism,
        EnventData: [],
    })

    const normalizeGlobalPayload = (topic: string, data: unknown): unknown => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return data
        const out: Record<string, unknown> = { ...(data as Record<string, unknown>) }
        const normalizeCamel = (camel: string, snake: string) => {
            if (out[camel] === undefined && out[snake] !== undefined) {
                out[camel] = out[snake]
            }
            if (snake in out) delete out[snake]
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

    const setGlobalMessage = (topic: string, data: unknown) => {
        if (!global.value) return
        const normalized = normalizeGlobalPayload(topic, data)
        switch (topic) {
            case 'GameStatus':
                global.value.GameStatusData = normalized as GameStatus
                break
            case 'GlobalUnitStatus':
                global.value.GlobalUnitStatusData = normalized as GlobalUnitStatus
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

    return { global, setGlobalMessage }
})

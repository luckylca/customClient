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

    const setGlobalMessage = (topic: string, data: unknown) => {
        if (!global.value) return
        switch (topic) {
            case 'GameStatus':
                global.value.GameStatusData = data as GameStatus
                break
            case 'GlobalUnitStatus':
                global.value.GlobalUnitStatusData = data as GlobalUnitStatus
                break
            case 'GlobalLogisticsStatus':
                global.value.GlobalLogisticsStatusData = data as GlobalLogisticsStatus
                break
            case 'GlobalSpecialMechanism':
                global.value.GlobalSpecialMechanismData = data as GlobalSpecialMechanism
                break
            case 'Event':
                global.value.EnventData = Array.isArray(data) ? (data as Event[]) : [data as Event]
                break
        }
    }

    return { global, setGlobalMessage }
})

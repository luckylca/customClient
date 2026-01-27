import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface settingData {

}
export const useRobotStore = defineStore('robot', () => {
    const setting = ref<settingData>()
    const initSetting = () => {

    }
    return { setting, initSetting }
})

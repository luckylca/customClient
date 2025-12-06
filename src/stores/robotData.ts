import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface RobotData {
    color: string
    type: string
}
export const useRobotStore = defineStore('robot', () => {
    const robot = ref<RobotData>({ color: '', type: '' })
    const initRobot = (color: string, type: string) => {
        robot.value.color = color
        robot.value.type = type
    }
    return { robot, initRobot }
})

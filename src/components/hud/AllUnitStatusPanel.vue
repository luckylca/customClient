<template>
    <div class="all-unit-status-panel">
        <div class="team-group our-team">
            <template v-for="unit in ourUnits" :key="unit.key">
                <div class="unit-item">
                    <div class="unit-image-wrapper">
                        <img :src="unit.image" class="unit-img" />

                        <div
                            v-if="unit.isBase && unit.shield > 0"
                            class="base-shield"
                        ></div>
                    </div>

                    <div class="unit-name">
                        {{ unit.name }}
                    </div>

                    <div class="unit-hp-text">
                        {{ formatHp(unit.hp) }} / {{ unit.maxHp }}
                    </div>

                    <div class="unit-hp-bar">
                        <div
                            class="hp-fill"
                            :style="{
                                width: getHpPercent(unit) + '%',
                                backgroundColor: ourColor,
                            }"
                        ></div>
                    </div>
                </div>
            </template>
        </div>

        <div class="team-divider">VS</div>

        <div class="team-group enemy-team">
            <template v-for="unit in enemyUnits" :key="unit.key">
                <div class="unit-item">
                    <div class="unit-image-wrapper">
                        <img :src="unit.image" class="unit-img" />

                        <div
                            v-if="unit.isBase && unit.shield > 0"
                            class="base-shield"
                        ></div>
                    </div>

                    <div class="unit-name">
                        {{ unit.name }}
                    </div>

                    <div class="unit-hp-text">
                        {{ formatHp(unit.hp) }} / {{ unit.maxHp }}
                    </div>

                    <div class="unit-hp-bar">
                        <div
                            class="hp-fill"
                            :style="{
                                width: getHpPercent(unit) + '%',
                                backgroundColor: enemyColor,
                            }"
                        ></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useGlobalStore } from '@/stores/globalData'
import { useRobotStore } from '@/stores/robotData'

import heroImg from '@/assets/英雄.png'
import engineerImg from '@/assets/工程.png'
import infantryImg from '@/assets/步兵.png'
import sentryImg from '@/assets/哨兵.png'
import outpostImg from '@/assets/前哨站.png'
import baseImg from '@/assets/基地.png'

type HpValue = number | null

interface UnitItem {
    key: string
    name: string
    image: string
    hp: HpValue
    maxHp: number
    isBase: boolean
    shield: number
}

type GlobalUnitStatusLike = {
    baseHealth?: number
    baseShield?: number
    outpostHealth?: number

    enemyBaseHealth?: number
    enemyBaseShield?: number
    enemyOutpostHealth?: number

    base_health?: number
    base_shield?: number
    outpost_health?: number

    enemy_base_health?: number
    enemy_base_shield?: number
    enemy_outpost_health?: number
}

const { global: globalData } = useGlobalStore()
const { robot } = useRobotStore()

const demoMode = inject('hudDemoMode', computed(() => false))

const isRedTeam = computed(() => robot.color === 'red')

const ourColor = computed(() => {
    return isRedTeam.value ? '#e53935' : '#1e88e5'
})

const enemyColor = computed(() => {
    return isRedTeam.value ? '#1e88e5' : '#e53935'
})

const unitStatus = computed<GlobalUnitStatusLike>(() => {
    return (globalData.GlobalUnitStatusData || {}) as GlobalUnitStatusLike
})

const getNumberValue = (
    camelKey: keyof GlobalUnitStatusLike,
    snakeKey: keyof GlobalUnitStatusLike,
): number => {
    const s = unitStatus.value
    const value = s[camelKey] ?? s[snakeKey] ?? 0

    return Number(value) || 0
}

const getBaseHp = (isOur: boolean): number => {
    if (demoMode.value) return 5000

    return isOur
        ? getNumberValue('baseHealth', 'base_health')
        : getNumberValue('enemyBaseHealth', 'enemy_base_health')
}

const getBaseShield = (isOur: boolean): number => {
    if (demoMode.value) return 500

    return isOur
        ? getNumberValue('baseShield', 'base_shield')
        : getNumberValue('enemyBaseShield', 'enemy_base_shield')
}

const getOutpostHp = (isOur: boolean): number => {
    if (demoMode.value) return 1500

    return isOur
        ? getNumberValue('outpostHealth', 'outpost_health')
        : getNumberValue('enemyOutpostHealth', 'enemy_outpost_health')
}

const getRobotHpByKey = (
    isOur: boolean,
    key: 'hero1' | 'engineer2' | 'infantry3' | 'infantry4' | 'sentry7',
): HpValue => {
    if (demoMode.value) {
        return 350 + Math.floor(Math.random() * 150)
    }

    const healthView = globalData.GlobalUnitHealthData

    if (!healthView) {
        return null
    }

    const side = isOur ? healthView.our : healthView.enemy

    return side?.[key] ?? null
}

const createTeamUnits = (isOur: boolean): UnitItem[] => {
    const side = isOur ? 'our' : 'enemy'

    return [
        {
            key: `${side}-hero-1`,
            name: '1号英雄',
            image: heroImg,
            hp: getRobotHpByKey(isOur, 'hero1'),
            maxHp: 500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-engineer-2`,
            name: '2号工程',
            image: engineerImg,
            hp: getRobotHpByKey(isOur, 'engineer2'),
            maxHp: 500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-infantry-3`,
            name: '3号步兵',
            image: infantryImg,
            hp: getRobotHpByKey(isOur, 'infantry3'),
            maxHp: 500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-infantry-4`,
            name: '4号步兵',
            image: infantryImg,
            hp: getRobotHpByKey(isOur, 'infantry4'),
            maxHp: 500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-sentry-7`,
            name: '7号哨兵',
            image: sentryImg,
            hp: getRobotHpByKey(isOur, 'sentry7'),
            maxHp: 500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-outpost`,
            name: '前哨站',
            image: outpostImg,
            hp: getOutpostHp(isOur),
            maxHp: 1500,
            isBase: false,
            shield: 0,
        },
        {
            key: `${side}-base`,
            name: '基地',
            image: baseImg,
            hp: getBaseHp(isOur),
            maxHp: 5000,
            isBase: true,
            shield: getBaseShield(isOur),
        },
    ]
}

const ourUnits = computed<UnitItem[]>(() => {
    return createTeamUnits(true)
})

const enemyUnits = computed<UnitItem[]>(() => {
    return createTeamUnits(false)
})

const formatHp = (hp: HpValue): string => {
    if (hp === null) {
        return '--'
    }

    return String(hp)
}

const getHpPercent = (unit: UnitItem): number => {
    if (unit.hp === null) {
        return 0
    }

    if (unit.maxHp <= 0) {
        return 0
    }

    const percent = (unit.hp / unit.maxHp) * 100

    return Math.min(100, Math.max(0, percent))
}
</script>

<style scoped>
.all-unit-status-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 0 20px;
    box-sizing: border-box;
}

.team-group {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    height: 100%;
    max-width: 45%;
}

.team-divider {
    font-size: clamp(32px, 3vw, 48px);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
    margin: 0 1vw;
    font-style: italic;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    flex-shrink: 0;
}

.unit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 5.8vw;
    max-width: 110px;
    min-width: 56px;
    height: 100%;
}

.unit-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    margin-bottom: 0.45vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.unit-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
}

.base-shield {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: rgba(64, 196, 255, 0.15);
    border: 3px solid rgba(64, 196, 255, 0.9);
    box-shadow:
        0 0 20px rgba(64, 196, 255, 0.8),
        inset 0 0 12px rgba(64, 196, 255, 0.5);
    pointer-events: none;
    z-index: 1;
    transform: scale(1.15);
}

.unit-name {
    font-size: clamp(10px, 0.8vw, 14px);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.2;
    margin-bottom: 0.25vh;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    white-space: nowrap;
}

.unit-hp-text {
    font-size: clamp(9px, 0.7vw, 12px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.1;
    margin-bottom: 0.4vh;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    white-space: nowrap;
}

.unit-hp-bar {
    width: 90%;
    height: clamp(8px, 1.2vh, 16px);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    flex-shrink: 0;
}

.hp-fill {
    height: 100%;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.4);
}
</style>
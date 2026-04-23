<template>
    <div class="all-unit-status-panel">
        <div class="team-group our-team">
            <template v-for="unit in ourUnits" :key="unit.name">
                <div class="unit-item">
                    <div class="unit-image-wrapper">
                        <img :src="unit.image" class="unit-img" />
                        <div v-if="unit.isBase && unit.shield > 0" class="base-shield"></div>
                    </div>
                    <div class="unit-hp-bar">
                        <div class="hp-fill" :style="{ width: getHpPercent(unit) + '%', backgroundColor: ourColor }"></div>
                    </div>
                </div>
            </template>
        </div>

        <div class="team-divider">VS</div>

        <div class="team-group enemy-team">
            <template v-for="unit in enemyUnits" :key="unit.name">
                <div class="unit-item">
                    <div class="unit-image-wrapper">
                        <img :src="unit.image" class="unit-img" />
                        <div v-if="unit.isBase && unit.shield > 0" class="base-shield"></div>
                    </div>
                    <div class="unit-hp-bar">
                        <div class="hp-fill" :style="{ width: getHpPercent(unit) + '%', backgroundColor: enemyColor }"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useGlobalStore } from '@/stores/globalData';
import { useRobotStore } from '@/stores/robotData';
import { useHudDemoTicker } from './useHudDemo';

import heroImg from '@/assets/英雄.png';
import engineerImg from '@/assets/工程.png';
import infantryImg from '@/assets/步兵.png';
import sentryImg from '@/assets/哨兵.png';
import outpostImg from '@/assets/前哨站.png';
import baseImg from '@/assets/基地.png';

const { global: globalData } = useGlobalStore();
const { robot } = useRobotStore();

const demoMode = inject('hudDemoMode', computed(() => false));
const demoTick = useHudDemoTicker();

const isRedTeam = computed(() => robot.color === 'red');
const ourColor = computed(() => isRedTeam.value ? '#e53935' : '#1e88e5');
const enemyColor = computed(() => isRedTeam.value ? '#1e88e5' : '#e53935');

// For getting robot health. Assuming array of 16 elements.
const getRobotHp = (isRed: boolean, index: number) => {
    const healthArr = globalData.GlobalUnitStatusData?.robotHealth || [];
    if (demoMode.value) return 500 + Math.floor(Math.random() * 500);

    // index is 0 for Hero, 1 for Eng, 2 for Inf3, 3 for Inf4, 6 for Sentry
    const offset = isRed ? 0 : (healthArr.length >= 16 ? 8 : 7);
    return healthArr[offset + index] || 0;
};

const getBaseHp = (isOur: boolean) => {
    if (demoMode.value) return 5000;
    const s = globalData.GlobalUnitStatusData || {};
    return isOur ? (s.baseHealth || 0) : (s.enemyBaseHealth || 0);
};

const getBaseShield = (isOur: boolean) => {
    if (demoMode.value) return 500;
    const s = globalData.GlobalUnitStatusData || {};
    return isOur ? (s.baseShield || 0) : (s.enemyBaseShield || 0);
};

const getOutpostHp = (isOur: boolean) => {
    if (demoMode.value) return 1500;
    const s = globalData.GlobalUnitStatusData || {};
    return isOur ? (s.outpostHealth || 0) : (s.enemyOutpostHealth || 0);
};

const createTeamUnits = (isOur: boolean) => {
    const isRed = isOur ? isRedTeam.value : !isRedTeam.value;
    return [
        { name: '英雄', image: heroImg, hp: getRobotHp(isRed, 0), maxHp: 500, isBase: false, shield: 0 },
        { name: '工程', image: engineerImg, hp: getRobotHp(isRed, 1), maxHp: 500, isBase: false, shield: 0 },
        { name: '步兵1', image: infantryImg, hp: getRobotHp(isRed, 2), maxHp: 500, isBase: false, shield: 0 },
        { name: '步兵2', image: infantryImg, hp: getRobotHp(isRed, 3), maxHp: 500, isBase: false, shield: 0 },
        { name: '哨兵', image: sentryImg, hp: getRobotHp(isRed, 6), maxHp: 500, isBase: false, shield: 0 },
        { name: '前哨站', image: outpostImg, hp: getOutpostHp(isOur), maxHp: 1500, isBase: false, shield: 0 },
        { name: '基地', image: baseImg, hp: getBaseHp(isOur), maxHp: 5000, isBase: true, shield: getBaseShield(isOur) },
    ];
};

const ourUnits = computed(() => createTeamUnits(true));
const enemyUnits = computed(() => createTeamUnits(false));

const getHpPercent = (unit: any) => {
    if (unit.maxHp === 0) return 0;
    return Math.min(100, Math.max(0, (unit.hp / unit.maxHp) * 100));
};
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
    width: 5.5vw;
    max-width: 100px;
    min-width: 50px;
    height: 100%;
}

.unit-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    margin-bottom: 1vh;
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
    box-shadow: 0 0 20px rgba(64, 196, 255, 0.8), inset 0 0 12px rgba(64, 196, 255, 0.5);
    pointer-events: none;
    z-index: 1;
    transform: scale(1.15);
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

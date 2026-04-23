<template>
  <div v-if="isVisible" class="respawn-overlay" @mousedown.stop @mouseup.stop @click.stop>
     <div class="respawn-box">
        <h2>等待复活</h2>
        <div class="progress-bar-container">
           <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-text">{{ currentProgress }} / {{ totalProgress }}</div>
        
        <div class="action-buttons">
           <v-btn 
              v-if="canFreeRespawn || !isProgressFinished"
              :disabled="!isProgressFinished || !canFreeRespawn"
              color="primary"
              @click="handleFreeRespawnClick"
              class="respawn-btn"
           >
              {{ isProgressFinished && canFreeRespawn ? '免费复活' : '复活准备中...' }}
           </v-btn>

           <v-btn 
              color="warning"
              @click="handlePayRespawnClick"
              class="respawn-btn"
           >
              立即买活 ({{ goldCost }}金币)
           </v-btn>
        </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { AutoResurrection, AutoBuyResurrection } from '@/services/AutoTaskServices';

const robotStore = useRobotStore();

const respawnData = computed(() => robotStore.robot.RobotRespawnStatusData);

const isVisible = computed(() => {
   // 如果明确处于存活状态，则不显示复活遮罩
   if (robotStore.robot.RobotStaticStatusData?.aliveState === 1) {
      return false;
   }
   
   const data = respawnData.value;
   if (!data) return false;

   const isPending = !!data.isPendingRespawn;
   // 如果总读条大于0，说明正在读条或需要读条
   const hasProgress = (data.totalRespawnProgress || 0) > 0;

   return isPending || hasProgress;
});

const currentProgress = computed(() => respawnData.value?.currentRespawnProgress || 0);
const totalProgress = computed(() => respawnData.value?.totalRespawnProgress || 100);
const progressPercent = computed(() => {
   if (totalProgress.value === 0) return 100;
   return Math.min(100, Math.max(0, (currentProgress.value / totalProgress.value) * 100));
});

const isProgressFinished = computed(() => {
    return !!respawnData.value?.isPendingRespawn || 
           (totalProgress.value > 0 && currentProgress.value >= totalProgress.value);
});

const canFreeRespawn = computed(() => !!respawnData.value?.canFreeRespawn);
const canPayForRespawn = computed(() => !!respawnData.value?.canPayForRespawn);
const goldCost = computed(() => respawnData.value?.goldCostForRespawn || 0);

const handleFreeRespawnClick = () => {
   if (canFreeRespawn.value) {
      AutoResurrection();
   }
};

const handlePayRespawnClick = () => {
   // 既然服务器下发的 canPayForRespawn 一直为 false 但实际可以购买，
   // 这里直接放开限制，点击即发送买活指令，由服务端自行判断是否真正允许
   AutoBuyResurrection();
};

watch(isVisible, (newVal) => {
    window.dispatchEvent(new CustomEvent('combat-overlay-active', { detail: { active: newVal } }));
}, { immediate: true });

onUnmounted(() => {
    if (isVisible.value) {
        window.dispatchEvent(new CustomEvent('combat-overlay-active', { detail: { active: false } }));
    }
});
</script>

<style scoped>
.respawn-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  pointer-events: auto;
  cursor: default !important;
}
.respawn-overlay * {
  cursor: default !important;
}
.respawn-box {
  background: rgba(30, 30, 30, 0.9);
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.respawn-box h2 {
  margin-bottom: 20px;
  margin-top: 0;
}
.progress-bar-container {
  width: 100%;
  height: 20px;
  background: #333;
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}
.progress-text {
  margin-bottom: 30px;
  font-size: 14px;
  color: #ccc;
}
.respawn-btn {
  flex: 1;
  max-width: 200px;
}
.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  width: 100%;
}
</style>

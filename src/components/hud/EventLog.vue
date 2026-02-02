<template>
    <div class="event-log">
        <div v-if="events.length === 0" class="empty">暂无事件</div>
        <div v-for="event in events" :key="event.id" class="event-item">
            <div class="event-time">{{ event.time }}</div>
            <div class="event-text">{{ event.text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue';
import { useGlobalStore } from '@/stores/globalData';
import { useHudDemoTicker } from './useHudDemo';

interface LogItem {
    id: string;
    time: string;
    text: string;
}

const { global: globalData } = useGlobalStore();
const log = ref<LogItem[]>([]);
const demoMode = inject('hudDemoMode', computed(() => false));
const showNotifications = inject('hudShowNotifications', computed(() => true));
const demoTick = useHudDemoTicker();

const demoEvents = computed<LogItem[]>(() => {
    const base = Math.floor(demoTick.value / 1000);
    return [
        { id: 'demo-1', time: '--:--:--', text: `击中目标 +${(base % 5) + 1}` },
        { id: 'demo-2', time: '--:--:--', text: '模块状态：正常' },
        { id: 'demo-3', time: '--:--:--', text: '补给点可用' },
        { id: 'demo-4', time: '--:--:--', text: '缓冲能量恢复' },
    ];
});

const events = computed(() => {
    if (!showNotifications.value) return [];
    return demoMode.value && log.value.length === 0 ? demoEvents.value : log.value.slice().reverse();
});

const formatTime = (date: Date) =>
    date.toLocaleTimeString('zh-CN', { hour12: false });

watch(
    () => globalData.EnventData,
    (next) => {
        if (!next?.length) return;
        next.forEach((item) => {
            log.value.push({
                id: `${Date.now()}-${Math.random()}`,
                time: formatTime(new Date()),
                text: `事件 ${item.event_id} - ${item.param ?? '无参数'}`,
            });
        });
        if (log.value.length > 50) {
            log.value.splice(0, log.value.length - 50);
        }
    },
    { deep: true }
);
</script>

<style scoped lang="sass">
.event-log
    display: flex
    flex-direction: column
    gap: 10px
    max-height: 100%
    overflow: hidden
    padding: 4px

.event-item
    display: flex
    align-items: center
    gap: 8px
    font-size: 12px
    padding: 8px 10px
    background: rgba(255, 255, 255, 0.08)
    border-radius: 10px
    border: 1px solid rgba(255, 255, 255, 0.08)

.event-time
    color: var(--hud-text-tertiary)
    min-width: 70px

.event-text
    color: var(--hud-text-primary)
    flex: 1
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.empty
    font-size: 12px
    color: var(--hud-text-tertiary)
</style>

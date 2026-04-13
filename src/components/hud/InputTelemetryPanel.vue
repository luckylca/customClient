<template>
    <div class="input-telemetry-panel">
        <div class="row header-row">
            <span class="label">键盘位掩码</span>
            <span class="value">{{ telemetry.keyboardValue }}</span>
        </div>

        <div class="keys-wrap">
            <span v-for="key in displayKeys" :key="key" class="key-chip">{{ key }}</span>
            <span v-if="displayKeys.length === 0" class="empty-hint">无按键</span>
        </div>

        <div class="row">
            <span class="label">Mouse X/Y/Z</span>
            <span class="value">{{ telemetry.mouseX }} / {{ telemetry.mouseY }} / {{ telemetry.mouseZ }}</span>
        </div>

        <div class="row">
            <span class="label">按键状态</span>
            <span class="value">L{{ telemetry.leftButtonDown ? 1 : 0 }} R{{ telemetry.rightButtonDown ? 1 : 0 }} M{{ telemetry.midButtonDown ? 1 : 0 }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useInputTelemetryStore } from '@/stores/inputTelemetry';

const telemetryStore = useInputTelemetryStore();
const telemetry = computed(() => telemetryStore.state);

const keyAlias: Record<string, string> = {
    KeyW: 'W',
    KeyA: 'A',
    KeyS: 'S',
    KeyD: 'D',
    KeyQ: 'Q',
    KeyE: 'E',
    KeyR: 'R',
    KeyF: 'F',
    KeyG: 'G',
    KeyZ: 'Z',
    KeyX: 'X',
    KeyC: 'C',
    KeyV: 'V',
    KeyB: 'B',
    ShiftLeft: 'LShift',
    ShiftRight: 'RShift',
    ControlLeft: 'LCtrl',
    ControlRight: 'RCtrl',
};

const displayKeys = computed(() => telemetry.value.keysPressed.map((code) => keyAlias[code] || code));
</script>

<style scoped lang="sass">
.input-telemetry-panel
    display: flex
    flex-direction: column
    gap: 8px
    width: 100%
    height: 100%
    padding: 10px 12px
    color: var(--hud-text-primary)
    background: rgba(0, 0, 0, 0.12)
    border-radius: 10px

.row
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px
    font-size: 12px

.header-row
    font-weight: 700

.label
    color: rgba(255, 255, 255, 0.78)

.value
    color: #ffffff
    font-variant-numeric: tabular-nums

.keys-wrap
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 6px
    min-height: 30px

.key-chip
    padding: 2px 7px
    border-radius: 6px
    font-size: 11px
    color: #d6f2ff
    border: 1px solid rgba(139, 226, 255, 0.45)
    background: rgba(47, 112, 138, 0.32)

.empty-hint
    font-size: 11px
    color: rgba(255, 255, 255, 0.55)
</style>

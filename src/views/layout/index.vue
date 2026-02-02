<template>
    <div class="layout-container">
        <v-window show-arrows>
            <template v-slot:prev="{ props }">
                <v-btn
                    color="info"
                    @click="props.onClick"
                    prepend-icon="$prev"
                    style="position: fixed; bottom: 160px; left: 160px;"
                    width="100"
                    height="70"
                >
                    上一步
                </v-btn>
            </template>
            <template v-slot:next="{ props }">
                <v-btn
                    color="info"
                    @click="handleNext(props)"
                    append-icon="$next"
                    style="position: fixed; bottom: 160px; right: 160px;"
                    width="100"
                    height="70"
                >
                    下一步
                </v-btn>
            </template>
            <v-window-item>
                <v-card class="baseCard">
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-card :elevation="isHovering ? 24 : 6" v-bind="props" class="rounded-xl d-flex justify-center align-center" width="230" height="230" @click="getBlue" :class="{ Select: isSelectBlue == true }">
                            <v-card-title class="text-h3">
                                蓝方
                            </v-card-title>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-card :elevation="isHovering ? 24 : 6" v-bind="props" class="rounded-xl d-flex justify-center align-center" width="230" height="230" @click="getRed" :class="{ Select: isSelectRed == true }">
                            <v-card-title class="text-h3">
                                红方
                            </v-card-title>
                        </v-card>
                    </v-hover>
                </v-card>
            </v-window-item>
            <v-window-item>
                <v-card class="baseCard">
                    <v-combobox
                        v-model="selectedItem"
                        :items=items
                        label="请选择机甲"
                        outlined
                        dense
                        max-width="600"
                    >
                    </v-combobox>
                    <Teleport to="body">
                        <v-btn
                            v-if="selectedItem"
                            color="info"
                            @click="finishSet"
                            append-icon="mdi-check"
                            width="100"
                            height="70"
                            :loading="loading"
                            style="position: fixed; bottom: 160px; right: 160px; z-index: 1000;"
                        >
                            确认
                        </v-btn>
                    </Teleport>
                </v-card>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRobotStore } from '@/stores/robotData'
import { useRouter } from 'vue-router';
const { ipcRenderer } = window.require('electron');

const items = ref(['步兵1', '步兵2','步兵3','无人机', '英雄', '工程'])
const router = useRouter();
const loading = ref(false)
const robotStore = useRobotStore()
const isHovering = ref(false)
const isSelectRed = ref(false)
const isSelectBlue = ref(false)
const selectedColor = ref('')
const selectedItem = ref('')


function getBlue() {
    isSelectBlue.value = true
    isSelectRed.value = false
    selectedColor.value = 'blue'
    console.log('选择蓝方')
}

function getRed() {
    isSelectRed.value = true
    isSelectBlue.value = false
    selectedColor.value = 'red'
    console.log('选择红方')
}
function handleNext(props: any) {
    if (isSelectRed.value == false && isSelectBlue.value == false) {
        alert('请选择一方')
    } else {
        props.onClick()
    }
}

function finishSet() {
    if (selectedItem.value == '') {
        alert('请选择机甲')
    } else {
        loading.value = true
        setTimeout(() => {
            loading.value = false
            // alert(`您选择了${selectedItem.value}机甲`)
            robotStore.initRobot(selectedColor.value, selectedItem.value)
            ipcRenderer.send('app-toggle-fullscreen')
            ipcRenderer.send('start-mqtt-service')
            switch(selectedItem.value) {
                case '步兵1':
                    router.push('/infantry1')
                    break
                case '步兵2':
                    router.push('/infantry2')
                    break
                case '步兵3':
                    router.push('/infantry3')
                    break
                case '无人机':
                    router.push('/drone')
                    break
                case '英雄':
                    router.push('/hero')
                    break
                case '工程':
                    router.push('/engineer')
                    break
            }
        }, 1000)
        
    }
}
</script>

<style scoped lang="sass">
// ==========================================
// Layout Selection - 明亮优雅主题
// ==========================================

// 动画定义
@keyframes fadeInScale
    from
        opacity: 0
        transform: scale(0.96)
    to
        opacity: 1
        transform: scale(1)

@keyframes cardFloat
    0%, 100%
        transform: translateY(0)
    50%
        transform: translateY(-8px)

@keyframes slideInUp
    from
        opacity: 0
        transform: translateY(30px)
    to
        opacity: 1
        transform: translateY(0)

@keyframes pulse
    0%, 100%
        box-shadow: 0 0 0 0 rgba(103, 80, 164, 0.4)
    50%
        box-shadow: 0 0 0 12px rgba(103, 80, 164, 0)

// 明亮色系
$bg-base: #F8F7FC
$bg-surface: #FFFFFF
$bg-surface-variant: #F3EDF7
$bg-hover: #EDE8F2
$text-primary: #1C1B1F
$text-secondary: #49454F
$accent: #6750A4
$accent-light: #E8DEF8
$accent-container: #EADDFF
$border: #CAC4D0
$border-light: #E7E0EC
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06)
$shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1)
$shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.15)

.layout-container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    background: linear-gradient(135deg, $bg-base 0%, #EDE7F6 50%, #E8DEF8 100%)
    position: relative
    animation: fadeInScale 0.6s ease-out

    // 背景装饰
    &::before
        content: ""
        position: absolute
        top: -20%
        right: -10%
        width: 600px
        height: 600px
        background: radial-gradient(circle, rgba(103, 80, 164, 0.08) 0%, transparent 70%)
        border-radius: 50%
        pointer-events: none

    &::after
        content: ""
        position: absolute
        bottom: -30%
        left: -10%
        width: 500px
        height: 500px
        background: radial-gradient(circle, rgba(125, 82, 96, 0.06) 0%, transparent 70%)
        border-radius: 50%
        pointer-events: none

// Base Card Container
.baseCard
    width: 1000px !important
    height: 600px !important
    display: flex
    padding: 64px
    justify-content: space-around
    align-items: center
    background: $bg-surface !important
    border-radius: 32px !important
    border: 1px solid $border-light
    box-shadow: $shadow-lg
    animation: slideInUp 0.5s ease-out 0.1s both
    position: relative
    overflow: visible

// Team Selection Cards
:deep(.v-card:not(.baseCard))
    background: $bg-surface !important
    border-radius: 24px !important
    border: 2px solid $border-light
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
    cursor: pointer
    overflow: visible

    &:hover
        transform: translateY(-8px)
        background: $bg-surface !important
        border-color: $accent-light
        box-shadow: $shadow-md

:deep(.v-card-title)
    color: $text-primary !important
    font-weight: 500
    padding: 20px 24px !important

:deep(.v-card-text)
    color: $text-secondary !important
    padding: 0 24px 24px !important

// Selected State - 强调紫色
.Select
    background: linear-gradient(135deg, $accent-container 0%, #F3E8FF 100%) !important
    box-shadow: 0 12px 40px rgba(103, 80, 164, 0.25) !important
    border: 2px solid $accent !important
    transform: translateY(-10px) scale(1.02)
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
    animation: cardFloat 3s ease-in-out infinite, pulse 2s ease-in-out infinite

    &::before
        content: '✓'
        position: absolute
        top: -12px
        right: -12px
        width: 32px
        height: 32px
        background: $accent
        color: white
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        font-size: 16px
        font-weight: bold
        box-shadow: 0 4px 12px rgba(103, 80, 164, 0.3)
        z-index: 10

    &::after
        content: ''
        position: absolute
        inset: 0
        border-radius: inherit
        background: radial-gradient(circle at 30% 30%, rgba(103, 80, 164, 0.08), transparent 60%)
        pointer-events: none

// Navigation Buttons
:deep(.v-btn)
    border-radius: 999px !important
    font-weight: 500
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important

    &[color="info"]
        background: $accent !important
        color: white !important

        &:hover
            box-shadow: 0 6px 20px rgba(103, 80, 164, 0.35)
            transform: translateY(-3px)

    &:active
        transform: scale(0.96)

// Combobox Styling
:deep(.v-combobox)
    .v-field
        border-radius: 16px !important
        background: $bg-surface
        transition: all 0.3s ease

    .v-field__outline
        color: $border

    &:hover .v-field__outline
        color: $accent-light

    .v-field--focused
        .v-field__outline
            color: $accent

    .v-field__input
        color: $text-primary

    .v-label
        color: $text-secondary

// Window Arrows
:deep(.v-window__controls)
    .v-btn
        background: $bg-surface !important
        color: $text-primary !important
        border: 1px solid $border-light
        transition: all 0.25s ease

        &:hover
            background: $bg-surface-variant !important
            border-color: $border
            transform: scale(1.1)
</style>
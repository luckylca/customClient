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
                    <v-btn
                        color="info"
                        @click="finishSet"
                        icon="mdi-check"
                        width="70"
                        height="70"
                        :loading="loading"
                        style="position: fixed; bottom: 160px; right: 160px;"
                    </v-btn>
                </v-card>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRobotStore } from '@/stores/robotData'
import { useRouter } from 'vue-router';

const items = ref(['步兵 1', '步兵 2', '无人机', '英雄', '工程'])
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
            switch(selectedItem.value) {
                case '步兵 1':
                    router.push('/infantry1')
                    break
                case '步兵 2':
                    router.push('/infantry2')
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
.layout-container
    display: flex
    justify-content: space-around
    align-items: center
    height: 100vh
    width: 100vw  

    .colorCard
        display: flex
        justify-content: center
        align-items: center
        font-size: 20rem
    .baseCard
        width: 1000px !important
        height: 600px !important
        display: flex
        padding-left: 100px
        padding-right: 100px
        justify-content: space-around
        align-items: center
    .Select
        background: linear-gradient(135deg, rgba(63, 81, 181, 0.08) 0%, rgba(63, 81, 181, 0.04) 100%) !important
        box-shadow: 0 8px 24px rgba(63, 81, 181, 0.12) !important
        border: 2px solid rgba(63, 81, 181, 0.4) !important
        transform: translateY(-4px) scale(1.02)
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
        
        &::after
            content: ''
            position: absolute
            inset: 0
            border-radius: inherit
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%)
            pointer-events: none
</style>
<template>
    <div class="layout-container">
        <v-card
            class="baseCard"
        >
            <v-hover v-slot:default="{ isHovering,props }">
                <v-card
                    :elevation="isHovering ? 24 : 6"
                    v-bind="props"
                    class="rounded-xl"
                    @click="getBlue"
                >
                    <v-card-title
                        class="text-h3"
                    >
                        蓝方
                    </v-card-title>
                </v-card>
            </v-hover>
            <v-hover v-slot:default="{ isHovering,props }">
                <v-card
                    :elevation="isHovering ? 24 : 6"
                    v-bind="props"
                    class="rounded-xl"
                    @click="getRed"
                >
                    <v-card-title
                        class="text-h3"
                    >
                        红方
                    </v-card-title>
                </v-card>
            </v-hover>
        </v-card>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const isHovering = ref(false)

function getBlue() {
    console.log('选择蓝方')
}

function getRed() {
    console.log('选择红方')
}



</script>

<style scoped lang="sass">
.layout-container
    display: flex
    justify-content: space-around
    align-items: center
    height: 100vh
    width: 100vw  

    :deep(.v-card)
        width: 35%
        height: 60%
        display: flex
        justify-content: center
        align-items: center
        font-size: 20rem
    .baseCard
        width: 1000px !important
        height: 600px !important
        display: flex
        justify-content: space-around
        align-items: center
</style>
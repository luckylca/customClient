<template>
    <v-app>
        <v-main>
            <v-container class="pa-4">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>你好，Vuetify 3 👋</v-card-title>
                            <v-card-text>
                                这是你在已有 Vue3 项目中集成 Vuetify 的第一个组件。
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click="count++">
                                    点击了 {{ count }} 次
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped lang="sass"></style>
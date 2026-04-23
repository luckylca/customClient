<template>
    <v-app>
        <v-main class="settings-main">
            <div class="settings-layout">
                <div class="left-pane">
                    <div class="settings-topbar">
                        <div class="topbar-title">机器人选项</div>
                        <div class="topbar-actions">
                            <v-btn
                                color="primary"
                                variant="tonal"
                                prepend-icon="mdi-arrow-left"
                                @click="goBack"
                            >
                                返回
                            </v-btn>
                        </div>
                    </div>

                    <v-card class="panel-card list-card" elevation="10">
                        <div class="panel-title">性能体系设置</div>
                        
                        <v-card class="entry-card" elevation="6">
                            <div class="entry-title mb-4">发射机构性能体系</div>
                            <v-radio-group v-model="shooterMode" inline hide-details>
                                <v-radio
                                    v-for="item in shooterItems"
                                    :key="item.value"
                                    :label="item.title"
                                    :value="item.value"
                                    color="primary"
                                    class="mr-4"
                                ></v-radio>
                            </v-radio-group>
                        </v-card>

                        <v-card class="entry-card" elevation="6">
                            <div class="entry-title mb-4">底盘性能体系</div>
                            <v-radio-group v-model="chassisMode" inline hide-details>
                                <v-radio
                                    v-for="item in chassisItems"
                                    :key="item.value"
                                    :label="item.title"
                                    :value="item.value"
                                    color="primary"
                                    class="mr-4"
                                ></v-radio>
                            </v-radio-group>
                        </v-card>

                        <v-card class="entry-card" elevation="6">
                            <div class="entry-title mb-4">哨兵控制模式</div>
                            <v-radio-group v-model="sentryControlMode" inline hide-details>
                                <v-radio
                                    v-for="item in sentryControlItems"
                                    :key="item.value"
                                    :label="item.title"
                                    :value="item.value"
                                    color="primary"
                                    class="mr-4"
                                ></v-radio>
                            </v-radio-group>
                        </v-card>

                        <div class="d-flex justify-end mt-6">
                            <v-btn
                                color="primary"
                                variant="elevated"
                                size="large"
                                prepend-icon="mdi-content-save"
                                @click="saveOptions"
                            >
                                保存设置
                            </v-btn>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSettingStore } from '@/stores/setting';
import { sendRobotPerformanceSelection } from '@/services/AutoTaskServices';

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();

const shooterMode = ref(1);
const chassisMode = ref(1);
const sentryControlMode = ref(0);

const shooterItems = [
    { title: '冷却优先', value: 1 },
    { title: '爆发优先', value: 2 },
    { title: '英雄近战优先', value: 3 },
    { title: '英雄远程优先', value: 4 },
];

const chassisItems = [
    { title: '血量优先', value: 1 },
    { title: '功率优先', value: 2 },
    { title: '英雄近战优先', value: 3 },
    { title: '英雄远程优先', value: 4 },
];

const sentryControlItems = [
    { title: '自动控制', value: 0 },
    { title: '半自动控制', value: 1 },
];

const goBack = () => {
    const from = typeof route.query.from === 'string' ? route.query.from : '';
    if (from) {
        router.push(from);
    } else {
        router.push({ name: 'layout' });
    }
};

const saveOptions = () => {
    const sent = sendRobotPerformanceSelection({
        shooter: shooterMode.value,
        chassis: chassisMode.value,
        sentry_control: sentryControlMode.value
    });

    if (sent) {
        settingStore.pushScriptNotification('保存成功');
    } else {
        settingStore.pushScriptNotification('保存失败，请检查连接');
    }

    console.log('保存设置', {
        shooterMode: shooterMode.value,
        chassisMode: chassisMode.value,
        sentryControlMode: sentryControlMode.value
    });
};
</script>

<style scoped lang="sass">
// 明亮色系
$bg-base: #F8F7FC
$bg-surface: #FFFFFF
$bg-surface-variant: #F3EDF7
$bg-hover: #EDE8F2
$text-primary: #1C1B1F
$text-secondary: #49454F
$text-hint: #79747E
$accent: #6750A4
$accent-light: #E8DEF8
$accent-container: #EADDFF
$border: #CAC4D0
$border-light: #E7E0EC
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06)
$shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08)
$shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12)

@keyframes fadeInUp
    from
        opacity: 0
        transform: translateY(20px)
    to
        opacity: 1
        transform: translateY(0)

@keyframes fadeInLeft
    from
        opacity: 0
        transform: translateX(-20px)
    to
        opacity: 1
        transform: translateX(0)

.settings-main
    padding: 0 !important
    background: linear-gradient(135deg, $bg-base 0%, #F0EBF5 100%)
    color: $text-primary
    font-family: 'Roboto', 'Noto Sans SC', sans-serif
    min-height: 100vh
    height: 100vh
    overflow-y: auto
    overflow-x: hidden

.settings-layout
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 32px
    min-height: 100vh
    height: auto
    padding: 40px 48px
    box-sizing: border-box
    animation: fadeInUp 0.5s ease-out
    max-width: 1200px
    margin: 0 auto

.left-pane
    position: relative
    display: flex
    flex-direction: column
    gap: 24px

.settings-topbar
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    padding: 8px 0 20px
    animation: fadeInLeft 0.4s ease-out

.topbar-title
    font-size: 28px
    font-weight: 500
    color: $text-primary
    letter-spacing: -0.02em
    background: linear-gradient(90deg, $accent, #9A82DB)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    background-clip: text

.topbar-actions
    display: flex
    align-items: center
    gap: 12px

.panel-card
    padding: 36px 40px
    background: $bg-surface
    color: $text-primary
    border-radius: 28px
    border: 1px solid $border-light
    box-shadow: $shadow-sm
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1)
    animation: fadeInUp 0.5s ease-out
    margin-bottom: 8px

    &:hover
        box-shadow: $shadow-md
        transform: translateY(-2px)
        border-color: $border

.panel-title
    font-size: 20px
    font-weight: 500
    margin-bottom: 20px
    color: $text-primary
    display: flex
    align-items: center
    gap: 10px

    &::before
        content: ''
        width: 4px
        height: 24px
        background: linear-gradient(180deg, $accent, #9A82DB)
        border-radius: 2px

.list-card
    margin-top: 0

.entry-card
    padding: 28px 32px
    margin: 20px 0 28px
    background: $bg-surface-variant
    border: 1px solid $border-light
    border-radius: 20px
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

    &:hover
        background: $bg-hover
        border-color: $accent-light
        transform: translateY(-3px)
        box-shadow: $shadow-md

.entry-title
    font-size: 17px
    font-weight: 500
    margin-bottom: 8px
    color: $text-primary

:deep(.v-card)
    background: $bg-surface !important
    color: $text-primary !important
    border-radius: 20px !important
    overflow: visible !important

:deep(.v-btn)
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important
    font-weight: 500

    &:hover
        transform: translateY(-2px)
        box-shadow: $shadow-md

    &:active
        transform: scale(0.97)

.entry-card
    animation: fadeInUp 0.4s ease-out backwards

    @for $i from 1 through 5
        &:nth-child(#{$i})
            animation-delay: #{$i * 0.08}s
</style>

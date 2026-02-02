<template>
    <v-app>
        <v-main class="settings-main">
            <div class="settings-layout" :class="{ 'hud-mode': mode === 'hud' }">
                <div class="left-pane">
                    <div v-if="mode === 'list'" class="settings-topbar">
                        <div class="topbar-title">设置中心</div>
                        <div class="topbar-actions">
                            <v-btn
                                color="primary"
                                variant="tonal"
                                prepend-icon="mdi-arrow-left"
                                @click="goBack"
                            >
                                返回比赛界面
                            </v-btn>
                        </div>
                    </div>

                    <v-card v-if="mode === 'list'" class="panel-card list-card" elevation="10">
                        <div class="panel-title">设置列表</div>
                        <v-card class="entry-card" elevation="6">
                            <div class="entry-title">布局设置（HUD 编辑）</div>
                            <div class="entry-subtitle">进入布局编辑界面，拖拽/缩放 HUD。</div>
                            <v-btn
                                color="primary"
                                variant="tonal"
                                prepend-icon="mdi-view-dashboard-edit"
                                @click="enterHudEdit"
                            >
                                进入 HUD 编辑
                            </v-btn>
                        </v-card>
                        <v-expansion-panels variant="accordion">
                            <v-expansion-panel>
                                <v-expansion-panel-title>通用设置</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-switch v-model="settings.autosave" label="自动保存布局" inset />
                                    <v-switch v-model="settings.showDemo" label="演示数据" inset />
                                    <v-switch v-model="settings.compactMode" label="紧凑标题栏" inset />
                                    <v-divider class="my-3" />
                                    <v-switch v-model="settings.performanceMode" label="性能模式" inset />
                                    <v-slider v-model="settings.fontScale" :min="0.85" :max="1.2" :step="0.05" label="字体缩放" />
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-title>显示与交互</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-switch v-model="appSettings.hideCursor" label="隐藏鼠标光标" inset />
                                    <v-switch v-model="appSettings.showCrosshair" label="显示准星" inset />
                                    <v-switch v-model="appSettings.showFps" label="显示帧率" inset />
                                    <v-switch v-model="appSettings.showNotifications" label="提示通知" inset />
                                </v-expansion-panel-text>
                        </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-title>图传与音效</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-switch v-model="appSettings.autoReconnectVideo" label="图传断开自动重连" inset />
                                    <v-switch v-model="appSettings.lowLatencyMode" label="低延迟优先" inset />
                                    <v-slider v-model="appSettings.masterVolume" :min="0" :max="100" :step="1" label="主音量" />
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>

                    <div v-else class="hud-editor">
                        <div class="hud-topbar">
                            <v-btn
                                color="white"
                                variant="flat"
                                prepend-icon="mdi-arrow-left"
                                @click="requestExitHud"
                            >
                                返回设置列表
                            </v-btn>
                            <v-btn
                                color="white"
                                variant="tonal"
                                prepend-icon="mdi-file-import"
                                @click="hudDrawer = true"
                            >
                                布局导入/导出
                            </v-btn>
                        </div>
                        <div class="preview-bg"></div>
                        <HUDContainer
                            :key="hudKey"
                            :show-toolbar="true"
                            :show-settings-panel="true"
                            :enable-edit="true"
                            :minimal="false"
                        />
                    </div>
                </div>

            </div>
        </v-main>
    </v-app>

    <v-navigation-drawer
        v-model="hudDrawer"
        location="right"
        width="360"
        temporary
        class="hud-import-drawer"
    >
        <div class="panel-title">HUD 布局导入 / 导出</div>
        <v-file-input
            v-model="importFile"
            label="从文件导入 JSON"
            accept=".json,application/json"
            prepend-icon="mdi-file-import"
            variant="outlined"
            density="compact"
        />
        <div class="panel-actions">
            <v-btn color="success" variant="tonal" @click="handleImportFile">
                导入并应用
            </v-btn>
            <v-btn color="primary" variant="tonal" @click="handleExportFile">
                导出为文件
            </v-btn>
        </div>
        <div class="panel-hint">导入后会自动刷新预览。</div>
    </v-navigation-drawer>

    <v-dialog v-model="showExitDialog" max-width="380">
        <v-card>
            <v-card-title>退出 HUD 编辑</v-card-title>
            <v-card-text>是否保存本次布局修改？</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="discardAndExit">不保存</v-btn>
                <v-btn color="primary" variant="tonal" @click="saveAndExit">保存并退出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HUDContainer from '@/components/hud/HUDContainer.vue';
import { exportHudConfig, importHudConfig, loadHudSettings, saveHudSettings } from '@/components/hud/hudStorage';

const hudKey = ref(0);
const importFile = ref<File | File[] | null>(null);
const router = useRouter();
const route = useRoute();
const mode = ref<'list' | 'hud'>('list');
const showExitDialog = ref(false);
const hudSnapshot = ref<string>('');
const hudDrawer = ref(false);
const settings = ref({
    autosave: true,
    showDemo: true,
    compactMode: false,
    performanceMode: false,
    fontScale: 1,
});

const appSettings = ref({
    hideCursor: true,
    showCrosshair: true,
    showFps: false,
    showNotifications: true,
    autoReconnectVideo: true,
    lowLatencyMode: true,
    masterVolume: 70,
});

const handleExportFile = () => {
    const data = exportHudConfig();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rm-hud-layout.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

const handleImportFile = async () => {
    const file = Array.isArray(importFile.value) ? importFile.value[0] : importFile.value;
    if (!file) return;
    try {
        const text = await file.text();
        importHudConfig(text);
        hudKey.value += 1;
    } catch (error) {
        console.error('HUD config import failed:', error);
        alert('导入失败：请检查 JSON 文件。');
    }
};

const syncSettings = () => {
    const stored = loadHudSettings();
    if (stored) {
        settings.value = {
            autosave: true,
            showDemo: stored.demoMode ?? true,
            compactMode: stored.compactHeader ?? false,
            performanceMode: stored.performanceMode ?? false,
            fontScale: stored.fontScale ?? 1,
        };
    }
};

syncSettings();

const saveExtraSettings = () => {
    saveHudSettings({
        ...(loadHudSettings() ?? {}),
        autosave: settings.value.autosave,
        demoMode: settings.value.showDemo,
        compactHeader: settings.value.compactMode,
        performanceMode: settings.value.performanceMode,
        fontScale: settings.value.fontScale,
    } as any);
    hudKey.value += 1;
};

watch(settings, saveExtraSettings, { deep: true });

const APP_SETTINGS_KEY = 'rm-app-settings';
const loadAppSettings = () => {
    try {
        const raw = localStorage.getItem(APP_SETTINGS_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        appSettings.value = { ...appSettings.value, ...parsed };
    } catch (error) {
        console.warn('App settings load failed:', error);
    }
};

const saveAppSettings = () => {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(appSettings.value));
};

loadAppSettings();
watch(appSettings, saveAppSettings, { deep: true });

const goBack = () => {
    const from = typeof route.query.from === 'string' ? route.query.from : '';
    if (from) {
        router.push(from);
    } else {
        router.push({ name: 'layout' });
    }
};

const enterHudEdit = () => {
    hudSnapshot.value = exportHudConfig();
    mode.value = 'hud';
};

const requestExitHud = () => {
    showExitDialog.value = true;
};

const saveAndExit = () => {
    saveExtraSettings();
    showExitDialog.value = false;
    hudDrawer.value = false;
    mode.value = 'list';
};

const discardAndExit = () => {
    if (hudSnapshot.value) {
        importHudConfig(hudSnapshot.value);
        hudKey.value += 1;
    }
    showExitDialog.value = false;
    hudDrawer.value = false;
    mode.value = 'list';
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && mode.value === 'hud') {
        event.preventDefault();
        requestExitHud();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="sass">
// ==========================================
// Settings Page - 明亮优雅主题
// ==========================================

// 动画定义
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

@keyframes scaleIn
    from
        opacity: 0
        transform: scale(0.95)
    to
        opacity: 1
        transform: scale(1)

@keyframes shimmer
    0%
        background-position: -200% 0
    100%
        background-position: 200% 0

@keyframes float
    0%, 100%
        transform: translateY(0)
    50%
        transform: translateY(-6px)

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

.settings-main
    padding: 0 !important
    background: linear-gradient(135deg, $bg-base 0%, #F0EBF5 100%)
    color: $text-primary
    font-family: 'Roboto', 'Noto Sans SC', sans-serif
    min-height: 100vh

.settings-layout
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 32px
    height: 100vh
    padding: 40px 48px
    box-sizing: border-box
    animation: fadeInUp 0.5s ease-out
    max-width: 1200px
    margin: 0 auto

// HUD模式 - 全屏，无max-width限制
.settings-layout.hud-mode
    max-width: none
    width: 100vw
    height: 100vh
    padding: 0
    margin: 0
    gap: 0

.left-pane
    position: relative
    display: flex
    flex-direction: column
    gap: 24px

// HUD Editor Container - 全屏
.hud-editor
    position: absolute
    inset: 0
    overflow: hidden
    background: #0a0a14

// Top Bar
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

// Preview Background for HUD Mode
.preview-bg
    position: absolute
    inset: 0
    background: radial-gradient(ellipse at top center, rgba(103, 80, 164, 0.15) 0%, transparent 60%)
    pointer-events: none

// Panel Cards - 更大的内边距
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

.panel-actions
    display: flex
    gap: 14px
    margin-top: 20px
    flex-wrap: wrap

.panel-hint
    margin-top: 14px
    font-size: 13px
    color: $text-hint
    line-height: 1.5

.panel-text
    font-size: 14px
    color: $text-secondary
    margin-bottom: 10px
    line-height: 1.6

// List Card
.list-card
    margin-top: 0

// Entry Card - 内嵌卡片，更多空间
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

.entry-subtitle
    font-size: 14px
    color: $text-secondary
    margin-bottom: 18px
    line-height: 1.6

// HUD Editor Top Bar
.hud-topbar
    position: absolute
    top: 24px
    left: 24px
    display: flex
    gap: 12px
    z-index: 6
    animation: fadeInLeft 0.4s ease-out 0.2s both

// HUD Import/Export Drawer
.hud-import-drawer
    padding: 28px
    background: $bg-surface
    color: $text-primary

    :deep(.v-field)
        border-radius: 14px
        background: $bg-surface-variant

    :deep(.v-btn)
        border-radius: 999px

// Vuetify 组件深度覆盖
:deep(.v-card)
    background: $bg-surface !important
    color: $text-primary !important
    border-radius: 20px !important
    overflow: visible !important

:deep(.v-card-title)
    padding: 24px 28px 16px !important
    font-size: 18px !important
    color: $text-primary !important

:deep(.v-card-text)
    padding: 16px 28px !important
    color: $text-secondary !important

:deep(.v-card-actions)
    padding: 16px 28px 24px !important

// Expansion Panels - 更大的内边距
:deep(.v-expansion-panels)
    border-radius: 24px
    overflow: hidden
    border: 1px solid $border-light
    background: transparent
    box-shadow: $shadow-sm
    margin-top: 12px

:deep(.v-expansion-panel)
    background: $bg-surface !important
    color: $text-primary !important
    margin: 0 !important

    &:not(:last-child)
        border-bottom: 1px solid $border-light

:deep(.v-expansion-panel-title)
    font-size: 16px
    font-weight: 500
    padding: 24px 32px
    color: $text-primary !important
    min-height: 68px
    transition: all 0.25s ease

    &:hover
        background: $bg-surface-variant !important

:deep(.v-expansion-panel-text)
    background: $bg-surface !important

:deep(.v-expansion-panel-text__wrapper)
    padding: 16px 32px 32px

// Switch & Slider
:deep(.v-switch),
:deep(.v-slider)
    margin: 10px 0

:deep(.v-switch .v-label),
:deep(.v-slider .v-label)
    color: $text-primary !important
    opacity: 1 !important

:deep(.v-input__details)
    display: none

// Dialog
:deep(.v-dialog)
    .v-card
        background: $bg-surface !important
        border-radius: 28px !important
        border: 1px solid $border-light
        box-shadow: $shadow-lg

// 按钮动画增强
:deep(.v-btn)
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important
    font-weight: 500

    &:hover
        transform: translateY(-2px)
        box-shadow: $shadow-md

    &:active
        transform: scale(0.97)

// 滑动进入动画
.entry-card,
:deep(.v-expansion-panel)
    animation: fadeInUp 0.4s ease-out backwards

    @for $i from 1 through 5
        &:nth-child(#{$i})
            animation-delay: #{$i * 0.08}s
</style>

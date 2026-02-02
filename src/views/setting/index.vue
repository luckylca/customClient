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
                                variant="tonal"
                                prepend-icon="mdi-arrow-left"
                                @click="requestExitHud"
                            >
                                返回设置列表
                            </v-btn>
                            <v-btn
                                color="secondary"
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
.settings-main
    padding: 0 !important
    background: #0a0c12
    color: #f5f7ff

.settings-layout
    display: grid
    grid-template-columns: minmax(0, 1fr)
    gap: 16px
    height: 100vh
    padding: 16px
    box-sizing: border-box

.settings-layout.hud-mode
    grid-template-columns: minmax(0, 1fr)

.left-pane
    position: relative
    display: flex
    flex-direction: column
    gap: 16px

.hud-editor
    position: relative
    border-radius: 16px
    overflow: hidden
    background: #0c1018
    flex: 1

.settings-topbar
    position: absolute
    top: 16px
    left: 16px
    right: 16px
    z-index: 2
    display: flex
    align-items: center
    justify-content: space-between
    gap: 12px

.topbar-title
    font-size: 16px
    font-weight: 600
    color: rgba(255, 255, 255, 0.88)

.preview-bg
    position: absolute
    inset: 0
    background: radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 55%), linear-gradient(180deg, rgba(12, 16, 24, 0.95), rgba(12, 16, 24, 0.65))
    pointer-events: none

.settings-panel
    display: flex
    flex-direction: column
    gap: 16px

.panel-card
    padding: 16px
    background: rgba(24, 26, 34, 0.96)
    color: rgba(255, 255, 255, 0.92)

.panel-title
    font-size: 16px
    font-weight: 600
    margin-bottom: 12px

.panel-actions
    display: flex
    gap: 12px
    margin-top: 12px

.panel-hint
    margin-top: 8px
    font-size: 12px
    color: rgba(255, 255, 255, 0.6)

.panel-text
    font-size: 13px
    color: rgba(255, 255, 255, 0.76)
    margin-bottom: 6px

.settings-topbar
    position: sticky
    top: 0
    display: flex
    align-items: center
    justify-content: space-between
    gap: 12px
    z-index: 5
    padding: 12px 0
    background: #0a0c12

.topbar-title
    font-size: 18px
    font-weight: 600
    color: rgba(255, 255, 255, 0.88)

.list-card
    margin-top: 8px
    padding-top: 8px

.entry-card
    padding: 16px
    margin: 8px 0 12px
    background: rgba(20, 24, 32, 0.9)
    border: 1px solid rgba(255, 255, 255, 0.08)
    border-radius: 12px

.entry-title
    font-size: 15px
    font-weight: 600
    margin-bottom: 6px

.entry-subtitle
    font-size: 12px
    color: rgba(255, 255, 255, 0.6)
    margin-bottom: 10px

.topbar-actions
    display: flex
    align-items: center
    gap: 8px

.hud-topbar
    position: absolute
    top: 16px
    left: 16px
    display: flex
    gap: 8px
    z-index: 6

.hud-import-drawer
    padding: 16px
    background: rgba(18, 18, 22, 0.96)
    color: rgba(255, 255, 255, 0.92)
</style>

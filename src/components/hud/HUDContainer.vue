// src/components/hud/HUDContainer.vue
// 显示HUD容器的组件

<template>
    <div
        ref="containerRef"
        class="hud-layer"
        :class="{
            editing: settings.editMode,
            'mask-mode': settings.backgroundMode === 'mask',
            'blur-mode': settings.backgroundMode === 'blur',
            'performance-mode': settings.performanceMode,
            compact: settings.compactHeader,
            minimal: props.minimal,
            'hide-cursor': appSettings.hideCursor && !props.enableEdit,
        }"
        :style="{
            '--hud-opacity': settings.hudOpacity.toString(),
            '--hud-font-scale': settings.fontScale.toString(),
            '--hud-grid': settings.gridSize + 'px',
            '--hud-widget-opacity': settings.widgetOpacity.toString(),
            '--hud-blur': settings.blurIntensity + 'px',
        }"
    >
        <div v-if="props.showToolbar" class="hud-toolbar">
            <v-btn
                color="primary"
                variant="flat"
                size="small"
                :prepend-icon="settings.editMode ? 'mdi-pencil' : 'mdi-pencil-off'"
                @click="toggleEditMode"
            >
                HUD 编辑模式
            </v-btn>
            <v-btn
                color="secondary"
                variant="flat"
                size="small"
                prepend-icon="mdi-tune-variant"
                @click="showSettings = true"
            >
                HUD 设置
            </v-btn>
            <v-btn
                color="info"
                variant="flat"
                size="small"
                prepend-icon="mdi-refresh"
                @click="resetLayout"
            >
                重置布局
            </v-btn>
        </div>

        <div v-if="settings.showGrid && props.enableEdit" class="hud-grid"></div>

        <div v-if="showCrosshair" class="hud-crosshair">
            <div class="crosshair-line horizontal"></div>
            <div class="crosshair-line vertical"></div>
            <div class="crosshair-dot"></div>
        </div>

        <div v-if="showFps" class="hud-fps">FPS {{ fpsValue }}</div>

        <div
            v-for="widget in visibleWidgets"
            :key="widget.id"
            class="hud-widget"
            :class="{ 
                active: activeWidgetId === widget.id, 
                locked: widget.locked,
                'bg-mask': widget.customSettings?.backgroundMode === 'mask',
                'bg-blur': widget.customSettings?.backgroundMode === 'blur',
                'bg-inherit': !widget.customSettings?.backgroundMode || widget.customSettings?.backgroundMode === 'inherit'
            }"
            :style="widgetStyle(widget)"
            @contextmenu.prevent="openWidgetMenu(widget, $event)">
            <div
                v-if="!props.minimal"
                class="hud-header"
                :class="{ dragging: dragState?.id === widget.id }"
                @pointerdown="startDrag(widget, $event)"
            >
                <span class="hud-title">{{ widget.title }}</span>
                <span v-if="settings.showDemoBadge" class="demo-badge">DEMO</span>
                <div class="hud-header-actions" @pointerdown.stop @mousedown.stop @click.stop>
                    <v-btn
                        icon="mdi-arrow-up-bold"
                        size="x-small"
                        variant="text"
                        color="white"
                        :disabled="widget.locked || !settings.editMode"
                        @click.stop="bringToFront(widget.id)"
                    />
                    <v-btn
                        icon="mdi-lock"
                        size="x-small"
                        variant="text"
                        :color="widget.locked ? 'warning' : 'white'"
                        @click.stop="toggleLock(widget.id)"
                    />
                    <v-btn
                        icon="mdi-eye-off"
                        size="x-small"
                        variant="text"
                        color="white"
                        @click.stop="toggleWidget(widget.id)"
                    />
                </div>
            </div>
            <div class="hud-body">
                <component :is="widget.component" v-bind="widget.props" />
            </div>
            <div v-if="props.enableEdit && settings.editMode" class="resize-overlay">
                <button
                    v-for="handle in resizeHandles"
                    :key="widget.id + '-' + handle.dir"
                    type="button"
                    class="resize-handle"
                    :class="'resize-' + handle.dir"
                    :title="handle.title"
                    :aria-label="handle.title"
                    @pointerdown.stop="startResize(widget, $event, handle.dir)"
                />
            </div>
        </div>

        <!-- 右键菜单 -->
        <v-card
            v-if="widgetMenuVisible && widgetMenuTarget"
            class="widget-context-menu"
            :style="{ left: widgetMenuPosition.x + 'px', top: widgetMenuPosition.y + 'px' }"
            elevation="8"
            @click.stop
        >
            <v-card-title class="menu-title">
                <v-icon start size="small">mdi-tune</v-icon>
                {{ widgetMenuTarget.title }} 设置
            </v-card-title>
            <v-divider />
            <v-card-text class="menu-content">
                <div class="menu-section">
                    <div class="menu-label">组件透明度</div>
                    <v-slider
                        :model-value="widgetMenuTarget.customSettings?.opacity ?? 1"
                        @update:model-value="updateWidgetSetting('opacity', $event)"
                        :min="0.3"
                        :max="1"
                        :step="0.05"
                        hide-details
                        thumb-label
                        density="compact"
                    />
                </div>
                <div class="menu-section">
                    <div class="menu-label">背景模式</div>
                    <v-btn-toggle
                        :model-value="widgetMenuTarget.customSettings?.backgroundMode ?? 'inherit'"
                        @update:model-value="updateWidgetSetting('backgroundMode', $event)"
                        mandatory
                        color="primary"
                        density="compact"
                        class="menu-toggle"
                    >
                        <v-btn value="inherit" size="x-small">继承</v-btn>
                        <v-btn value="mask" size="x-small">遮罩</v-btn>
                        <v-btn value="blur" size="x-small">模糊</v-btn>
                    </v-btn-toggle>
                </div>
                <div v-if="widgetMenuTarget.customSettings?.backgroundMode === 'mask'" class="menu-section">
                    <div class="menu-label">遮罩透明度</div>
                    <v-slider
                        :model-value="widgetMenuTarget.customSettings?.maskOpacity ?? settings.hudOpacity"
                        @update:model-value="updateWidgetSetting('maskOpacity', $event)"
                        :min="0.3"
                        :max="0.95"
                        :step="0.05"
                        hide-details
                        thumb-label
                        density="compact"
                    />
                </div>
                <div v-if="widgetMenuTarget.customSettings?.backgroundMode === 'blur'" class="menu-section">
                    <div class="menu-label">模糊程度</div>
                    <v-slider
                        :model-value="widgetMenuTarget.customSettings?.blurIntensity ?? settings.blurIntensity"
                        @update:model-value="updateWidgetSetting('blurIntensity', $event)"
                        :min="4"
                        :max="32"
                        :step="2"
                        hide-details
                        thumb-label
                        density="compact"
                    />
                </div>
            </v-card-text>
            <v-divider />
            <v-card-actions class="menu-actions">
                <v-btn size="small" variant="text" @click="resetWidgetSettings">
                    <v-icon start size="small">mdi-refresh</v-icon>
                    重置
                </v-btn>
                <v-spacer />
                <v-btn size="small" color="primary" @click="closeWidgetMenu">
                    完成
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- 菜单点击外部关闭 -->
        <div v-if="widgetMenuVisible" class="menu-backdrop" @click="closeWidgetMenu" />

        <v-navigation-drawer
            v-if="props.showSettingsPanel"
            v-model="showSettings"
            location="right"
            width="360"
            scrim="transparent"
            temporary
            class="hud-settings"
        >
            <div class="settings-header">
                <div>
                    <div class="settings-title">HUD 设置中心</div>
                    <div class="settings-subtitle">布局、性能和组件显示</div>
                </div>
                <v-btn icon="mdi-close" variant="text" @click="closeSettings" />
            </div>
            <v-divider />
            <v-list density="compact">
                <v-list-subheader>布局</v-list-subheader>
                <v-list-item>
                    <v-switch
                        v-model="settings.editMode"
                        label="编辑模式"
                        inset
                    />
                </v-list-item>
                <v-list-item>
                    <v-switch
                        v-model="settings.compactHeader"
                        label="紧凑标题栏"
                        inset
                    />
                </v-list-item>
                <v-list-item>
                    <v-switch
                        v-model="settings.showDemoBadge"
                        label="显示 DEMO 标记"
                        inset
                    />
                </v-list-item>
                <v-divider class="mt-3 mb-2" />
                <v-list-subheader>视觉效果</v-list-subheader>
                <v-list-item>
                    <v-btn-toggle
                        v-model="settings.backgroundMode"
                        mandatory
                        color="primary"
                        density="compact"
                        class="mb-3"
                    >
                        <v-btn value="mask" size="small">
                            <v-icon start>mdi-circle-opacity</v-icon>
                            黑色遮罩
                        </v-btn>
                        <v-btn value="blur" size="small">
                            <v-icon start>mdi-blur</v-icon>
                            高斯模糊
                        </v-btn>
                    </v-btn-toggle>
                </v-list-item>
                <v-list-item>
                    <v-slider
                        v-model="settings.hudOpacity"
                        :min="0.3"
                        :max="0.95"
                        :step="0.05"
                        label="遮罩透明度"
                        hide-details
                        thumb-label
                    />
                </v-list-item>
                <v-list-item v-if="settings.backgroundMode === 'blur'">
                    <v-slider
                        v-model="settings.blurIntensity"
                        :min="4"
                        :max="32"
                        :step="2"
                        label="模糊程度"
                        hide-details
                        thumb-label
                    />
                </v-list-item>
                <v-list-item>
                    <v-slider
                        v-model="settings.fontScale"
                        :min="0.85"
                        :max="1.25"
                        :step="0.05"
                        label="文字缩放"
                        hide-details
                    />
                </v-list-item>
                <v-list-item>
                    <v-slider
                        v-model="settings.widgetOpacity"
                        :min="0.4"
                        :max="1.0"
                        :step="0.05"
                        label="组件透明度"
                        hide-details
                        thumb-label
                    />
                </v-list-item>
                <v-divider class="mt-3 mb-2" />
                <v-list-subheader>性能</v-list-subheader>
                <v-list-item>
                    <v-switch
                        v-model="settings.performanceMode"
                        label="性能模式 (减少阴影/模糊)"
                        inset
                    />
                </v-list-item>
                <v-list-item>
                    <v-switch
                        v-model="settings.demoMode"
                        label="演示数据 (无赛事数据时)"
                        inset
                    />
                </v-list-item>
                <v-divider class="mt-3 mb-2" />
                <v-list-subheader>组件显示</v-list-subheader>
                <v-list-item
                    v-for="widget in widgets"
                    :key="widget.id + '-toggle'"
                >
                    <v-switch
                        v-model="widget.visible"
                        :label="widget.title"
                        inset
                    />
                </v-list-item>
            </v-list>
            <v-divider class="mt-3 mb-2" />
            <div class="settings-footer">
                <div class="shortcut-title">快捷键</div>
                <div class="shortcut-row">Ctrl + E：切换编辑模式</div>
                <div class="shortcut-row">Ctrl + S：打开设置</div>
                <div class="shortcut-row">Ctrl + R：重置布局</div>
                <div class="shortcut-row">Ctrl + G：显示/隐藏网格</div>
            </div>
            <div class="settings-actions">
                <v-btn color="primary" variant="tonal" @click="saveAll">
                    保存设置
                </v-btn>
                <v-btn variant="text" @click="closeSettings">
                    关闭
                </v-btn>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, reactive, ref, computed, watch, provide, nextTick } from 'vue';
import HUDTopBar from './HUDTopBar.vue';
import HealthPanel from './HealthPanel.vue';
import PowerPanel from './PowerPanel.vue';
import BufferPanel from './BufferPanel.vue';
import ExperiencePanel from './ExperiencePanel.vue';
import AmmoCounter from './AmmoCounter.vue';
import Minimap from './Minimap.vue';
import ModuleStatus from './ModuleStatus.vue';
import EventLog from './EventLog.vue';
import BuffList from './BuffList.vue';
import ControlHints from './ControlHints.vue';
import InputTelemetryPanel from './InputTelemetryPanel.vue';
import DataInspectorPanel from './DataInspectorPanel.vue';
import TeamAssetPanel from './TeamAssetPanel.vue';
import CustomVideoTransmissionPanel from './CustomVideoTransmissionPanel.vue';
import { useSettingStore } from '@/stores/setting';
import { useVideoStatsStore } from '@/stores/videoStats';
import {
    loadHudLayout,
    saveHudLayout,
    loadHudSettings,
    saveHudSettings,
} from './hudStorage';
import type { StoredHudWidget, StoredHudSettings } from './hudStorage';

const props = withDefaults(
    defineProps<{
        showToolbar?: boolean;
        showSettingsPanel?: boolean;
        enableEdit?: boolean;
        minimal?: boolean;
    }>(),
    {
        showToolbar: false,
        showSettingsPanel: false,
        enableEdit: false,
        minimal: false,
    }
);

const emit = defineEmits<{
    (e: 'closeSettings'): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const containerSize = reactive({ width: 1920, height: 1080 });

const showSettings = ref(false);
const activeWidgetId = ref<string | null>(null);
const dragState = ref<DragState | null>(null);
const resizeState = ref<ResizeState | null>(null);
const rafId = ref<number | null>(null);

// 右键菜单状态
const widgetMenuVisible = ref(false);
const widgetMenuPosition = reactive({ x: 0, y: 0 });
const widgetMenuTarget = ref<StoredHudWidget | null>(null); // Use StoredHudWidget

interface DragState {
    id: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
}

interface ResizeState {
    id: string;
    direction: ResizeDirection;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    originW: number;
    originH: number;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

type WidgetComponent = typeof HUDTopBar;

// Use StoredHudWidget + component
interface HudWidget extends StoredHudWidget {
    component?: WidgetComponent;
}

// Local settings ref
const settings = reactive<StoredHudSettings>({
    autosave: true,
    editMode: false,
    showGrid: false,
    snapToGrid: true,
    gridSize: 24,
    compactHeader: false,
    showDemoBadge: false,
    hudOpacity: 0.78,
    backgroundMode: 'mask',
    blurIntensity: 12,
    widgetOpacity: 1.0,
    fontScale: 1,
    performanceMode: false,
    demoMode: true,
});

const demoMode = computed(() => settings.demoMode);
provide('hudDemoMode', demoMode);

const settingStore = useSettingStore();
const videoStatsStore = useVideoStatsStore();
const appSettings = computed(() => settingStore.appSettings);
const showCrosshair = computed(() => appSettings.value.showCrosshair);
const showFps = computed(() => appSettings.value.showFps);
const showNotifications = computed(() => appSettings.value.showNotifications);
provide('hudShowNotifications', showNotifications);
const fpsValue = computed(() => videoStatsStore.decodedFps);

// Components map for hydration
const widgetComponentById = (id: string) => {
    switch (id) {
        case 'top-bar':
            return markRaw(HUDTopBar);
        case 'module-status':
            return markRaw(ModuleStatus);
        case 'ammo-counter':
            return markRaw(AmmoCounter);
        case 'health-panel':
            return markRaw(HealthPanel);
        case 'power-panel':
            return markRaw(PowerPanel);
        case 'buffer-panel':
            return markRaw(BufferPanel);
        case 'experience-panel':
            return markRaw(ExperiencePanel);
        case 'status-panel': // Fallback for old layouts
            return markRaw(HealthPanel);
        case 'minimap':
            return markRaw(Minimap);
        case 'event-log':
            return markRaw(EventLog);
        case 'buff-list':
            return markRaw(BuffList);
        case 'control-hints':
            return markRaw(ControlHints);
        case 'input-telemetry':
            return markRaw(InputTelemetryPanel);
        case 'robot-data-inspector':
            return markRaw(DataInspectorPanel);
        case 'global-data-inspector':
            return markRaw(DataInspectorPanel);
        case 'team-asset-panel':
            return markRaw(TeamAssetPanel);
        case 'custom-video-transmission':
            return markRaw(CustomVideoTransmissionPanel);
        default:
            return markRaw(HealthPanel);
    }
};

const defaultWidgets = (width = 1920, height = 1080): HudWidget[] => {
    const padding = 28;
    const leftColumnX = padding;
    const rightColumnX = Math.max(width - 380 - padding, padding);
    const centerX = Math.max((width - 900) / 2, padding);
    return [
        {
            id: 'top-bar',
            title: '比赛状态',
            component: markRaw(HUDTopBar),
            x: centerX,
            y: padding,
            w: Math.min(1240, width - padding * 2),
            h: 84,
            minW: 820,
            minH: 72,
            visible: true,
            locked: true,
            z: 6,
        },
        {
            id: 'module-status',
            title: '模块状态',
            component: markRaw(ModuleStatus),
            x: leftColumnX,
            y: 150,
            w: 360,
            h: 260,
            minW: 300,
            minH: 220,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'ammo-counter',
            title: '弹药 / 热量',
            component: markRaw(AmmoCounter),
            x: leftColumnX,
            y: 430,
            w: 360,
            h: 190,
            minW: 280,
            minH: 160,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'health-panel',
            title: '生命值',
            component: markRaw(HealthPanel),
            x: leftColumnX,
            y: 630,
            w: 360,
            h: 90,
            minW: 280,
            minH: 80,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'power-panel',
            title: '底盘功率',
            component: markRaw(PowerPanel),
            x: leftColumnX,
            y: 730,
            w: 175,
            h: 90,
            minW: 140,
            minH: 80,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'buffer-panel',
            title: '缓冲能量',
            component: markRaw(BufferPanel),
            x: leftColumnX + 185,
            y: 730,
            w: 175,
            h: 90,
            minW: 140,
            minH: 80,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'experience-panel',
            title: '经验与升级',
            component: markRaw(ExperiencePanel),
            x: leftColumnX,
            y: 830,
            w: 360,
            h: 100,
            minW: 280,
            minH: 80,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'event-log',
            title: '事件日志',
            component: markRaw(EventLog),
            x: leftColumnX,
            y: height - 210,
            w: 420,
            h: 180,
            minW: 320,
            minH: 160,
            visible: true,
            locked: false,
            z: 3,
        },
        {
            id: 'buff-list',
            title: '机器增强',
            component: markRaw(BuffList),
            x: rightColumnX,
            y: 160,
            w: 320,
            h: 240,
            minW: 260,
            minH: 200,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'minimap',
            title: '小地图',
            component: markRaw(Minimap),
            x: rightColumnX,
            y: height - 360,
            w: 360,
            h: 300,
            minW: 240,
            minH: 220,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'control-hints',
            title: '操作提示',
            component: markRaw(ControlHints),
            x: Math.max((width - 460) / 2, padding),
            y: height - 180,
            w: 460,
            h: 140,
            minW: 320,
            minH: 120,
            visible: true,
            locked: false,
            z: 3,
        },
        {
            id: 'input-telemetry',
            title: '键鼠输入状态',
            component: markRaw(InputTelemetryPanel),
            x: Math.max((width - 380) / 2, padding),
            y: Math.max(height - 340, 120),
            w: 380,
            h: 120,
            minW: 300,
            minH: 100,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'robot-data-inspector',
            title: '机器人数据总览',
            component: markRaw(DataInspectorPanel),
            props: { scope: 'robot' },
            x: Math.max(width - 520 - padding, padding),
            y: 420,
            w: 520,
            h: 280,
            minW: 320,
            minH: 180,
            visible: true,
            locked: false,
            z: 3,
        },
        {
            id: 'global-data-inspector',
            title: '全局数据总览',
            component: markRaw(DataInspectorPanel),
            props: { scope: 'global' },
            x: Math.max(width - 520 - padding, padding),
            y: 710,
            w: 520,
            h: 220,
            minW: 320,
            minH: 160,
            visible: true,
            locked: false,
            z: 3,
        },
        {
            id: 'team-asset-panel',
            title: '队伍公共资产',
            component: markRaw(TeamAssetPanel),
            x: Math.max(width - 320 - padding, padding),
            y: 160,
            w: 320,
            h: 220,
            minW: 260,
            minH: 180,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'custom-video-transmission',
            title: '自定义图传',
            component: markRaw(CustomVideoTransmissionPanel),
            x: Math.max((width - 660) / 2, padding),
            y: Math.max(height - 520, 120),
            w: 660,
            h: 340,
            minW: 420,
            minH: 220,
            visible: true,
            locked: false,
            z: 5,
        },
    ];
};

const widgets = ref<HudWidget[]>(defaultWidgets());

const resizeHandles: Array<{ dir: ResizeDirection; title: string }> = [
    { dir: 'n', title: '从上边缘调整大小' },
    { dir: 's', title: '从下边缘调整大小' },
    { dir: 'e', title: '从右边缘调整大小' },
    { dir: 'w', title: '从左边缘调整大小' },
    { dir: 'ne', title: '从右上角调整大小' },
    { dir: 'nw', title: '从左上角调整大小' },
    { dir: 'se', title: '从右下角调整大小' },
    { dir: 'sw', title: '从左下角调整大小' },
];

const visibleWidgets = computed(() =>
    widgets.value.filter((widget) => widget.visible)
);

const isLayoutValid = (layout: HudWidget[]) => {
    if (!layout.length) return false;
    const allNumeric = layout.every(
        (widget) =>
            Number.isFinite(widget.x) &&
            Number.isFinite(widget.y) &&
            Number.isFinite(widget.w) &&
            Number.isFinite(widget.h) &&
            widget.w > 0 &&
            widget.h > 0
    );
    if (!allNumeric) return false;
    const first = layout[0];
    const allSame = layout.every(
        (widget) =>
            widget.x === first.x &&
            widget.y === first.y &&
            widget.w === first.w &&
            widget.h === first.h
    );
    return !allSame;
};

// Load/Save Logic

const loadLayout = () => {
    const parsed = loadHudLayout();
    if (!parsed || !parsed.length) return false;
    const rebuilt = parsed.map((item) => ({
        ...item,
        // Top bar should be movable in edit mode for rapid layout tuning.
        locked: item.id === 'top-bar' ? false : item.locked,
        component: widgetComponentById(item.id),
    })) as HudWidget[];

    const missingDefaults = defaultWidgets(containerSize.width, containerSize.height)
        .filter((item) => !rebuilt.some((saved) => saved.id === item.id));
    const merged = [...rebuilt, ...missingDefaults];
    merged.forEach((item, index) => {
        item.z = index + 1;
    });
    
    // Safety Guard: Check Validity
    if (!isLayoutValid(merged)) return false;

    widgets.value = merged;
    return true;
};

const loadSettings = () => {
    const parsed = loadHudSettings();
    if (!parsed) return;
    Object.assign(settings, parsed);
};

const saveLayout = (force = false) => {
    if (!settings.autosave && !force) return;
    const serialized: StoredHudWidget[] = widgets.value.map((widget) => {
        const { component, ...rest } = widget;
        return rest;
    });
    saveHudLayout(serialized);
};

const saveSettings = (force = false) => {
    if (!settings.autosave && !force) return;
    saveHudSettings(settings);
};

// Hydrate widgets is no longer needed in this form as we loadLayout directly
// But we keep isLayoutValid helper for loadLayout checks


const updateContainerSize = () => {
    if (!containerRef.value) return;
    const rect = containerRef.value.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return; // Guard against hidden/unmounted state
    
    containerSize.width = rect.width;
    containerSize.height = rect.height;
    normalizeLayout();
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const RESIZE_MIN_WIDTH = 120;
const RESIZE_MIN_HEIGHT = 72;

const getResizeMinSize = (widget: HudWidget) => {
    const baseMinW = widget.minW || RESIZE_MIN_WIDTH;
    const baseMinH = widget.minH || RESIZE_MIN_HEIGHT;
    const minW = Math.max(40, Math.min(baseMinW, RESIZE_MIN_WIDTH, containerSize.width));
    const minH = Math.max(32, Math.min(baseMinH, RESIZE_MIN_HEIGHT, containerSize.height));
    return {
        minW,
        minH,
    };
};

const normalizeLayout = () => {
    // Safety check: Don't normalize if container is too small (e.g. initial load)
    if (containerSize.width < 100 || containerSize.height < 100) return;

    widgets.value = widgets.value.map((widget) => {
        const { minW, minH } = getResizeMinSize(widget);
        const width = clamp(widget.w, minW, Math.max(minW, containerSize.width - widget.x));
        const height = clamp(widget.h, minH, Math.max(minH, containerSize.height - widget.y));
        const x = clamp(widget.x, 0, Math.max(0, containerSize.width - width));
        const y = clamp(widget.y, 0, Math.max(0, containerSize.height - height));
        return { ...widget, w: width, h: height, x, y };
    });
};

const snapValue = (value: number) => {
    if (!settings.snapToGrid) return value;
    const size = settings.gridSize || 1;
    return Math.round(value / size) * size;
};

const scheduleUpdate = (fn: () => void) => {
    if (rafId.value !== null) cancelAnimationFrame(rafId.value);
    rafId.value = requestAnimationFrame(() => {
        fn();
        rafId.value = null;
    });
};

const widgetStyle = (widget: HudWidget) => ({
    transform: `translate3d(${widget.x}px, ${widget.y}px, 0)`,
    width: `${widget.w}px`,
    height: `${widget.h}px`,
    zIndex: widget.z,
    // 单独组件自定义样式
    '--widget-opacity': widget.customSettings?.opacity?.toString() ?? 'inherit',
    '--widget-mask-opacity': widget.customSettings?.maskOpacity?.toString() ?? 'inherit',
    '--widget-blur': widget.customSettings?.blurIntensity ? `${widget.customSettings.blurIntensity}px` : 'inherit',
});

// 右键菜单相关函数
const openWidgetMenu = (widget: HudWidget, event: MouseEvent) => {
    if (!settings.editMode) return;
    widgetMenuTarget.value = widget;
    widgetMenuPosition.x = event.clientX;
    widgetMenuPosition.y = event.clientY;
    widgetMenuVisible.value = true;
};

const closeWidgetMenu = () => {
    widgetMenuVisible.value = false;
    widgetMenuTarget.value = null;
};

const updateWidgetSetting = <K extends keyof NonNullable<HudWidget['customSettings']>>(
    key: K, 
    value: NonNullable<HudWidget['customSettings']>[K]
) => {
    if (!widgetMenuTarget.value) return;
    const widget = widgets.value.find(w => w.id === widgetMenuTarget.value?.id);
    if (!widget) return;
    
    if (!widget.customSettings) {
        widget.customSettings = {};
    }
    widget.customSettings[key] = value;
};

const resetWidgetSettings = () => {
    if (!widgetMenuTarget.value) return;
    const widget = widgets.value.find(w => w.id === widgetMenuTarget.value?.id);
    if (!widget) return;
    widget.customSettings = undefined;
    closeWidgetMenu();
};

const startDrag = (widget: HudWidget, event: PointerEvent) => {
    if (!props.enableEdit || !settings.editMode || widget.locked) return;
    if (event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('.hud-header-actions')) return;

    activeWidgetId.value = widget.id;
    dragState.value = {
        id: widget.id,
        startX: event.clientX,
        startY: event.clientY,
        originX: widget.x,
        originY: widget.y,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
};

const startResize = (widget: HudWidget, event: PointerEvent, direction: ResizeDirection) => {
    if (!props.enableEdit || !settings.editMode || widget.locked) return;
    if (event.button !== 0) return;
    activeWidgetId.value = widget.id;
    resizeState.value = {
        id: widget.id,
        direction,
        startX: event.clientX,
        startY: event.clientY,
        originX: widget.x,
        originY: widget.y,
        originW: widget.w,
        originH: widget.h,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
};

const handlePointerMove = (event: PointerEvent) => {
    if (!dragState.value && !resizeState.value) return;
    scheduleUpdate(() => {
        if (dragState.value) {
            const widget = widgets.value.find((item) => item.id === dragState.value?.id);
            if (!widget) return;
            const dx = event.clientX - dragState.value.startX;
            const dy = event.clientY - dragState.value.startY;
            const nextX = snapValue(dragState.value.originX + dx);
            const nextY = snapValue(dragState.value.originY + dy);
            widget.x = clamp(nextX, 0, containerSize.width - widget.w);
            widget.y = clamp(nextY, 0, containerSize.height - widget.h);
        }
        if (resizeState.value) {
            const widget = widgets.value.find((item) => item.id === resizeState.value?.id);
            if (!widget) return;
            const dx = event.clientX - resizeState.value.startX;
            const dy = event.clientY - resizeState.value.startY;
            const direction = resizeState.value.direction;

            const originLeft = resizeState.value.originX;
            const originTop = resizeState.value.originY;
            const originRight = resizeState.value.originX + resizeState.value.originW;
            const originBottom = resizeState.value.originY + resizeState.value.originH;

            let left = originLeft;
            let top = originTop;
            let right = originRight;
            let bottom = originBottom;

            if (direction.includes('w')) left = snapValue(originLeft + dx);
            if (direction.includes('e')) right = snapValue(originRight + dx);
            if (direction.includes('n')) top = snapValue(originTop + dy);
            if (direction.includes('s')) bottom = snapValue(originBottom + dy);

            left = clamp(left, 0, containerSize.width);
            right = clamp(right, 0, containerSize.width);
            top = clamp(top, 0, containerSize.height);
            bottom = clamp(bottom, 0, containerSize.height);

            const { minW, minH } = getResizeMinSize(widget);
            if (right - left < minW) {
                if (direction.includes('w') && !direction.includes('e')) {
                    left = right - minW;
                } else {
                    right = left + minW;
                }
            }

            if (bottom - top < minH) {
                if (direction.includes('n') && !direction.includes('s')) {
                    top = bottom - minH;
                } else {
                    bottom = top + minH;
                }
            }

            if (left < 0) {
                left = 0;
                right = Math.max(right, minW);
            }
            if (top < 0) {
                top = 0;
                bottom = Math.max(bottom, minH);
            }
            if (right > containerSize.width) {
                right = containerSize.width;
                left = Math.min(left, right - minW);
            }
            if (bottom > containerSize.height) {
                bottom = containerSize.height;
                top = Math.min(top, bottom - minH);
            }

            widget.x = left;
            widget.y = top;
            widget.w = Math.max(minW, right - left);
            widget.h = Math.max(minH, bottom - top);
        }
    });
};

const handlePointerUp = () => {
    if (dragState.value || resizeState.value) {
        dragState.value = null;
        resizeState.value = null;
        saveLayout();
    }
};

const toggleWidget = (id: string) => {
    const widget = widgets.value.find((item) => item.id === id);
    if (!widget) return;
    widget.visible = !widget.visible;
};

const toggleLock = (id: string) => {
    const widget = widgets.value.find((item) => item.id === id);
    if (!widget) return;
    widget.locked = !widget.locked;
};

const bringToFront = (id: string) => {
    const index = widgets.value.findIndex((item) => item.id === id);
    if (index < 0) return;

    const [target] = widgets.value.splice(index, 1);
    widgets.value.push(target);

    widgets.value.forEach((item, order) => {
        item.z = order + 1;
    });

    activeWidgetId.value = id;
};

const resetLayout = () => {
    widgets.value = defaultWidgets(containerSize.width, containerSize.height);
    saveLayout();
};

const toggleEditMode = () => {
    if (!props.enableEdit) return;
    settings.editMode = !settings.editMode;
};

const closeSettings = () => {
    showSettings.value = false;
};

const saveAll = () => {
    saveLayout(true);
    saveSettings(true);
    showSettings.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (!event.ctrlKey) return;
    switch (event.key.toLowerCase()) {
        case 'e':
            if (props.enableEdit) {
                settings.editMode = !settings.editMode;
            }
            event.preventDefault();
            break;
        case 's':
            if (props.showSettingsPanel) {
                showSettings.value = true;
            }
            event.preventDefault();
            break;
        case 'r':
            resetLayout();
            event.preventDefault();
            break;
        case 'g':
            if (props.enableEdit) {
                settings.showGrid = !settings.showGrid;
            }
            event.preventDefault();
            break;
        default:
            break;
    }
};


watch(
    () => settings,
    () => saveSettings(),
    { deep: true }
);

watch(
    () => widgets.value.map((widget) => ({ ...widget, component: undefined })),
    () => saveLayout(),
    { deep: true }
);

onMounted(async () => {
    // 使用 nextTick 确保 DOM 完全渲染后再获取容器尺寸
    await nextTick();
    
    // 延迟一帧确保容器尺寸正确
    requestAnimationFrame(() => {
        updateContainerSize();
        
        const loaded = loadLayout();
        loadSettings();
        
        showSettings.value = false;
        
        if (!props.enableEdit) {
            settings.editMode = false;
            settings.showGrid = false;
        }
        
        if (containerSize.width < 200 || containerSize.height < 200) {
            // 容器尺寸异常时，延迟再校正一次
            setTimeout(updateContainerSize, 50);
        }

        // 再次更新尺寸后归一化布局
        // updateContainerSize(); // Already done
        
        if (loaded) {
             updateContainerSize();
             normalizeLayout();
        } else {
             widgets.value = defaultWidgets(containerSize.width, containerSize.height);
        }
        
    });
    
    window.addEventListener('resize', updateContainerSize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateContainerSize);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="sass">
.hud-layer
    position: absolute
    inset: 0
    pointer-events: none
    font-family: var(--md-font-family)
    color: var(--hud-text-primary)
    --hud-local-opacity: var(--hud-opacity, 0.9)
    --hud-local-font: var(--hud-font-scale, 1)
    transform-origin: top left
    font-size: calc(14px * var(--hud-local-font))
    user-select: none
    -webkit-user-select: none

    &.performance-mode
        .hud-widget
            box-shadow: none
            backdrop-filter: none

    &::before
        content: ''
        position: absolute
        inset: 0
        background: radial-gradient(circle at 50% 0%, rgba(0, 0, 0, 0.18), transparent 55%), linear-gradient(180deg, rgba(0, 0, 0, 0.18), transparent 45%, rgba(0, 0, 0, 0.25))
        pointer-events: none
        z-index: 0

.hud-layer.hide-cursor
    cursor: none
    *
        cursor: none

.hud-toolbar
    position: absolute
    top: 20px
    right: 24px
    display: flex
    gap: 8px
    z-index: 20
    pointer-events: auto

.hud-widget
    position: absolute
    display: flex
    flex-direction: column
    background: transparent
    border: 1px solid rgba(255, 255, 255, 0.18)
    border-radius: var(--md-radius-lg)
    backdrop-filter: none
    -webkit-backdrop-filter: none
    box-shadow: var(--md-elevation-2)
    z-index: 3
    overflow: hidden
    outline: 1px solid rgba(255, 255, 255, 0.04)
    transition: border-color var(--md-duration-short4) var(--md-easing-standard), opacity 0.3s ease
    pointer-events: auto
    opacity: var(--widget-opacity, var(--hud-widget-opacity, 1))

    &.active
        border-color: var(--md-primary)
        box-shadow: 0 0 0 2px rgba(103, 80, 164, 0.3)

    &.locked
        opacity: 0.75

.hud-layer.minimal
    .hud-widget
        background: transparent
        border: none
        box-shadow: none
        backdrop-filter: none
        -webkit-backdrop-filter: none
        outline: none

    .hud-body
        padding: 0
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65)

.hud-header
    display: flex
    align-items: center
    gap: 8px
    padding: 10px 12px
    font-size: 11px
    text-transform: uppercase
    letter-spacing: 0.08em
    color: rgba(255, 255, 255, 0.75)
    border-bottom: 1px solid rgba(255, 255, 255, 0.08)
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0))
    cursor: default
    user-select: none

    .hud-layer.editing &
        cursor: move

.hud-layer.compact
    .hud-header
        padding: 6px 10px
        font-size: 10px

.hud-title
    font-weight: 600

.hud-header-actions
    margin-left: auto
    display: flex
    gap: 4px

.hud-body
    flex: 1
    min-height: 0
    height: 100%
    width: 100%
    overflow: hidden
    display: flex
    flex-direction: column
    align-items: stretch
    > *
        flex: 1
        width: 100%
        height: 100%
    padding: 5%
    position: relative
    z-index: 2

.resize-overlay
    position: absolute
    inset: 0
    pointer-events: none
    z-index: 6

.resize-handle
    position: absolute
    border: none
    background: transparent
    padding: 0
    margin: 0
    opacity: 0
    pointer-events: none
    transition: opacity 0.18s ease

.hud-layer.editing .hud-widget:not(.locked):hover .resize-handle,
.hud-layer.editing .hud-widget.active:not(.locked) .resize-handle
    opacity: 1
    pointer-events: auto

.resize-n,
.resize-s
    left: 12px
    right: 12px
    height: 10px
    cursor: ns-resize

.resize-e,
.resize-w
    top: 12px
    bottom: 12px
    width: 10px
    cursor: ew-resize

.resize-n
    top: 0

.resize-s
    bottom: 0

.resize-e
    right: 0

.resize-w
    left: 0

.resize-ne,
.resize-nw,
.resize-se,
.resize-sw
    width: 14px
    height: 14px
    border-radius: 4px
    background: rgba(255, 255, 255, 0.26)

.resize-ne
    top: 0
    right: 0
    cursor: nesw-resize

.resize-nw
    top: 0
    left: 0
    cursor: nwse-resize

.resize-se
    right: 0
    bottom: 0
    cursor: nwse-resize

.resize-sw
    left: 0
    bottom: 0
    cursor: nesw-resize

.hud-settings
    background: #FFFFFF
    color: #1C1B1F
    border-left: 1px solid #E7E0EC
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1)

.hud-settings :deep(.v-list-item),
.hud-settings :deep(.v-list-subheader),
.hud-settings :deep(.v-label)
    color: #49454F !important

.hud-settings :deep(.v-switch),
.hud-settings :deep(.v-slider)
    color: #1C1B1F

.hud-settings :deep(.v-btn)
    border-radius: 999px
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)

    &:hover
        transform: translateY(-1px)

.hud-settings :deep(.v-list)
    background: transparent !important

.hud-settings :deep(.v-list-subheader)
    color: #6750A4 !important
    font-weight: 500

.hud-settings :deep(.v-btn-toggle)
    border-radius: 12px
    overflow: hidden

.settings-header
    padding: 24px 24px 16px
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px
    border-bottom: 1px solid #E7E0EC
    background: #F8F7FC

.settings-title
    font-size: 20px
    font-weight: 500
    color: #1C1B1F

.settings-subtitle
    font-size: 13px
    color: #49454F
    margin-top: 4px

.settings-footer
    padding: 20px 24px 28px
    font-size: 13px
    color: #49454F
    border-top: 1px solid #E7E0EC
    margin-top: 16px
    background: #F8F7FC

.settings-actions
    display: flex
    gap: 12px
    padding: 0 24px 24px

.shortcut-title
    font-weight: 500
    margin-bottom: 10px
    color: #1C1B1F

.shortcut-row
    line-height: 1.7
    color: #49454F
    font-size: 13px

// Widget 背景效果 - 支持遮罩和模糊两种模式
.hud-widget
    border-radius: 12px
    overflow: hidden

    &::before
        content: ''
        position: absolute
        inset: 0
        z-index: 0
        pointer-events: none
        border-radius: inherit
        transition: all 0.3s ease

    &::after
        content: ''
        position: absolute
        inset: 0
        z-index: 0
        pointer-events: none
        border-radius: inherit

.hud-widget > *
    position: relative
    z-index: 1

// 全局遮罩
.hud-layer
    &.editing, &.performance-mode, &.compact, &.minimal, &.hide-cursor
        // no-op, keep for specificity

// 全局遮罩模式
.hud-layer
    &.mask-mode
        .hud-widget::before
            background: rgba(0, 0, 0, var(--hud-opacity, 0.78))
        .hud-widget::after
            display: none

    &.blur-mode
        .hud-widget::before
            background: rgba(0, 0, 0, 0.25)
        .hud-widget::after
            backdrop-filter: blur(var(--hud-blur, 12px))
            -webkit-backdrop-filter: blur(var(--hud-blur, 12px))
            background: rgba(255, 255, 255, 0.08)

// 单独组件背景覆盖
.hud-widget.bg-mask::before
    background: rgba(0, 0, 0, var(--widget-mask-opacity, var(--hud-opacity, 0.78))) !important

.hud-widget.bg-mask::after
    display: none !important

.hud-widget.bg-blur::before
    background: rgba(0, 0, 0, 0.25) !important

.hud-widget.bg-blur::after
    backdrop-filter: blur(var(--widget-blur, var(--hud-blur, 12px))) !important
    -webkit-backdrop-filter: blur(var(--widget-blur, var(--hud-blur, 12px))) !important
    background: rgba(255, 255, 255, 0.08) !important

// 网格 - 修复显示bug，仅在编辑模式下显示
.hud-grid
    position: absolute
    inset: 0
    background-image: linear-gradient(rgba(103, 80, 164, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 80, 164, 0.4) 1px, transparent 1px)
    background-size: var(--hud-grid, 24px) var(--hud-grid, 24px)
    z-index: 100
    pointer-events: none
    opacity: 0.8
    animation: gridFadeIn 0.3s ease-out

@keyframes gridFadeIn
    from
        opacity: 0
    to
        opacity: 0.8


.hud-grid::after
    content: ''
    position: absolute
    inset: 0
    background-image: linear-gradient(rgba(0, 255, 255, 0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.55) 1px, transparent 1px)
            locked: false,

.hud-crosshair
    position: absolute
    left: 50%
    top: 50%
    width: 42px
    height: 42px
    transform: translate(-50%, -50%)
    z-index: 2
    pointer-events: none

.crosshair-line
    position: absolute
    background: rgba(255, 255, 255, 0.7)

.crosshair-line.horizontal
    left: 0
    top: 50%
    width: 100%
    height: 2px
    transform: translateY(-50%)

.crosshair-line.vertical
    top: 0
    left: 50%
    height: 100%
    width: 2px
    transform: translateX(-50%)

.crosshair-dot
    position: absolute
    left: 50%
    top: 50%
    width: 6px
    height: 6px
    border-radius: 50%
    background: rgba(255, 255, 255, 0.8)
    transform: translate(-50%, -50%)

.hud-fps
    position: absolute
    right: 20px
    bottom: 20px
    padding: 4px 8px
    border-radius: 8px
    background: rgba(0, 0, 0, 0.45)
    color: rgba(255, 255, 255, 0.9)
    font-size: 12px
    z-index: 2

// 右键菜单样式
.widget-context-menu
    position: fixed
    z-index: 1000
    min-width: 280px
    max-width: 320px
    background: #FFFFFF !important
    border-radius: 16px !important
    border: 1px solid #E7E0EC
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important
    pointer-events: auto !important
    user-select: text

.menu-title
    font-size: 16px !important
    font-weight: 500
    padding: 16px 20px !important
    color: #1C1B1F

.menu-content
    padding: 16px 20px !important

.menu-section
    margin-bottom: 16px

    &:last-child
        margin-bottom: 0

.menu-label
    font-size: 13px
    font-weight: 500
    color: #49454F
    margin-bottom: 8px

.menu-toggle
    width: 100%
    border-radius: 12px
    overflow: hidden

    :deep(.v-btn)
        flex: 1
        border-radius: 0 !important

.menu-actions
    padding: 12px 16px !important

// 菜单背景遮罩
.menu-backdrop
    position: fixed
    inset: 0
    z-index: 999
    background: transparent

// 单独组件自定义背景样式
.hud-widget::before
    background: rgba(0, 0, 0, var(--hud-opacity, 0.78))
</style>

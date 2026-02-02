<template>
    <div
        ref="containerRef"
        class="hud-layer"
        :class="{
            editing: settings.editMode,
            'show-grid': settings.showGrid,
            'performance-mode': settings.performanceMode,
            compact: settings.compactHeader,
            minimal: props.minimal,
            'hide-cursor': appSettings.hideCursor && !props.enableEdit,
        }"
        :style="{
            '--hud-opacity': settings.hudOpacity.toString(),
            '--hud-font-scale': settings.fontScale.toString(),
            '--hud-grid': settings.gridSize + 'px',
        }"
    >
        <div v-if="props.showToolbar" class="hud-toolbar">
            <v-btn
                color="primary"
                variant="tonal"
                size="small"
                :prepend-icon="settings.editMode ? 'mdi-pencil' : 'mdi-pencil-off'"
                @click="toggleEditMode"
            >
                HUD 编辑模式
            </v-btn>
            <v-btn
                color="secondary"
                variant="tonal"
                size="small"
                prepend-icon="mdi-tune-variant"
                @click="showSettings = true"
            >
                HUD 设置
            </v-btn>
            <v-btn
                color="info"
                variant="tonal"
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
            :class="{ active: activeWidgetId === widget.id, locked: widget.locked }"
            :style="widgetStyle(widget)"
        >
            <div
                v-if="!props.minimal"
                class="hud-header"
                :class="{ dragging: dragState?.id === widget.id }"
                @pointerdown="startDrag(widget, $event)"
            >
                <span class="hud-title">{{ widget.title }}</span>
                <span v-if="settings.showDemoBadge" class="demo-badge">DEMO</span>
                <div class="hud-header-actions">
                    <v-btn
                        icon="mdi-arrow-up-bold"
                        size="x-small"
                        variant="text"
                        :disabled="widget.locked || !settings.editMode"
                        @click.stop="bringToFront(widget.id)"
                    />
                    <v-btn
                        icon="mdi-lock"
                        size="x-small"
                        variant="text"
                        :color="widget.locked ? 'warning' : undefined"
                        @click.stop="toggleLock(widget.id)"
                    />
                    <v-btn
                        icon="mdi-eye-off"
                        size="x-small"
                        variant="text"
                        @click.stop="toggleWidget(widget.id)"
                    />
                </div>
            </div>
            <div class="hud-body">
                <component :is="widget.component" v-bind="widget.props" />
            </div>
            <div
                v-if="props.enableEdit"
                class="resize-handle"
                @pointerdown="startResize(widget, $event)"
            ></div>
        </div>

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
                        v-model="settings.showGrid"
                        label="显示网格"
                        inset
                    />
                </v-list-item>
                <v-list-item>
                    <v-switch
                        v-model="settings.snapToGrid"
                        label="吸附网格"
                        inset
                    />
                </v-list-item>
                <v-list-item>
                    <v-slider
                        v-model="settings.gridSize"
                        :min="8"
                        :max="64"
                        :step="4"
                        label="网格尺寸"
                        hide-details
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
                <v-list-subheader>视觉</v-list-subheader>
                <v-list-item>
                    <v-slider
                        v-model="settings.hudOpacity"
                        :min="0.5"
                        :max="1"
                        :step="0.05"
                        label="HUD 遮罩透明度"
                        hide-details
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
import { markRaw, onMounted, onUnmounted, reactive, ref, computed, watch, provide } from 'vue';
import HUDTopBar from './HUDTopBar.vue';
import StatusPanel from './StatusPanel.vue';
import AmmoCounter from './AmmoCounter.vue';
import Minimap from './Minimap.vue';
import ModuleStatus from './ModuleStatus.vue';
import EventLog from './EventLog.vue';
import BuffList from './BuffList.vue';
import ControlHints from './ControlHints.vue';
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
        minimal: true,
    }
);

type WidgetComponent = typeof HUDTopBar;

interface HudWidget {
    id: string;
    title: string;
    component: WidgetComponent;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    minH: number;
    visible: boolean;
    locked: boolean;
    z: number;
    props?: Record<string, unknown>;
}

interface HudSettings {
    autosave: boolean;
    editMode: boolean;
    showGrid: boolean;
    snapToGrid: boolean;
    gridSize: number;
    compactHeader: boolean;
    showDemoBadge: boolean;
    hudOpacity: number;
    fontScale: number;
    performanceMode: boolean;
    demoMode: boolean;
}

interface DragState {
    id: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
}

interface ResizeState {
    id: string;
    startX: number;
    startY: number;
    originW: number;
    originH: number;
}

const containerRef = ref<HTMLDivElement | null>(null);
const containerSize = reactive({ width: 1920, height: 1080 });
const showSettings = ref(false);
const activeWidgetId = ref<string | null>(null);
const dragState = ref<DragState | null>(null);
const resizeState = ref<ResizeState | null>(null);
const rafId = ref<number | null>(null);

const settings = reactive<HudSettings>({
    autosave: true,
    editMode: false,
    showGrid: false,
    snapToGrid: true,
    gridSize: 24,
    compactHeader: false,
    showDemoBadge: false,
    hudOpacity: 0.78,
    fontScale: 1,
    performanceMode: false,
    demoMode: true,
});

const demoMode = computed(() => settings.demoMode);
provide('hudDemoMode', demoMode);

const APP_SETTINGS_KEY = 'rm-app-settings';
const appSettings = reactive({
    hideCursor: true,
    showCrosshair: true,
    showFps: false,
    showNotifications: true,
});
const loadAppSettings = () => {
    try {
        const raw = localStorage.getItem(APP_SETTINGS_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        Object.assign(appSettings, parsed);
    } catch (error) {
        console.warn('App settings load failed:', error);
    }
};
loadAppSettings();
const showCrosshair = computed(() => appSettings.showCrosshair);
const showFps = computed(() => appSettings.showFps);
const showNotifications = computed(() => appSettings.showNotifications);
provide('hudShowNotifications', showNotifications);

const fpsValue = ref(0);
let fpsFrame = 0;
let fpsLast = performance.now();
const updateFps = () => {
    fpsFrame += 1;
    const now = performance.now();
    if (now - fpsLast >= 500) {
        fpsValue.value = Math.round((fpsFrame * 1000) / (now - fpsLast));
        fpsFrame = 0;
        fpsLast = now;
    }
    if (showFps.value) {
        requestAnimationFrame(updateFps);
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
            id: 'status-panel',
            title: '本车状态',
            component: markRaw(StatusPanel),
            x: leftColumnX,
            y: 640,
            w: 360,
            h: 230,
            minW: 280,
            minH: 180,
            visible: true,
            locked: false,
            z: 4,
        },
        {
            id: 'event-log',
            title: '赛事事件',
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
            title: '增益状态',
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
    ];
};

const widgets = ref<HudWidget[]>(defaultWidgets());

const visibleWidgets = computed(() =>
    widgets.value.filter((widget) => widget.visible)
);

const loadLayout = () => {
    const parsed = loadHudLayout();
    if (!parsed || !parsed.length) return false;
    widgets.value = parsed.map((item) => ({
        ...item,
        component: widgetComponentById(item.id),
    }));
    return true;
};

const loadSettings = () => {
    const parsed = loadHudSettings();
    if (!parsed) return;
    Object.assign(settings, parsed);
};

const saveLayout = (force = false) => {
    if (!settings.autosave && !force) return;
    const serialized: StoredHudWidget[] = widgets.value.map((widget) => ({
        ...widget,
        component: undefined,
    }));
    saveHudLayout(serialized);
};

const saveSettings = (force = false) => {
    if (!settings.autosave && !force) return;
    saveHudSettings(settings as StoredHudSettings);
};

const widgetComponentById = (id: string): WidgetComponent => {
    switch (id) {
        case 'top-bar':
            return markRaw(HUDTopBar);
        case 'status-panel':
            return markRaw(StatusPanel);
        case 'ammo-counter':
            return markRaw(AmmoCounter);
        case 'minimap':
            return markRaw(Minimap);
        case 'module-status':
            return markRaw(ModuleStatus);
        case 'event-log':
            return markRaw(EventLog);
        case 'buff-list':
            return markRaw(BuffList);
        case 'control-hints':
            return markRaw(ControlHints);
        default:
            return markRaw(StatusPanel);
    }
};

const updateContainerSize = () => {
    if (!containerRef.value) return;
    const rect = containerRef.value.getBoundingClientRect();
    containerSize.width = rect.width;
    containerSize.height = rect.height;
    normalizeLayout();
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const normalizeLayout = () => {
    widgets.value = widgets.value.map((widget) => {
        const width = clamp(widget.w, widget.minW, Math.max(widget.minW, containerSize.width - widget.x));
        const height = clamp(widget.h, widget.minH, Math.max(widget.minH, containerSize.height - widget.y));
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
});

const startDrag = (widget: HudWidget, event: PointerEvent) => {
    if (!props.enableEdit || !settings.editMode || widget.locked) return;
    if (event.button !== 0) return;
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

const startResize = (widget: HudWidget, event: PointerEvent) => {
    if (!props.enableEdit || !settings.editMode || widget.locked) return;
    if (event.button !== 0) return;
    activeWidgetId.value = widget.id;
    resizeState.value = {
        id: widget.id,
        startX: event.clientX,
        startY: event.clientY,
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
            const nextW = snapValue(resizeState.value.originW + dx);
            const nextH = snapValue(resizeState.value.originH + dy);
            widget.w = clamp(nextW, widget.minW, containerSize.width - widget.x);
            widget.h = clamp(nextH, widget.minH, containerSize.height - widget.y);
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
    const widget = widgets.value.find((item) => item.id === id);
    if (!widget) return;
    const maxZ = Math.max(...widgets.value.map((item) => item.z));
    widget.z = maxZ + 1;
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

watch(
    () => showFps.value,
    (next) => {
        if (next) {
            fpsFrame = 0;
            fpsLast = performance.now();
            requestAnimationFrame(updateFps);
        }
    }
);

onMounted(() => {
    updateContainerSize();
    const loaded = loadLayout();
    loadSettings();
    showSettings.value = false;
    if (!props.enableEdit) {
        settings.editMode = false;
        settings.showGrid = false;
    }
    if (loaded) {
        normalizeLayout();
    } else {
        widgets.value = defaultWidgets(containerSize.width, containerSize.height);
    }
    if (showFps.value) {
        requestAnimationFrame(updateFps);
    }
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
    overflow: hidden
    transition: border-color var(--md-duration-short4) var(--md-easing-standard)
    pointer-events: auto

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
    padding: 14px

.resize-handle
    position: absolute
    right: 4px
    bottom: 4px
    width: 14px
    height: 14px
    background: rgba(255, 255, 255, 0.2)
    border-radius: 4px
    cursor: se-resize
    pointer-events: auto

    .hud-layer.editing &
        display: block

    .hud-layer:not(.editing) &
        display: none

.hud-settings
    background: rgba(18, 18, 22, 0.96)
    color: var(--hud-text-primary)
    backdrop-filter: blur(12px)

.hud-settings :deep(.v-list-item),
.hud-settings :deep(.v-list-subheader),
.hud-settings :deep(.v-label)
    color: rgba(255, 255, 255, 0.82)

.hud-settings :deep(.v-switch),
.hud-settings :deep(.v-slider)
    color: rgba(255, 255, 255, 0.9)

.settings-header
    padding: 20px 20px 10px
    display: flex
    align-items: center
    justify-content: space-between
    gap: 12px

.settings-title
    font-size: 18px
    font-weight: 600

.settings-subtitle
    font-size: 12px
    color: var(--hud-text-secondary)

.settings-footer
    padding: 16px 20px 24px
    font-size: 12px
    color: var(--hud-text-secondary)

.settings-actions
    display: flex
    gap: 12px
    padding: 0 20px 20px

.shortcut-title
    font-weight: 600
    margin-bottom: 8px

.shortcut-row
    line-height: 1.6

.hud-widget::before
    content: ''
    position: absolute
    inset: 0
    background: rgba(0, 0, 0, var(--hud-local-opacity))
    z-index: 0
    pointer-events: none

.hud-widget > *
    position: relative
    z-index: 1

.hud-grid
    position: absolute
    inset: 0
    background-image: linear-gradient(rgba(0, 255, 255, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.35) 1px, transparent 1px)
    background-size: var(--hud-grid) var(--hud-grid)
    z-index: 2
    pointer-events: none
    opacity: 0.9

.hud-grid::after
    content: ''
    position: absolute
    inset: 0
    background-image: linear-gradient(rgba(0, 255, 255, 0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.55) 1px, transparent 1px)
    background-size: calc(var(--hud-grid) * 5) calc(var(--hud-grid) * 5)

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
</style>

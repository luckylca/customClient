# RoboMaster 客户端 HUD 系统文档

## 系统概述

这是一个用于 RoboMaster 机器人操控的客户端应用，基于 Vue 3 + Vuetify + Electron 构建。核心功能是提供可自定义的 HUD（抬头显示）界面，用于实时显示机器人状态、比赛信息等。

---

## 项目结构

```
src/
├── components/hud/          # HUD 组件
│   ├── HUDContainer.vue     # 主容器，管理所有 widget
│   ├── HUDTopBar.vue        # 顶部状态栏（比赛时间等）
│   ├── StatusPanel.vue      # 本车状态（血量、功率等）
│   ├── AmmoCounter.vue      # 弹药/热量计数器
│   ├── ModuleStatus.vue     # 模块状态（主控、图传等）
│   ├── Minimap.vue          # 小地图
│   ├── EventLog.vue         # 事件日志
│   ├── BuffList.vue         # Buff 列表
│   ├── ControlHints.vue     # 操作提示
│   └── useHudDemo.ts        # 演示数据定时器
├── views/
│   ├── setting/index.vue    # 设置页面
│   └── layout/index.vue     # 机甲选择页面
├── stores/                  # Pinia 状态管理
│   ├── robotData.ts         # 机器人数据
│   ├── globalData.ts        # 全局数据
│   └── hudStore.ts          # HUD 布局和设置 (持久化)
└── assets/
    └── md3-theme.css        # Material Design 3 主题变量
```

---

## HUD 组件详解

### HUDContainer.vue（核心容器）

**主要功能：**
- 管理所有 widget 的位置、大小、可见性
- 提供编辑模式，支持拖拽和调整大小
- 全局设置面板（背景模式、透明度等）
- 右键菜单单独组件自定义

**关键 CSS 变量：**

```css
--hud-opacity: 0.78;           /* 全局遮罩透明度 */
--hud-blur: 12px;              /* 全局模糊程度 */
--hud-widget-opacity: 1.0;     /* 组件整体透明度 */
--hud-font-scale: 1;           /* 字体缩放 */
--widget-opacity: inherit;     /* 单组件透明度（覆盖） */
--widget-mask-opacity: inherit;/* 单组件遮罩透明度 */
--widget-blur: inherit;        /* 单组件模糊程度 */
```

### 设置面板选项说明

| 设置项 | 作用 |
|--------|------|
| 编辑模式 | 开启后可拖拽调整组件位置 |
| 标题栏紧凑 | 减小组件标题栏高度 |
| 背景模式 | 选择遮罩（黑色半透明）或模糊（高斯模糊） |
| 遮罩透明度 | 控制黑色遮罩的不透明度 |
| 模糊程度 | 控制高斯模糊的强度 |
| 组件透明度 | 控制所有组件的整体透明度 |
| 文字缩放 | 调整 HUD 字体大小 |
| 演示数据 | 开启后显示模拟数据（无真实数据时自动启用） |

---

## 自定义样式指南

### 修改全局主题颜色

编辑 `src/main.ts` 中的 Vuetify 主题配置：

```typescript
themes: {
    md3Bright: {
        colors: {
            primary: '#6750A4',      // 主色调
            background: '#F8F7FC',   // 背景色
            surface: '#FFFFFF',      // 表面色
            // ...
        }
    }
}
```

### 修改 HUD 组件样式

**方法 1：全局 CSS 变量**

在 `src/assets/md3-theme.css` 中定义：

```css
:root {
    --md-primary: #6750A4;
    --md-radius-lg: 18px;
    --hud-text-primary: rgba(255, 255, 255, 0.95);
}
```

**方法 2：组件内样式**

在 `HUDContainer.vue` 的 `<style>` 部分修改：

```sass
.hud-widget
    border-radius: 12px
    border: 1px solid rgba(255, 255, 255, 0.18)

.hud-header
    padding: 10px 12px
    font-size: 11px
```

**方法 3：单组件自定义**

使用右键菜单为单个组件设置独立样式，这会生成：

```sass
.hud-widget.bg-mask::before
    background: rgba(0, 0, 0, var(--widget-mask-opacity))

.hud-widget.bg-blur::after
    backdrop-filter: blur(var(--widget-blur))
```

---

## 布局持久化

布局和设置保存在 localStorage：

```
rm-hud-layout-infantry   // 组件位置、大小
rm-hud-settings-infantry // 全局设置
```

**手动重置布局：**
在浏览器控制台执行：
```javascript
localStorage.removeItem('rm-hud-layout-infantry');
localStorage.removeItem('rm-hud-settings-infantry');
location.reload();
```

---

## 数据流说明

```
Electron/IPC
    ↓
stores/robotData.ts (Pinia Store)
    ↓
inject/provide 或 store 引用
    ↓
HUD 组件 (StatusPanel, AmmoCounter, etc.)
```

**演示数据逻辑：**
```typescript
const useDemo = computed(() => demoMode.value || !hasData.value);
```
- 开启演示模式 → 显示模拟数据
- 没有真实数据 → 自动显示模拟数据

---

## 快捷键

| 按键 | 功能 |
|------|------|
| E | 切换编辑模式 |
| G | 切换网格显示 |
| Delete | 隐藏选中组件 |
| Esc | 退出编辑/关闭菜单 |

---

## 常见问题

**Q: 组件位置异常/挤在一起？**  
A: 删除 localStorage 中的布局数据后刷新页面。

**Q: 右键菜单无法使用？**  
A: 需要先开启"编辑模式"。

**Q: 关闭演示数据后仍有数据显示？**  
A: 这是正常行为 - 没有真实数据时会自动显示演示数据。

**Q: 如何添加新的 HUD 组件？**  
1. 在 `components/hud/` 创建新组件
2. 在 `HUDContainer.vue` 中导入并添加到 `defaultWidgets()`
3. 在 `widgetComponentById()` 中添加映射

---

## 技术栈

- **Vue 3** - 响应式框架
- **Vuetify 3** - UI 组件库
- **Pinia** - 状态管理
- **Electron** - 桌面应用框架
- **TypeScript** - 类型安全
- **SASS** - CSS 预处理器

# 步兵 UI Demo 说明文档

本文件描述 `src/views/infantryFirst/index.vue` 中的步兵 HUD Demo：组件切换、拖拽/缩放、性能优化与设置项。所有交互操作与代码路径都在本文说明，便于你继续扩展。

---

## 1. 功能概览

- 图传作为背景层，HUD 作为前景层
- HUD 组件可显示/隐藏
- HUD 组件可拖拽、可缩放、支持网格吸附
- 设置中心包含布局、视觉与性能选项
- 布局与设置自动持久化到 `localStorage`

主入口视图：
- `src/views/infantryFirst/index.vue`
- `src/views/infantrySecond/index.vue`
- `src/views/infantryThird/index.vue`

HUD 核心容器：
- `src/components/hud/HUDContainer.vue`

---

## 2. 启动与进入方式

1. 运行项目进入选择界面
2. 选择「步兵1/步兵2/步兵3」
3. 进入 Demo HUD

视图结构如下：

```
<imageTransmission />  // 图传画布
<HUDContainer />       // HUD 组件层（步兵界面默认极简模式）
<escMenu />            // ESC 菜单
```

---

## 3. 操作说明（键盘 / 鼠标）

### 键盘快捷键

- `ESC`：打开比赛菜单（进入设置页）
- `Ctrl + E`：切换 HUD 编辑模式（设置页中）
- `Ctrl + S`：打开 HUD 设置（设置页中）
- `Ctrl + R`：重置 HUD 布局（设置页中）
- `Ctrl + G`：显示 / 隐藏网格（设置页中）

### 鼠标交互

在 **设置页面的编辑模式** 下：

- 拖动组件标题栏 → 移动组件
- 拖动右下角角标 → 调整组件大小
- 点击标题栏按钮 → 锁定/解锁、隐藏、置顶

---

## 4. HUD 组件清单与数据绑定

下面列出 Demo 中的组件与主要数据来源。

1. **比赛状态条**  
   - 文件：`src/components/hud/HUDTopBar.vue`
   - 数据来源：
     - `global.GameStatusData`（比分、阶段、倒计时）
     - `robot.color`, `robot.type`, `robot.id`

2. **本车状态**  
   - 文件：`src/components/hud/StatusPanel.vue`
   - 数据来源：
     - `RobotDynamicStatusData.current_health`
     - `RobotStaticStatusData.max_health`
     - `RobotDynamicStatusData.current_chassis_energy`
     - `RobotStaticStatusData.max_chassis_energy`
     - `RobotDynamicStatusData.current_buffer_energy`
     - `RobotStaticStatusData.max_buffer_energy`

3. **弹药 / 热量**  
   - 文件：`src/components/hud/AmmoCounter.vue`
   - 数据来源：
     - `RobotDynamicStatusData.remaining_ammo`
     - `RobotDynamicStatusData.total_projectiles_fired`
     - `RobotDynamicStatusData.current_heat`
     - `RobotStaticStatusData.max_heat`
     - `RobotDynamicStatusData.last_projectile_fire_rate`

4. **小地图**  
   - 文件：`src/components/hud/Minimap.vue`
   - 数据来源：
     - `RobotPositionData.x / y / yaw`

5. **模块状态**  
   - 文件：`src/components/hud/ModuleStatus.vue`
   - 数据来源：
     - `RobotModuleStatusData.*`

6. **赛事事件**  
   - 文件：`src/components/hud/EventLog.vue`
   - 数据来源：
     - `global.EnventData`

7. **增益状态**  
   - 文件：`src/components/hud/BuffList.vue`
   - 数据来源：
     - `robot.BuffData`

8. **操作提示**  
   - 文件：`src/components/hud/ControlHints.vue`
   - 数据来源：无（静态提示文本）

---

## 5. HUD 设置项详解

设置中心（路由 `setting` 页面）提供以下选项：

### 布局类
- 编辑模式：开启拖拽/缩放
- 显示网格：显示网格辅助线
- 吸附网格：移动时对齐网格
- 网格尺寸：8~64px
- 紧凑标题栏：减少标题栏高度
- 显示 DEMO 标记：展示角标

### 视觉类
- HUD 透明度：0.5~1.0
- 玻璃模糊：0~24px
- 文字缩放：0.85~1.25

### 性能类
- 性能模式：关闭阴影与模糊，降低 GPU 压力
- 演示数据：无真实数据时展示模拟数据（建议 UI 调试时开启）

### 组件显示
- 每个组件单独开关

所有设置会保存在：
- `localStorage["rm-hud-settings-infantry"]`
- `localStorage["rm-hud-layout-infantry"]`

---

## 6. 性能优化说明

以下设计用于保证渲染流畅：

- 拖拽/缩放通过 `requestAnimationFrame` 合并更新
- 布局使用 `transform: translate3d(...)` 减少布局抖动
- 性能模式下禁用 `box-shadow` 与 `backdrop-filter`
- 布局与设置存储为轻量 JSON

---

## 7. 布局导入 / 导出

在设置页右侧面板可导出/导入布局 JSON：

- 导出：将当前布局与设置序列化为 JSON
- 导入：粘贴 JSON 并应用（自动刷新预览）

---

## 8. 如何新增一个 HUD 组件

1. 新建组件  
   示例路径：`src/components/hud/MyWidget.vue`

2. 在 `HUDContainer.vue` 中注册  
   - 在顶部 import 组件  
   - 在 `defaultWidgets()` 中加入一项  
   - 在 `widgetComponentById()` 中添加映射  

3. 可选：为组件添加数据绑定  
   - 从 `useGlobalStore` 或 `useRobotStore` 获取数据  

---

## 9. 已使用的数据结构说明

数据结构位于：
- `src/types/rmType.ts`

数据分发位于：
- `src/stores/robotData.ts`
- `src/stores/globalData.ts`

这些数据通常由 MQTT 或 IPC 进入页面。更详细字段解释请参考协议 PDF：
- `RoboMaster 2026 机甲大师高校系列赛通信协议 V1.1.0（20251217）.pdf`

---

## 10. 常见问题排查

**Q: HUD 不可拖拽？**  
A: 确认是否开启了「编辑模式」，或者组件是否被锁定。

**Q: 组件消失了？**  
A: 在「HUD 设置 -> 组件显示」中重新开启，或使用 `Ctrl+R` 重置布局。

**Q: 帧率降低明显？**  
A: 开启「性能模式」，降低模糊与阴影。

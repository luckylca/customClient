# HUD 组件快速模板

你可以直接复制 [src/components/hud/HUDWidgetTemplate.vue](../src/components/hud/HUDWidgetTemplate.vue) 来快速做临时组件。

## 1. 复制模板

- 复制为你自己的文件，例如：`src/components/hud/MyQuickPanel.vue`

## 2. 注册到 HUD 容器

编辑 `src/components/hud/HUDContainer.vue`：

1. 在顶部 import：

```ts
import MyQuickPanel from './MyQuickPanel.vue';
```

2. 在 `widgetComponentById` 里添加映射：

```ts
case 'my-quick-panel':
    return markRaw(MyQuickPanel);
```

3. 在 `defaultWidgets()` 返回数组中新增一个配置：

```ts
{
    id: 'my-quick-panel',
    title: '临时数据面板',
    component: markRaw(MyQuickPanel),
    x: 40,
    y: 260,
    w: 320,
    h: 180,
    minW: 220,
    minH: 120,
    visible: true,
    locked: false,
    z: 3,
}
```

## 3. 如果旧布局看不到新组件

本地布局是持久化的，旧布局不会自动出现新组件。可选方案：

- HUD 编辑页点击“重置布局”
- 或清除 `localStorage` 的 HUD 布局键后刷新

## 4. 数据来源建议

- 机器人数据：`useRobotStore().robot`
- 全局数据：`useGlobalStore().global`
- 演示模式：通过 `inject('hudDemoMode', ...)` + `useHudDemoTicker()`

## 5. 背景图适配（透明 / 遮罩 / 模糊）

`HUDWidgetTemplate.vue` 已支持背景模式参数，默认是 `inherit`，会继承 `HUDContainer` 的背景效果。

- `backgroundMode: 'inherit'`：继承外层 HUD 背景（推荐默认）
- `backgroundMode: 'transparent'`：模板内部不加任何背景
- `backgroundMode: 'mask'`：模板内部添加黑色遮罩
- `backgroundMode: 'blur'`：模板内部添加模糊层

可选参数：

- `backgroundOpacity`：遮罩透明度（仅 `mask` 有效）
- `blurIntensity`：模糊强度（仅 `blur` 有效）

示例：

```vue
<MyQuickPanel
    title-text="临时状态"
    source-tag="Quick"
    background-mode="blur"
    :blur-intensity="12"
/>
```

说明：如果组件已经放在 `HUDContainer` 的 `.hud-widget` 内，通常用 `inherit` 即可；只有你想让某个模板内部背景和外层不同，才需要切换成 `mask` 或 `blur`。

# RoboMaster 2026 自定义客户端 (Custom Client)

本项目是基于 Electron + Vite + Vue 3 + Vuetify 深度开发的一款高度可定制、低延迟的 RoboMaster 2026 机甲大师赛自定义客户端。全面支持 MQTT + Protobuf 协议控制体系、自定义分片 UDP 视频图传，以及多兵种可随意拖拽的响应式 HUD（抬头显示）系统。

## 核心特性

- **现代前端架构**：采用 Vue 3 (Composition API) + Pinia 全局状态管理 + Vuetify (Material Design 3) UI 框架，兼顾性能与现代化视觉。
- **自定义 HUD 系统**：内置编辑模式支持全组件拖拽、缩放、透明度及背景自适应设置；组件级独立美化与布局持久化缓存，满足不同操作手独特习惯。
- **多兵种专属视图**：按比赛真实需求划分视图，可以切换步兵、英雄、工程、空中机器人等专属战术面板，不过暂时只适配了英雄。
- **支持按键自定义**：支持全键盘按键自定义功能，可以实现一键买弹等多种功能。
- **高并发图传与 Worker 编解码**：基于 UDP 收发并拥有独立的 `customVideoParser.worker.ts` 分担主线程压力，流畅实现 H.265/H.264 画面的软/硬解码及拼接。
- **动态模拟(Demo)模式**：即使离线未链接真实赛场环境，HUD 仍支持自动化注入呼吸数据流，便于 UI 排版调试与二次开发展示。

## 快速开始

### 1. 环境准备

确保已安装：
- **Node.js**: v18+ (建议 v20 或 v22)
- **npm**: 随 Node.js 安装

### 2. 安装依赖并运行

```bash
# 1. 安装核心依赖
npm install --legacy-peer-deps

# 2. 启动本地开发环境 (自动启动 Vite 服务器与 Electron 并发调试)
npm run dev

# 3. 生产环境编译打包 (输出至 release/ 目录)
npm run build
```

> **注意**: 如果在开发期间修改了 `vite.config.ts`、`src/background.ts` 或涉及 Electron 层的后台逻辑，建议重启 `npm run dev` 以重新加载主进程。

## 目录结构

```
├── src/
│   ├── background.ts      # Electron 主进程入口：初始化 MQTT 核心和 UDP 图传进程
│   ├── components/hud/    #  HUD 挂载组件库 (状态条、能量圈等)
│   ├── plugins/           # Vite 针对 Electron 的构建及热更新辅助脚本
│   ├── proto/             # Protocol Buffers (rm.proto) 及生成的编译解析体
│   ├── services/          # 后台常驻服务调度层 (MQTT、自动任务、键鼠抓取及图传拼接)
│   ├── stores/            # Pinia 状态树 (状态池：robotData, globalData, videoStats 等)
│   ├── types/             # 预编排好的全量 Typescript 协议接口集 (核心必备)
│   ├── views/             # 各类机种的挂载路由入口 (drone/, engineer/, hero/, infantry/...)
│   └── workers/           # 图传解帧等消耗性能运算的 Web Worker 子线程
├── docs/                  # 延展性说明文档与 UI 模版设计规范
```

## 进阶开发指南

1. **修改 HUD、重绘组件或了解布局怎么保存的** 
   在 **[HUD_SYSTEM_DOCS.md](./HUD_SYSTEM_DOCS.md)** **[HUD_COMPONENT_TEMPLATE.md](./docs/HUD_COMPONENT_TEMPLATE.md)** 
   里面包含了 CSS 变量覆写、Vuetify 主题定义及新建挂载组件的流程。
   
2. 关于CustomByBlock字段

   目前我们的CustomByBlock协议格式是

   | 偏移    | 长度 | 字段                               |
   | ------- | ---- | ---------------------------------- |
   | 0-1     | 2B   | 帧头 `0xA8 0xA7`                   |
   | 2-3     | 2B   | 序号 (uint16 LE)                   |
   | 4-294   | 291B | H264 视频码流切片                  |
   | 295-299 | 5B   | 电控侧带数据 (LobShotReservedPack) |

​        其中电控侧带数据是 

| 偏移               | 字节 | 解析方式              | 含义                                                   |
| ------------------ | ---- | --------------------- | ------------------------------------------------------ |
| 295 (Byte 0)       | 1B   | `raw[0]` → bit0~7     | 底盘+关节+云台 8个电机在线状态                         |
| 296 (Byte 1)       | 1B   | `raw[1]` → bit0~7     | 摩擦轮+拨盘 5个电机在线 + 摩擦轮/视觉/超电 3个模式开关 |
| 297 (Byte 2)       | 1B   | `raw[2]` → 每2bit一组 | jointMode / chassisMode / bulletSpeed / reserved1      |
| 298-299 (Byte 3-4) | 2B   | `raw[3]               | (raw[4]<<8)` → LE uint16（云台相对底盘角度）           |

调试的时候先关闭demo数据演示，然后再看血量或者机器人总览面板，有没有具体数据，就是相当于先看mqtt通信有没有成功，然后再按 ``1`` 来显示自定义图传的控制信息，看CustomByBlock的字段的内容。

# RoboMaster 自定义客户端 - 使用说明文档

本项目是基于 Electron + Vite + Vue 3 开发的 RoboMaster 2026 机甲大师赛自定义客户端。支持 MQTT + Protobuf 协议通信和 UDP 视频流接收。

## 1. 环境准备

确保已安装：
- **Node.js**: v18+ (建议 v20 或 v22)
- **npm**: 随 Node 安装

## 2. 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发环境
```bash
npm run dev
```
此命令会启动 Vite 开发服务器和 Electron 主进程。
> **注意**: 如果修改了 `vite.config.ts` 或 Electron 主进程代码，建议重启终端。

### 编译打包
```bash
npm run build
```
打包后的应用位于 `release/` 目录下。

## 3. 项目架构

### 核心目录
- **`src/background.ts`**: Electron 主进程入口，负责初始化 MQTT 和 视频流服务。
- **`src/services/`**:
  - `MqttService.ts`: 处理 MQTT 连接、订阅、发布和 Protobuf 序列化/反序列化。
  - `VideoHandler.ts`: 处理 UDP 视频流接收 (端口 3334) 和拼帧，通过 IPC 发送给渲染进程。
- **`src/proto/`**:
  - `rm.proto`: 原始 Protocol Buffers 定义文件。
  - `rm_pb.js` / `rm_pb.d.ts`: 自动生成的 JS/TS 代码。

### 通信架构
1. **MQTT (指令控制)**:
   - 服务器 IP: `192.168.12.1`
   - 端口: `3333`
   - 协议: MQTT over TCP
   - 数据格式: Protobuf v3 序列化二进制流
   - Topic: 对应消息类型名称 (如 `RemoteControl`, `GameStatus`)

2. **UDP (图传)**:
   - 监听端口: `3334`
   - 格式: 自定义分片协议 (8字节头 + HEVC流)
   - 拼帧后通过 Electron IPC (`video-frame`) 发送到 Vue 前端渲染。

## 4. 协议修改指南

### 修改步骤
如果比赛规则更新或需要新增自定义数据包：

1. **编辑 Proto 文件**:
   打开 `src/proto/rm.proto`，根据文档修改或添加 `message` 定义。

2. **重新生成代码**:
   运行以下命令生成新的 JS/TS 定义文件（需要安装 `protobufjs-cli` 等依赖，已包含在 `npm install` 中）：

   ```bash
   # 生成 ES6 模块的 JS 文件 (注意: 必须使用 -w es6)
   ./node_modules/.bin/pbjs -t static-module -w es6 -o src/proto/rm_pb.js src/proto/rm.proto

   # 生成 TypeScript 类型定义
   ./node_modules/.bin/pbts -o src/proto/rm_pb.d.ts src/proto/rm_pb.js
   ```

3. **修正导入路径 (重要)**:
   由于 Node.js ESM 的限制，生成的 `src/proto/rm_pb.js` 可能包含错误的导入语法。
   请手动检查文件头部：
   
   **错误**: 
   ```javascript
   import * as $protobuf from "protobufjs/minimal";
   ```
   
   **正确** (请手动修改):
   ```javascript
   import $protobuf from "protobufjs/minimal.js";
   ```
   *(注意 `.js` 后缀和 `import $protobuf` 而非 `import * as`)*

## 5. 常见问题排查

### `ERR_MODULE_NOT_FOUND` / Cannot find module ...
**原因**: 项目使用了 ESM (`"type": "module"`), 但生成的代码或依赖使用了 CommonJS 风格或省略了文件扩展名。
**解决**: 确保 `src/proto/rm_pb.js` 中的导入包含 `.js` 后缀。

### `Dynamic require of "stream" is not supported`
**原因**:构建工具 (Vite/Rollup) 尝试将 Node.js 核心模块或 MQTT 库打包到 bundle 中。
**解决**: `vite.config.ts` 已配置为在构建和开发模式下 **排除 (Externalize)** 所有依赖。如果再次遇到，请检查 `vite.config.ts` 中的 `dependencies` 是否正确读取。

### 连接不上 MQTT Broker
**现象**: 控制台打印 `MQTT connection error`。
**解决**: 检查电脑是否连接到比赛服务器网络 (192.168.12.x 网段)，并确认防火墙未通过 3333 端口。本地开发时这是正常现象。

## 6. 协议发送频率规范

根据《RoboMaster 2026 机甲大师高校系列赛通信协议 V1.1.0》，指令发送/接收建议频率如下：

### 高频指令 (> 5Hz)
| 指令名称 | 频率 | 说明 |
| :--- | :--- | :--- |
| **RemoteControl** | **75Hz** | 传输鼠标键盘输入和自定义数据 |
| **CustomByteBlock** | **50Hz** | 机器人自定义上传数据流 |
| **RobotDynamicStatus** | **10Hz** | 机器人实时数据 |

### 中频指令 (5Hz)
- **GameStatus**: 5Hz (同步比赛全局状态信息)

### 低频指令 (1Hz)
绝大多数同步指令均为 1Hz，包括：
- **全局状态**: `GlobalUnitStatus`, `GlobalLogisticsStatus`, `GlobalSpecialMechanism`
- **机器人状态**: `RobotInjuryStat`, `RobotRespawnStatus`, `RobotStaticStatus`, `RobotModuleStatus`, `RobotPosition`
- **决策与功能**: `RobotPathPlanInfo`, `RaderInfoToClient`, `AssemblyCommand`, `TechCoreMotionStateSync`, `PerformanceSelection`
- **兵种特定**: `HeroDeployMode`, `RuneStatus`, `SentinelStatusSync`, `DartInfo`, `GuardCtrl`, `AirSupport`

### 触发式发送
以下指令仅在事件发生时发送（之后可能以 1Hz 持续发送状态）：
- **Event**: 全局事件通知
- **Buff**: 获得增益时触发
- **PenaltyInfo**: 判罚信息同步
- **MapClickInfoNotify**: 云台手地图点击标记

## 7. 定频发送实现指南

为了满足协议要求的发送频率（如 75Hz 的遥控指令），建议在 **Vue 组件** 或 **Electron 主进程** 中使用定时器。

### 示例代码 (Vue 组件)

以下代码展示了如何使用 `setInterval` 实现 75Hz 的遥控指令发送。

```typescript
// 在 Vue 组件中 (例如 src/views/ControlPanel.vue)
import { onMounted, onUnmounted } from 'vue';

// 75Hz 对应的时间间隔 (毫秒)
const INTERVAL_75HZ = 1000 / 75; // ~13.33ms
const INTERVAL_1HZ = 1000;

let remoteControlTimer: NodeJS.Timer | null = null;
let statusTimer: NodeJS.Timer | null = null;

const sendRemoteControl = () => {
    // 1. 获取当前输入状态 (鼠标/键盘)
    const payload = {
        mouse_x: currentMouseX,
        mouse_y: currentMouseY,
        // ... 其他数据
    };
    
    // 2. 发送给主进程 (通过 IPC)
    window.electron.ipcRenderer.send('mqtt-publish', {
        topic: 'RemoteControl',
        data: payload
    });
};

const sendHeartbeat = () => {
    // 发送 1Hz 的状态包
    window.electron.ipcRenderer.send('mqtt-publish', {
        topic: 'RobotStaticStatus',
        data: { /* ... */ }
    });
};

onMounted(() => {
    // 启动定时器
    remoteControlTimer = setInterval(sendRemoteControl, INTERVAL_75HZ);
    statusTimer = setInterval(sendHeartbeat, INTERVAL_1HZ);
});

onUnmounted(() => {
    // 清除定时器
    if (remoteControlTimer) clearInterval(remoteControlTimer);
    if (statusTimer) clearInterval(statusTimer);
});
```

### 性能优化建议
对于 75Hz 这样较高的频率，单纯的 `setInterval` 可能会受到主线程阻塞的影响。如果发现发送频率不稳定，可以考虑：
1. **在 Web Worker 中计时**: 将计时逻辑移入 Worker 线程，通过 `postMessage` 通知主线程发送。
2. **在 Electron 主进程中发送**: 如果数据不需要从渲染进程实时获取（或者是游戏手柄可以直接在主进程读取），直接在 `background.ts` 中维护定时器性能更佳。



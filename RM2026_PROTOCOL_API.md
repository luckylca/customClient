# RoboMaster 2026 自定义客户端：通信协议与架构对接指南

> **给未来接手本项目的 AI（To Future AI）**：
> 这个 Markdown 文件是交接与快速 onboarding 核心文档。你无需再去查找阅读长达一百多页的官方《RoboMaster 2026 机甲大师高校系列赛通信协议 V1.3.0》PDF 文件。关于自定义客户端开发环节所需要的**全部底层数据结构、枚举约束、前后端架构通信链路**均已经为你内聚并归纳在下文之中。请仔细阅读并根据它编写你的代码。

---

## 1. 核心技术栈与代码全景
- **前端架构：** Vue 3 (Composition API) + Pinia，搭配 Vite 与 Electron。
- **通信链路：** 后台或硬件通过 MQTT 与前端解耦通信（前端直连本地 broker `127.0.0.1:3333`）。
- **编解码基座：** Protocol Buffers (Proto3)。

### 📁 核心文件结构依赖
- **`src/proto/rm.proto` & `rm_pb.js`/`rm_pb.d.ts`**: 底层生成的 Protobuf 控制模块，绝不能手动编辑 `js` 和 `d.ts`。所有的编解码类调用均依赖于它。
- **`src/services/MqttService.ts`**: MQTT 网络收发总指挥。监听 `message` 后，会根据具体 Topic 名称调用上方的 `rm_pb` Protobuf Decoder 进行解析转换（`Buffer -> JavaScript Object`），再派发回调完成收口。
- **`src/types/rmType.ts`**: **全量 TS 核心库**！存放着根据下文协议高度整理注释输出的 35 个 Interface 定义。
- **状态仓库 `stores/`**: 采用 Pinia。
  - `robotData.ts`：承接当前**单体机器人的本体属性、硬件状态及 Buff 数据流**。
  - `globalData.ts`：承接当前**全场比赛进度、比分及特殊全局事件等全局宏观数据流**。
  - 数据变动流：`MQTT 收包 -> Protobuf Decode -> 调用 Pinia setMessage 方法更新 ref`。Vue HUD 组件直接读取 Pinia State。

### ⚠️ 开发注意事项（Gotchas）
1. **类型安全边界：** `.proto` 转 TS 后 Interface 内的全部参数都是 `Optional (?)` 属性。在编写 Vue 组件模板提取值时，必须书写 `?? 0` 或者判断逻辑防止 `undefined`。
2. **测试数据心跳（HUD Demo Mode）：** 在 UI （如 `StatusPanel.vue`等）内，当真实的 `RobotDynamicStatusData` 数据源未能抵达客户端时，为了防止画面 UI 静止死板或渲染全 0 的错误感，它们会自动通过三角函数结合 `requestAnimationFrame` 发出波动的假数据来展现呼吸与生机感。拿到真数据包时此模式自动退出。

---

## 2. 官方通信协议完整释义（V1.3.0）

此部分涵盖了自定义客户端所有允许接收与上传的核心 Protobuf 报文全貌及各个类型的解释、枚举。前端订阅所有的 Topics（与下表消息类名全等）与 Typescript Interface 严丝合缝映射。

### 【一】客户端与机器人交互控制指令

**2.2.1 KeyboardMouseControl (鼠标键盘控制)**
用途：传输鼠标键盘输入。
*备注：键盘按键位掩码(bit0-bit15)对应：W(0), S(1), A(2), D(3), Shift(4), Ctrl(5), Q(6), E(7), R(8), F(9), G(10), Z(11), X(12), C(13), V(14), B(15)*
- `mouse_x` / `mouse_y` / `mouse_z` (int32): 鼠标 x/y 轴移动速度(负指向左/下)，z 为滚轮速度(负指后滚)。
- `left_button_down` / `right_button_down` / `mid_button_down` (bool): 对应的按键状态是否按下。
- `keyboard_value` (uint32): 键盘按键位掩码。

**2.2.2 CustomControl (自定义控制流)**
- `data` (bytes): 最大 30 字节的自定义数据。

**2.2.17 MapClickInfoNotify (云台手地图点击标记)**
- `is_send_all`: 发送范围(0=指定客户端,1=除哨兵,2=包含哨兵)
- `robot_id`: 目标机器人 ID 列表(固定7字节)
- `mode`: 标记模式(1=地图,2=对方机器人)
- `enemy_id`: 标定的对方 ID
- `ascii`: 自定义图标 ASCII码
- `type`: 标记类型(1=攻击,2=防御,3=警戒,4=自定义)
- `map_x` / `map_y`: 地图坐标

**2.2.19 CustomByteBlock (大数据上传流)**
- `data` (bytes): 最大 2.4 kbit 自定义报文。

**2.2.24 CommonCommand (通用机制指令请求)**
用途：机器人多种常用指令。命令类型枚举(cmd_type)：1:兑换17mm发弹量, 2:兑换42mm发弹量, 3:确认复活, 4:兑换立即复活, 5:远程兑换允许发弹量, 6:远程兑换血量。
- `cmd_type` (uint32): 命令类型
- `param` (uint32): 命令类型对应的参数

---

### 【二】全局与比赛大盘宏观状态

**2.2.3 GameStatus (比赛全局状态追踪)**
*阶段枚举(current_stage)：0:未开始, 1:准备, 2:自检, 3:五秒倒计时, 4:比赛中, 5:结算中*
- `current_round`, `total_rounds` (uint32): 局号及总局数。
- `red_score`, `blue_score` (uint32): 红蓝双方得分。
- `current_stage`: 当前阶段枚举。
- `stage_countdown_sec`, `stage_elapsed_sec` (int32): 阶段剩余/已过时间。
- `is_paused` (bool): 比赛暂停。

**2.2.4 GlobalUnitStatus (全图建筑兵种状态概览)**
*基地状态(base_status)：0:无敌, 1:解除无敌未展开, 2:解除无敌已展开*
*前哨站状态(outpost_status)：0:无敌, 1:解除无敌且旋转, 2:停转, 3:击毁不可重建, 4:击毁可重建, 5:重建中*
- `base_health`, `outpost_health`, `enemy_base_health`, `enemy_outpost_health`: 各建筑血量 (0代表毁灭)。
- `base_status`, `outpost_status`等: 相关建筑的运转状态。
- `base_shield`, `enemy_base_shield`: 基地护盾值。
- `robot_health`, `robot_bullets` (repeated): 各个机器人的实时血量与累计消耗弹量。
- `total_damage_ally`, `total_damage_enemy`: 累计对敌输出总伤害。

**2.2.5 GlobalLogisticsStatus (经济科技)**
- `remaining_economy`, `total_economy_obtained`: 己方当下现有与历史累计获取金币/矿石。
- `tech_level`, `encryption_level`: 我方科技等级及加密等级。

**2.2.6 GlobalSpecialMechanism (特殊计时机制)**
*机制ID(mechanism_id)：1:己方堡垒被对方占领计时, 2:对方堡垒被己方占领计时*
- `mechanism_id`, `mechanism_time_sec`: 机制列表清单与相关倒计时(s)。

**2.2.7 Event (全局事件滚动通知)**
*事件ID涵盖击杀(1)、前哨站摧毁(2)、能量机关激活(3,4)、狙击伤害(5,6)、呼叫支援(7,8)、飞镖命中(9)等15种事件*
- `event_id`: 发生何种事件。
- `param`: 具体参数。

---

### 【三】单兵机器人状态下行

**2.2.8 RobotInjuryStat (累积受伤清算档案)**
- `total_damage`, `collision_damage`, `small_projectile_damage` 等: 全部累积受伤或各种小类型受击统计清算指标。
- `module_offline_damage`, `penalty_damage`, `server_kill_damage`: 因意外状况产生的扣血。
- `killer_id`: 将其致死的源头。

**2.2.9 RobotRespawnStatus (复活进度条)**
- `is_pending_respawn` (bool): 是否处于待复活读条中死寂状态。
- `current_respawn_progress` / `total_respawn_progress`: 读条进度指示器。
- `can_free_respawn`, `can_pay_for_respawn`, `gold_cost_for_respawn`: 相关复活机制资源判断。

**2.2.10 RobotStaticStatus (机器人先天配置属性/上限)**
- `connection_state`: 连通性(0=未连接, 1=已连接)。
- `alive_state`: 存亡情况(0=未知,1=存活,2=战亡)。
- `max_health`, `max_heat`, `max_power`, `max_buffer_energy`, `max_chassis_energy`: 全部**生命、热量、底盘功率及缓冲护盾的天花板极限上限配置**。
- `robot_id`, `robot_type`, `level`: 等级与基础身份识别。

**2.2.11 RobotDynamicStatus (极速动态实时指标)**
- `current_health`, `current_heat`, `current_experience`: **现有血量、当前枪口热能累积情况以及经验值**。
- `current_chassis_energy`, `current_buffer_energy`: 实时的底盘现有能源与护盾抵抗承受能量剩余。
- `remaining_ammo`: 剩余的系统**允许打出的发弹量**。
- `is_out_of_combat`, `out_of_combat_countdown`: 身后脱战机制提示指标。

**2.2.12 RobotModuleStatus (硬件外设外挂件链路情况)**
*所有模块状态枚举一致：0=离线, 1=在线, 2=因安装不规范被视为离线*
- `power_manager`: 供电系统
- `rfid` / `light_strip`: 射频读卡及灯带
- `small_shooter` / `big_shooter`: 小口径与大炮射出管线
- `armor`, `video_transmission`, `laser_detection_module` 等装甲与图传激光感应硬件。

**2.2.13 RobotPosition & 2.2.18 RadarInfoToClient (场地定位雷达体系)**
- `x`, `y`, `z`, `yaw`: 本次机器人接收到的基于世界原点的姿态位姿(角度与三维尺度)。
- 雷达专属则传递数组包内蕴含 `target_pos_x`, `target_pos_y` 及是否有 `is_high_light` 双子星特亮标识点预警。

**2.2.14 Buff (战场增益获取状态)**
*buff类型枚举：1:攻击, 2:防御/易伤, 3:热量冷却, 4:底盘功率, 5:回血, 6:可兑换发弹量, 7:地形跨越*
- `buff_type`: 获取何品种 Buff。
- `buff_level`: 百分比或绝对值。
- `buff_left_time` / `buff_max_time`: BUFF 有效期的滴答时间。

**2.2.15 PenaltyInfo (严重判罚下放警告)**
*判罚类型(1:黄牌, 2:双方黄牌, 3:红牌, 4:超功率, 5:超热量, 6:超射速)*
- `penalty_type`, `penalty_effect_sec`, `total_penalty_num`: 被裁判或自动系统惩罚时长与累计。

---

### 【四】特种兵团与机制（哨兵，飞镖，英雄，工程核心，空中支援）

- **2.2.16 RobotPathPlanInfo (哨兵巡逻动向)**: 发送哨兵起讫点及行经偏移量网络点位意图(1=进攻,2=防守)。
- **2.2.20 & 2.2.21 Assembly/TechCoreMotionStateSync (工程科技核心)**:
  - 处理基地与基地装配科技树。拥有包括 `putin_state`（放入单元）、`move_state`（移动推杆）、`remain_time_all` 装配总时长预估等高精科技信息状态同步。
- **2.2.22 & 2.2.23 RobotPerformanceSelection (兵种改装特性)**: 指导不同改装车型如发射机构 (`shooter`), 底盘 (`chassis`), 以及哨兵选择自动/半自动巡航特性 (`sentry_control`) 的确立。
- **2.2.25 & 2.2.26 HeroDeployMode (英雄阵地部署模式)**: `status` / `mode` 即反馈目前装甲车是否已在狙击高台展开放护模式(0=未部署/取消, 1=已进入/激活)。
- **2.2.27 & 2.2.28 RuneActivate (能量机关)**: 激活(1:未激活, 2:正在打榜敲击激活, 3:全点亮) 以及已打通关灯臂数量 (`activated_arms`)。 
- **2.2.29 SentryStatusSync (哨兵底盘状态)**: 返回当前底盘弱化状态及主框架运作模式 (1=进攻, 2=防卫)。
- **2.2.30 & 2.2.31 DartCommand (飞镖核潜艇开启)**: 控制投弹仓闸门开启 (`open`) 并申请进行致命打击验证 (`launch_confirm`) 指令与当前锁定的靶标 ID 进度。
- **2.2.32 & 2.2.33 SentryCtrl (请求哨兵反控)**: 指令编号枚举 1~9 实现高层补血指令复活及切换哨兵意向反控状态，下发执行反馈 `result_code` (0=Success)。
- **2.2.34 & 2.2.35 AirSupport (制空权请求与播报)**:
  - 发送请求取消/免费/投币呼叫支援队伍 (`command_id`)。
  - 同步目前空兵 `airsupport_status`, 可免费蹭的余量时间, 指引状态及反锁定 `shooter_status` (0=锁定停火, 1=正常开火)。

---

## 5. 最后的话
未来的 AI 同事：在理解了以上这些字段意义以及项目数据生命周期流向逻辑以后，你的任何新战术面板组件开发都将一帆风顺，直接引用库进行绑定即可享受实时 Vue 响应式的顺滑联动！

/**
 * RoboMaster 2026 自定义客户端通信协议 TypeScript 定义
 * 基于协议版本: V1.0.0 (20251127)
 */

// 2.2.1 RemoteControl - 传输鼠标键盘输入和自定义数据 [cite: 566]
export interface RemoteControl {
    mouse_x: number; // 鼠标 x 轴移动速度 [cite: 568]
    mouse_y: number; // 鼠标 y 轴移动速度 [cite: 568]
    mouse_z: number; // 鼠标滚轮移动速度 [cite: 568]
    left_button_down: boolean; // 左键状态 [cite: 568]
    right_button_down: boolean; // 右键状态 [cite: 568]
    keyboard_value: number; // 键盘按键位掩码 (uint32) [cite: 572]
    mid_button_down: boolean; // 中键状态 [cite: 572]
    data: Uint8Array; // 最大30字节的自定义数据 [cite: 572]
}

// 2.2.2 GameStatus - 同步比赛全局状态信息 [cite: 583]
export interface GameStatus {
    current_round: number; // 当前局号 [cite: 585]
    total_rounds: number; // 总局数 [cite: 585]
    red_score: number; // 红方得分 [cite: 585]
    blue_score: number; // 蓝方得分 [cite: 585]
    /** * 当前阶段: 0-未开始, 1-准备, 2-15s自检, 3-5s倒计时, 4-比赛中, 5-结算中 [cite: 590]
     */
    current_stage: number; 
    stage_countdown_sec: number; // 当前阶段剩余时间 [cite: 585]
    stage_elapsed_sec: number; // 当前阶段已过时间 [cite: 585]
    is_paused: boolean; // 是否暂停 [cite: 589]
}

// 2.2.3 GlobalUnitStatus - 同步基地、前哨站和所有机器人状态 [cite: 609]
export interface GlobalUnitStatus {
    base_health: number; // 基地当前血量 [cite: 611]
    base_status: number; // 基地状态 [cite: 611]
    base_shield: number; // 基地当前护盾值 [cite: 611]
    outpost_health: number; // 前哨站当前血量 [cite: 615]
    outpost_status: number; // 前哨站状态 [cite: 615]
    robot_health: number[]; // 所有机器人血量 (先己方后对方) [cite: 615]
    robot_bullets: number[]; // 己方机器人剩余累计发弹量 [cite: 615]
    total_damage_red: number; // 红方累计总伤害 [cite: 615]
    total_damage_blue: number; // 蓝方累计总伤害 [cite: 639]
}

// 2.2.4 GlobalLogisticsStatus - 同步全局后勤信息 [cite: 641]
export interface GlobalLogisticsStatus {
    remaining_economy: number; // 己方当前经济 [cite: 645]
    total_economy_obtained: number; // 己方累计总经济 (uint64) [cite: 646]
    tech_level: number; // 己方科技等级 [cite: 647]
    encryption_level: number; // 己方加密等级 [cite: 648]
}

// 2.2.5 GlobalSpecialMechanism - 同步正在生效的全局特殊机制 [cite: 651]
export interface GlobalSpecialMechanism {
    mechanism_id: number[]; // 正在生效的机制 ID 列表 [cite: 652]
    mechanism_time_sec: number[]; // 对应的时间参数(秒) [cite: 652]
}

// 2.2.6 Event - 全局事件通知 [cite: 663]
export interface Event {
    event_id: number; // 事件编号 [cite: 664]
    param: string; // 事件参数 [cite: 664]
}

// 2.2.7 RobotInjuryStat - 机器人一次存活期间累计受伤统计 [cite: 693]
export interface RobotInjuryStat {
    total_damage: number; // 该次存活累计受伤总计 [cite: 695]
    collision_damage: number; // 撞击伤害 [cite: 695]
    small_projectile_damage: number; // 17mm 弹丸伤害 [cite: 695]
    large_projectile_damage: number; // 42mm 弹丸伤害 [cite: 695]
    dart_splash_damage: number; // 飞镖溅射伤害 [cite: 695]
    module_offline_damage: number; // 模块离线扣血 [cite: 695]
    wifi_offline_damage: number; // WiFi 离线扣血 [cite: 695]
    penalty_damage: number; // 判罚扣血 [cite: 695]
    server_kill_damage: number; // 服务器强制使其战亡扣血 [cite: 695]
    killer_id: number; // 击杀者ID [cite: 695]
}

// 2.2.8 RobotRespawnStatus - 机器人复活状态同步 [cite: 710]
export interface RobotRespawnStatus {
    is_pending_respawn: boolean; // 是否处于待复活状态 [cite: 712]
    total_respawn_progress: number; // 复活所需总读条 [cite: 712]
    current_respawn_progress: number; // 当前复活读条进度 [cite: 712]
    can_free_respawn: boolean; // 是否可以免费复活 [cite: 712]
    gold_cost_for_respawn: number; // 花费金币复活所需金币数 [cite: 712]
    can_pay_for_respawn: boolean; // 是否允许花费金币复活 [cite: 712]
}

// 2.2.9 RobotStaticStatus - 机器人固定属性和配置 [cite: 724]
export interface RobotStaticStatus {
    connection_state: number; // 连接状态 [cite: 726]
    field_state: number; // 上场状态 [cite: 726]
    alive_state: number; // 存活状态 [cite: 726]
    robot_id: number; // 机器人编号 [cite: 726]
    robot_type: number; // 机器人类型 [cite: 726]
    performance_system_shooter: number; // 性能体系-发射机构 [cite: 726]
    performance_system_chassis: number; // 性能体系-底盘 [cite: 726]
    level: number; // 当前等级 [cite: 726]
    max_health: number; // 最大血量 [cite: 726]
    max_heat: number; // 最大热量 [cite: 726]
    heat_cooldown_rate: number; // 热量冷却速率 [cite: 726]
    max_power: number; // 最大功率 [cite: 726]
    max_buffer_energy: number; // 最大缓冲能量 [cite: 726]
    max_chassis_energy: number; // 最大底盘能量 [cite: 726]
}

// 2.2.10 RobotDynamicStatus - 机器人实时数据 [cite: 756]
export interface RobotDynamicStatus {
    current_health: number; // 当前血量 [cite: 758]
    current_heat: number; // 当前热量 [cite: 760]
    last_projectile_fire_rate: number; // 上一次弹丸射速 [cite: 760]
    current_chassis_energy: number; // 当前剩余底盘能量 [cite: 760]
    current_buffer_energy: number; // 当前缓冲能量 [cite: 760]
    current_experience: number; // 当前经验值 [cite: 760]
    experience_for_upgrade: number; // 升级所需经验 [cite: 760]
    total_projectiles_fired: number; // 累计已发弹量 [cite: 760]
    remaining_ammo: number; // 剩余允许发弹量 [cite: 760]
    is_out_of_combat: boolean; // 是否处于脱战状态 [cite: 760]
    out_of_combat_countdown: number; // 脱战状态倒计时 [cite: 760]
    can_remote_heal: boolean; // 是否可以远程补血 [cite: 760]
    can_remote_ammo: boolean; // 是否可以远程补弹 [cite: 760]
}

// 2.2.11 RobotModuleStatus - 机器人各模块运行状态 [cite: 779]
export interface RobotModuleStatus {
    power_manager: number; // 电源管理模块状态 [cite: 781]
    rfid: number; // RFID 模块状态 [cite: 781]
    light_strip: number; // 灯条模块状态 [cite: 781]
    small_shooter: number; // 17mm 发射机构状态 [cite: 781]
    big_shooter: number; // 42mm 发射机构状态 [cite: 781]
    uwb: number; // 定位模块状态 [cite: 781]
    armor: number; // 装甲模块状态 [cite: 781]
    video_transmission: number; // 图传模块状态 [cite: 781]
    capacitor: number; // 电容模块状态 [cite: 781]
    main_controller: number; // 主控状态 [cite: 781]
}

// 2.2.12 RobotPosition - 机器人空间坐标和朝向 [cite: 795]
export interface RobotPosition {
    x: number; // 世界坐标 X [cite: 798]
    y: number; // 世界坐标 Y [cite: 798]
    z: number; // 世界坐标 Z [cite: 798]
    yaw: number; // 测速模块朝向(度), 正北为0 [cite: 798]
}

// 2.2.13 Buff - Buff 效果信息 [cite: 805]
export interface Buff {
    robot_id: number; // 机器人 ID [cite: 807]
    buff_type: number; // Buff 类型 [cite: 807]
    buff_level: number; // Buff 增益值 [cite: 807]
    buff_max_time: number; // Buff 最大剩余时间 [cite: 810]
    buff_left_time: number; // Buff 剩余时间 [cite: 810]
    msg_params: string; // 额外文字参数 [cite: 810]
}

// 2.2.14 PenaltyInfo - 判罚信息同步 [cite: 832]
export interface PenaltyInfo {
    penalty_type: number; // 当前受罚类型 [cite: 834]
    penalty_effect_sec: number; // 当前受罚效果时长 [cite: 837]
    total_penalty_num: number; // 当前判罚数量 [cite: 837]
}

// 2.2.15 RobotPathPlanInfo - 哨兵轨迹规划信息 [cite: 850]
export interface RobotPathPlanInfo {
    intention: number; // 哨兵意图 (1=攻击, 2=防守, 3=移动) [cite: 852]
    start_pos_x: number; // 起始点 X (分米) [cite: 852]
    start_pos_y: number; // 起始点 Y (分米) [cite: 852]
    offset_x: number[]; // 相对起始点 X 增量数组 [cite: 852]
    offset_y: number[]; // 相对起始点 Y 增量数组 [cite: 852]
    sender_id: number; // 发送者 ID [cite: 852]
}

// 2.2.16 MapClickInfoNotify - 云台手地图点击标记 [cite: 864]
export interface MapClickInfoNotify {
    is_send_all: number; // 发送范围 [cite: 866]
    robot_id: Uint8Array; // 目标机器人 ID 列表 (固定7字节) [cite: 866]
    mode: number; // 标记模式 [cite: 866]
    enemy_id: number; // 标定的对方 ID [cite: 866]
    ascii: number; // 自定义图标 ASCII 码 [cite: 866]
    type: number; // 标记类型 [cite: 866]
    screen_x: number; // 屏幕坐标 X (像素) [cite: 866]
    screen_y: number; // 屏幕坐标 Y (像素) [cite: 866]
    map_x: number; // 地图坐标 X [cite: 866]
    map_y: number; // 地图坐标 Y [cite: 866]
}

// 2.2.17 RaderInfoToClient - 雷达发送的机器人位置信息 [cite: 881]
export interface RaderInfoToClient {
    target_robot_id: number; // 目标机器人 ID [cite: 883]
    target_pos_x: number; // 目标位置 X (米) [cite: 883]
    target_pos_y: number; // 目标位置 Y (米) [cite: 883]
    torward_angle: number; // 朝向角度 [cite: 883]
    is_high_light: number; // 是否特殊标识 [cite: 883]
}

// 2.2.18 CustomByteBlock - 机器人自定义上传数据流 [cite: 894]
export interface CustomByteBlock {
    data: Uint8Array; // 最大 1.2 kbit 的自定义数据包 [cite: 896]
}

// 2.2.19 AssemblyCommand - 工程装配指令 [cite: 900]
export interface AssemblyCommand {
    operation: number; // 装配操作类型 [cite: 902]
    difficulty: number; // 选中的装配难度 [cite: 902]
}

// 2.2.20 TechCoreMotionStateSync - 科技核心运动状态同步 [cite: 909]
export interface TechCoreMotionStateSync {
    maximum_difficulty_level: number; // 当前可选择最高装配难度 [cite: 911]
    status: number; // 科技核心状态 [cite: 911]
}

// 2.2.21 & 2.2.22 PerformanceSelection - 步兵/英雄性能体系相关 [cite: 926, 936]
export interface PerformanceSelection {
    shooter: number; // 发射机构性能体系 [cite: 928]
    chassis: number; // 底盘性能体系 [cite: 928]
}

// 2.2.23 & 2.2.24 HeroDeployMode - 英雄部署模式相关 [cite: 944, 950]
export interface HeroDeployMode {
    mode_or_status: number; // 模式(0=退出/未部署, 1=进入/已部署) [cite: 946, 954]
}

// 2.2.25 & 2.2.26 Rune - 能量机关相关 [cite: 958, 964]
export interface RuneStatus {
    activate: number; // 激活指令 [cite: 960]
    rune_status: number; // 当前能量机关状态 [cite: 966]
    activated_arms: number; // 已激活灯臂数量 [cite: 966]
    average_rings: number; // 总环数 [cite: 966]
}

// 2.2.27 SentinelStatusSync - 哨兵姿态和弱化状态 [cite: 978]
export interface SentinelStatusSync {
    posture_id: number; // 姿态ID (1进攻, 2防御, 3移动) [cite: 980]
    is_weakened: boolean; // 是否弱化 [cite: 980]
}

// 2.2.28 & 2.2.29 Dart - 飞镖相关 [cite: 985, 994]
export interface DartInfo {
    target_id: number; // 目标 ID [cite: 988]
    open: boolean; // 闸门开关/状态 [cite: 988]
}

// 2.2.30 & 2.2.31 GuardCtrl - 哨兵控制相关 [cite: 1003, 1027]
export interface GuardCtrl {
    command_id: number; // 指令编号 [cite: 1005]
    result_code?: number; // 执行结果码 [cite: 1029]
}

// 2.2.32 & 2.2.33 AirSupport - 空中支援相关 [cite: 1038, 1049]
export interface AirSupport {
    command_id: number; // 指令类型 [cite: 1040]
    airsupport_status: number; // 空中支援状态 [cite: 1051]
    left_time: number; // 免费空中支援剩余时间 [cite: 1056]
    cost_coins: number; // 付费空中支援已花费金币 [cite: 1056]
}
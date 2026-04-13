/**
 * RoboMaster 2026 自定义客户端通信协议 TypeScript 定义
 * 基于协议版本: V1.3.0
 */

// 2.2.1 KeyboardMouseControl - 用途：传输鼠标键盘输入
// 键盘按键位掩码(bit0-bit15)对应：W(0), S(1), A(2), D(3), Shift(4), Ctrl(5), Q(6), E(7), R(8), F(9), G(10), Z(11), X(12), C(13), V(14), B(15)
export interface KeyboardMouseControl {
    mouse_x?: number; // 鼠标 x 轴移动速度,负值标识向左移动
    mouse_y?: number; // 鼠标 y 轴移动速度,负值标识向下移动
    mouse_z?: number; // 鼠标滚轮移动速度,负值标识向后滚动
    left_button_down?: boolean; // 左键是否按下(false=抬起, true=按下)
    right_button_down?: boolean; // 右键是否按下(false=抬起, true=按下)
    keyboard_value?: number; // 键盘按键位掩码
    mid_button_down?: boolean; // 中键是否按下(false=抬起, true=按下)
}

// 2.2.2 CustomControl - 用途：最大30字节的自定义数据
export interface CustomControl {
    data?: Uint8Array; // 最大30字节的自定义数据
}

// 2.2.3 GameStatus - 用途：同步比赛全局状态信息
// 当前阶段枚举：0:未开始, 1:准备, 2:自检, 3:五秒倒计时, 4:比赛中, 5:结算中
export interface GameStatus {
    current_round?: number; // 当前局号(从1开始)
    total_rounds?: number; // 总局数
    red_score?: number; // 红方得分
    blue_score?: number; // 蓝方得分
    current_stage?: number; // 当前阶段
    stage_countdown_sec?: number; // 当前阶段剩余时间(秒)
    stage_elapsed_sec?: number; // 当前阶段已过时间(秒)
    is_paused?: boolean; // 是否暂停
}

// 2.2.4 GlobalUnitStatus - 用途：同步基地、前哨站和所有机器人状态
// 基地状态：0:无敌, 1:解除无敌未展开, 2:解除无敌已展开
// 前哨站状态：0:无敌, 1:解除无敌且旋转, 2:停转, 3:击毁不可重建, 4:击毁可重建, 5:重建中
export interface GlobalUnitStatus {
    base_health?: number; // 己方基地当前血量(0=已摧毀)
    base_status?: number; // 己方基地状态
    base_shield?: number; // 己方基地当前护盾值(0=无护盾)
    outpost_health?: number; // 己方前哨站当前血量(0=已摧毀)
    outpost_status?: number; // 己方前哨站状态
    enemy_base_health?: number; // 对方基地当前血量(0=已摧毁)
    enemy_base_status?: number; // 对方基地状态
    enemy_base_shield?: number; // 对方基地当前护盾值
    enemy_outpost_health?: number; // 对方前哨站当前血量
    enemy_outpost_status?: number; // 对方前哨站状态
    robot_health?: number[]; // 所有机器人血量
    robot_bullets?: number[]; // 己方机器人剩余累计发弹量
    total_damage_ally?: number; // 己方累计总伤害
    total_damage_enemy?: number; // 对方累计总伤害
}

// 2.2.5 GlobalLogisticsStatus - 用途：同步全局后勤信息
export interface GlobalLogisticsStatus {
    remaining_economy?: number; // 己方当前经济
    total_economy_obtained?: number; // 己方累计总经济
    tech_level?: number; // 己方科技等级
    encryption_level?: number; // 己方加密等级
}

// 2.2.6 GlobalSpecialMechanism - 用途：同步正在生效的全局特殊机制
// 机制ID：1:己方堡垒被对方占领计时, 2:对方堡垒被己方占领计时
export interface GlobalSpecialMechanism {
    mechanism_id?: number[]; // 正在生效的机制 ID 列表
    mechanism_time_sec?: number[]; // 对应的时间参数
}

// 2.2.7 Event - 用途：全局事件通知
// 事件ID涵盖击杀(1)、前哨站摧毁(2)、能量机关激活(3,4)、狙击伤害(5,6)、呼叫支援(7,8)、飞镖命中(9)等
export interface Event {
    eventId?: number; // 事件编号
    param?: string; // 事件参数(含义随 event_id变化)
}

// 2.2.8 RobotInjuryStat - 用途：机器人一次存活期间累计受伤统计
export interface RobotInjuryStat {
    total_damage?: number; // 累计受伤总计
    collision_damage?: number; // 撞击伤害
    small_projectile_damage?: number; // 17mm 弹丸伤害
    large_projectile_damage?: number; // 42mm 弹丸伤害
    dart_splash_damage?: number; // 飞镖溅射伤害
    module_offline_damage?: number; // 模块离线扣血
    offline_damage?: number; // 异常离线扣血
    penalty_damage?: number; // 判罚扣血
    server_kill_damage?: number; // 服务器强制战亡扣血
    killer_id?: number; // 击杀者ID
}

// 2.2.9 RobotRespawnStatus - 用途：机器人复活状态同步
export interface RobotRespawnStatus {
    is_pending_respawn?: boolean; // 是否处于待复活状态
    total_respawn_progress?: number; // 复活所需总读条
    current_respawn_progress?: number; // 当前复活读条进度
    can_free_respawn?: boolean; // 是否可以免费复活
    gold_cost_for_respawn?: number; // 花费金币复活所需金币数
    can_pay_for_respawn?: boolean; // 是否允许花费金币复活
}

// 2.2.10 RobotStaticStatus - 用途：机器人固定属性和配置
export interface RobotStaticStatus {
    connection_state?: number; // 连接状态(0=未连接, 1=已连接)
    field_state?: number; // 上场状态(0=已上场,1=未上场)
    alive_state?: number; // 存活状态(0=未知,1=存活,2=战亡)
    robot_id?: number; // 机器人编号
    robot_type?: number; // 机器人类型
    performance_system_shooter?: number; // 性能体系-发射机构
    performance_system_chassis?: number; // 性能体系-底盘
    level?: number; // 当前等级
    max_health?: number; // 最大血量
    max_heat?: number; // 最大热量
    heat_cooldown_rate?: number; // 热量冷却速率(每秒)
    max_power?: number; // 最大功率
    max_buffer_energy?: number; // 最大缓冲能量
    max_chassis_energy?: number; // 最大底盘能量
}

// 2.2.11 RobotDynamicStatus - 用途：机器人实时数据
export interface RobotDynamicStatus {
    current_health?: number; // 当前血量
    current_heat?: number; // 当前热量
    last_projectile_fire_rate?: number; // 上一次弹丸射速
    current_chassis_energy?: number; // 当前剩余底盘能量
    current_buffer_energy?: number; // 当前缓冲能量
    current_experience?: number; // 当前经验值
    experience_for_upgrade?: number; // 距离下一次升级仍需获得的经验
    total_projectiles_fired?: number; // 累计已发弹量
    remaining_ammo?: number; // 剩余允许发弹量
    is_out_of_combat?: boolean; // 是否处于脱战状态
    out_of_combat_countdown?: number; // 脱战状态倒计时
    can_remote_heal?: boolean; // 是否可以远程补血
    can_remote_ammo?: boolean; // 是否可以远程补弹
}

// 2.2.12 RobotModuleStatus - 用途：机器人各模块运行状态
// 所有模块状态枚举一致：0=离线, 1=在线, 2=因安装不规范被视为离线
export interface RobotModuleStatus {
    power_manager?: number; // 电源管理模块状态
    rfid?: number; // RFID 模块状态
    light_strip?: number; // 灯条模块状态
    small_shooter?: number; // 17mm 发射机构状态
    big_shooter?: number; // 42mm 发射机构状态
    uwb?: number; // 定位模块状态
    armor?: number; // 装甲模块状态
    video_transmission?: number; // 图传模块状态
    capacitor?: number; // 电容模块状态
    main_controller?: number; // 主控状态
    laser_detection_module?: number; // 激光检测模块状态
}

// 2.2.13 RobotPosition - 用途：机器人空间坐标和朝向
export interface RobotPosition {
    x?: number; // 世界坐标X轴
    y?: number; // 世界坐标Y轴
    z?: number; // 世界坐标Z轴
    yaw?: number; // 本机器人测速模块的朝向,单位:度
    robot_id?: number; // 接受到的坐标归属机器人
}

// 2.2.14 Buff - 用途：Buff效果信息
// buff类型枚举：1:攻击, 2:防御/易伤, 3:热量冷却, 4:底盘功率, 5:回血, 6:可兑换发弹量, 7:地形跨越
export interface Buff {
    robotId?: number; // 机器人 ID
    buffType?: number; // Buff 类型
    buffLevel?: number; // Buff增益值(百分比或直接值)
    buffMaxTime?: number; // Buff 最大剩余时间
    buffLeftTime?: number; // Buff 剩余时间
}

// 2.2.15 PenaltyInfo - 用途：判罚信息同步
// 判罚类型枚举：(1:黄牌, 2:双方黄牌, 3:红牌, 4:超功率, 5:超热量, 6:超射速)
export interface PenaltyInfo {
    penalty_type?: number; // 当前受罚类型
    penalty_effect_sec?: number; // 当前受罚效果时长
    total_penalty_num?: number; // 当前判罚数量
}

// 2.2.16 RobotPathPlanInfo - 用途：哨兵轨迹规划信息
export interface RobotPathPlanInfo {
    intention?: number; // 哨兵意图(1=攻击, 2=防守, 3=移动)
    start_pos_x?: number; // 起始点X坐标(分米)
    start_pos_y?: number; // 起始点Y坐标(分米)
    offset_x?: number[]; // 相对起始点X增量数组
    offset_y?: number[]; // 相对起始点Y增量数组
    sender_id?: number; // 发送者 ID
}

// 2.2.17 MapClickInfoNotify - 用途：云台手地图点击标记
export interface MapClickInfoNotify {
    is_send_all?: number; // 发送范围(0=指定客户端,1=除哨兵,2=包含哨兵)
    robot_id?: Uint8Array; // 目标机器人 ID 列表(固定7字节)
    mode?: number; // 标记模式(1=地图,2=对方机器人)
    enemy_id?: number; // 标定的对方 ID
    ascii?: number; // 自定义图标 ASCII码
    type?: number; // 标记类型(1=攻击,2=防御,3=警戒,4=自定义)
    map_x?: number; // 地图坐标 X 
    map_y?: number; // 地图坐标 Y
}

// 2.2.18 RadarInfoToClient - 用途：雷达发送的机器人位置信息
export interface RadarSingleRobotInfo {
    target_pos_x?: number; // 机器人位置x (cm)
    target_pos_y?: number; // 机器人位置y (cm)
    is_high_light?: number; // 机器人是否特殊标识
}
export interface RadarInfoToClient {
    RadarSingleRobotInfo?: RadarSingleRobotInfo[]; // 雷达发送的所有机器人位置及特殊标识
}

// 2.2.19 CustomByteBlock - 用途：自定义数据流
export interface CustomByteBlock {
    data?: Uint8Array; // 最大为 2.4 kbit 的自定义数据包
}

// 2.2.20 AssemblyCommand - 用途：工程装配指令
export interface AssemblyCommand {
    operation?: number; // 装配操作类型(0=开始,1=确认,2=取消)
    difficulty?: number; // 选中的装配难度
}

// 2.2.21 TechCoreMotionStateSync - 用途：科技核心运动状态同步
export interface TechCoreMotionStateSync {
    maximum_difficulty_level?: number; // 最高装配难度等级
    basic_state?: number; // 科技核心基础状态
    putin_state?: number; // 能量单元放入状态
    move_state?: number; // 能量单元平移状态
    rotate_state?: number; // 能量单元旋转状态
    enemy_core_status?: number; // 对方科技核心状态
    remain_time_all?: number; // 己方装配总剩余时长
    remain_time_step?: number; // 己方单个步骤装配间隔剩余时长
}

// 2.2.22 & 2.2.23 PerformanceSelection - 步兵/英雄性能体系选择及状态同步
export interface RobotPerformanceSelectionCommand {
    shooter?: number; // 发射机构性能体系
    chassis?: number; // 底盘性能体系
    sentry_control?: number; // 哨兵控制方式选择(0=自动, 1=半自动)
}
export interface RobotPerformanceSelectionSync {
    shooter?: number; // 发射机构性能体系
    chassis?: number; // 底盘性能体系
    sentry_control?: number; // 哨兵控制方式选择
}
export interface PerformanceSelection {
    shooter?: number; // 发射机构性能体系
    chassis?: number; // 底盘性能体系
    sentry_control?: number; // 哨兵控制方式选择
}

// 2.2.24 CommonCommand - 用途：机器人多种常用指令
// 命令类型枚举(cmd_type)：1:兑换17mm发弹量, 2:兑换42mm发弹量, 3:确认复活, 4:兑换立即复活, 5:远程兑换允许发弹量, 6:远程兑换血量
export interface CommonCommand {
    cmd_type?: number; // 命令类型
    param?: number; // 命令类型对应的参数
}

// 2.2.25 & 2.2.26 HeroDeployMode - 英雄部署相关
export interface HeroDeployModeEventCommand {
    mode?: number; // 模式(0=退出,1=进入)
}
export interface DeployModeStatusSync {
    status?: number; // 当前部署模式状态(0为未部署,1为已部署)
}
export interface HeroDeployMode {
    status?: number; // 当前部署模式状态(0为未部署,1为已部署)
    mode?: number;
}

// 2.2.27 & 2.2.28 Rune - 能量机关指令与同步
export interface RuneActivateCommand {
    activate?: number; // 激活指令
}
export interface RuneStatusSync {
    rune_status?: number; // 状态枚举(1:未激活, 2:正在激活, 3:已激活)
    activated_arms?: number; // 当前已激活的灯臂数量
    average_rings?: number; // 平均环数
}
export interface RuneStatus {
    activate?: number; // 激活指令
    rune_status?: number; // 状态枚举
    activated_arms?: number; // 当前已激活的灯臂数量
    average_rings?: number; // 平均环数
}

// 2.2.29 SentinelStatusSync - 用途：哨兵姿态和弱化状态
export interface SentinelStatusSync {
    posture_id?: number; // 姿态ID(1=进攻, 2=防御, 3=移动)
    is_weakened?: boolean; // 是否弱化
}

// 2.2.30 & 2.2.31 Dart - 飞镖指令与状态
export interface DartCommand {
    target_id?: number; // 目标ID
    open?: boolean; // 闸门开关
    launch_confirm?: boolean; // 是否确认发射
}
export interface DartSelectTargetStatusSync {
    target_id?: number; // 目标 ID
    open?: number; // 闸门状态(0:关闭,1:开启中,2:已开启)
}
export interface DartInfo {
    target_id?: number; // 目标 ID
    open?: boolean | number; // 闸门开关/状态
    launch_confirm?: boolean; // 是否确认发射
}

// 2.2.32 & 2.2.33 SentryCtrl - 哨兵控制指令
// 指令编号枚举(1~9)对应补弹、补血、复活及姿态切换等操作
export interface SentryCtrlCommand {
    command_id?: number; // 指令编号(0=无效)
}
export interface SentryCtrlResult {
    command_id?: number; // 对应的指令编号
    result_code?: number; // 执行结果码(0:成功, 其他:失败)
}
export interface GuardCtrl {
    command_id?: number; // 指令编号(0=无效)
    result_code?: number; // 执行结果码
}

// 2.2.34 & 2.2.35 AirSupport - 空中支援指令与状态
export interface AirSupportCommand {
    command_id?: number; // 指令类型(0:取消, 1:免费呼叫, 2:付费呼叫)
}
export interface AirSupportStatusSync {
    airsupport_status?: number; // 空中支援状态(0:未支援, 1:正在支援)
    left_time?: number; // 免费空中支援剩余时间
    cost_coins?: number; // 付费空中支援已花费金币
    is_being_targeted?: number; // 激光检测模块是否检测到被照射
    shooter_status?: number; // 发射机构反制状态(0:锁定, 1:正常)
}
export interface AirSupport {
    command_id?: number; // 指令类型
    airsupport_status?: number; // 空中支援状态
    left_time?: number; // 免费空中支援剩余时间
    cost_coins?: number; // 付费空中支援已花费金币
    is_being_targeted?: number; // 激光检测模块是否检测到被照射
    shooter_status?: number; // 发射机构反制状态
}
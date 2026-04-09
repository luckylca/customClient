const fs = require('fs');

const tsTypes = `/**
 * RoboMaster 2026 自定义客户端通信协议 TypeScript 定义
 * 基于协议版本: V1.3.0
 */

// 2.2.1 KeyboardMouseControl
export interface KeyboardMouseControl {
    mouse_x?: number;
    mouse_y?: number;
    mouse_z?: number;
    left_button_down?: boolean;
    right_button_down?: boolean;
    keyboard_value?: number;
    mid_button_down?: boolean;
}

// 2.2.2 CustomControl
export interface CustomControl {
    data?: Uint8Array;
}

// 2.2.3 GameStatus
export interface GameStatus {
    current_round?: number;
    total_rounds?: number;
    red_score?: number;
    blue_score?: number;
    current_stage?: number;
    stage_countdown_sec?: number;
    stage_elapsed_sec?: number;
    is_paused?: boolean;
}

// 2.2.4 GlobalUnitStatus
export interface GlobalUnitStatus {
    base_health?: number;
    base_status?: number;
    base_shield?: number;
    outpost_health?: number;
    outpost_status?: number;
    enemy_base_health?: number;
    enemy_base_status?: number;
    enemy_base_shield?: number;
    enemy_outpost_health?: number;
    enemy_outpost_status?: number;
    robot_health?: number[];
    robot_bullets?: number[];
    total_damage_ally?: number;
    total_damage_enemy?: number;
}

// 2.2.5 GlobalLogisticsStatus
export interface GlobalLogisticsStatus {
    remaining_economy?: number;
    total_economy_obtained?: number;
    tech_level?: number;
    encryption_level?: number;
}

// 2.2.6 GlobalSpecialMechanism
export interface GlobalSpecialMechanism {
    mechanism_id?: number[];
    mechanism_time_sec?: number[];
}

// 2.2.7 Event
export interface Event {
    event_id?: number;
    param?: string;
}

// 2.2.8 RobotInjuryStat
export interface RobotInjuryStat {
    total_damage?: number;
    collision_damage?: number;
    small_projectile_damage?: number;
    large_projectile_damage?: number;
    dart_splash_damage?: number;
    module_offline_damage?: number;
    offline_damage?: number;
    penalty_damage?: number;
    server_kill_damage?: number;
    killer_id?: number;
}

// 2.2.9 RobotRespawnStatus
export interface RobotRespawnStatus {
    is_pending_respawn?: boolean;
    total_respawn_progress?: number;
    current_respawn_progress?: number;
    can_free_respawn?: boolean;
    gold_cost_for_respawn?: number;
    can_pay_for_respawn?: boolean;
}

// 2.2.10 RobotStaticStatus
export interface RobotStaticStatus {
    connection_state?: number;
    field_state?: number;
    alive_state?: number;
    robot_id?: number;
    robot_type?: number;
    performance_system_shooter?: number;
    performance_system_chassis?: number;
    level?: number;
    max_health?: number;
    max_heat?: number;
    heat_cooldown_rate?: number;
    max_power?: number;
    max_buffer_energy?: number;
    max_chassis_energy?: number;
}

// 2.2.11 RobotDynamicStatus
export interface RobotDynamicStatus {
    current_health?: number;
    current_heat?: number;
    last_projectile_fire_rate?: number;
    current_chassis_energy?: number;
    current_buffer_energy?: number;
    current_experience?: number;
    experience_for_upgrade?: number;
    total_projectiles_fired?: number;
    remaining_ammo?: number;
    is_out_of_combat?: boolean;
    out_of_combat_countdown?: number;
    can_remote_heal?: boolean;
    can_remote_ammo?: boolean;
}

// 2.2.12 RobotModuleStatus
export interface RobotModuleStatus {
    power_manager?: number;
    rfid?: number;
    light_strip?: number;
    small_shooter?: number;
    big_shooter?: number;
    uwb?: number;
    armor?: number;
    video_transmission?: number;
    capacitor?: number;
    main_controller?: number;
    laser_detection_module?: number;
}

// 2.2.13 RobotPosition
export interface RobotPosition {
    x?: number;
    y?: number;
    z?: number;
    yaw?: number;
    robot_id?: number;
}

// 2.2.14 Buff
export interface Buff {
    robot_id?: number;
    buff_type?: number;
    buff_level?: number;
    buff_max_time?: number;
    buff_left_time?: number;
}

// 2.2.15 PenaltyInfo
export interface PenaltyInfo {
    penalty_type?: number;
    penalty_effect_sec?: number;
    total_penalty_num?: number;
}

// 2.2.16 RobotPathPlanInfo
export interface RobotPathPlanInfo {
    intention?: number;
    start_pos_x?: number;
    start_pos_y?: number;
    offset_x?: number[];
    offset_y?: number[];
    sender_id?: number;
}

// 2.2.17 MapClickInfoNotify
export interface MapClickInfoNotify {
    is_send_all?: number;
    robot_id?: Uint8Array;
    mode?: number;
    enemy_id?: number;
    ascii?: number;
    type?: number;
    map_x?: number;
    map_y?: number;
}

// 2.2.18 RadarInfoToClient
export interface RadarSingleRobotInfo {
    target_pos_x?: number;
    target_pos_y?: number;
    is_high_light?: number;
}
export interface RadarInfoToClient {
    RadarSingleRobotInfo?: RadarSingleRobotInfo[];
}

// 2.2.19 CustomByteBlock
export interface CustomByteBlock {
    data?: Uint8Array;
}

// 2.2.20 AssemblyCommand
export interface AssemblyCommand {
    operation?: number;
    difficulty?: number;
}

// 2.2.21 TechCoreMotionStateSync
export interface TechCoreMotionStateSync {
    maximum_difficulty_level?: number;
    basic_state?: number;
    putin_state?: number;
    move_state?: number;
    rotate_state?: number;
    enemy_core_status?: number;
    remain_time_all?: number;
    remain_time_step?: number;
}

// 2.2.22 & 2.2.23 PerformanceSelection
export interface RobotPerformanceSelectionCommand {
    shooter?: number;
    chassis?: number;
    sentry_control?: number;
}
export interface RobotPerformanceSelectionSync {
    shooter?: number;
    chassis?: number;
    sentry_control?: number;
}
export interface PerformanceSelection {
    shooter?: number;
    chassis?: number;
    sentry_control?: number;
}

// 2.2.24 CommonCommand
export interface CommonCommand {
    cmd_type?: number;
    param?: number;
}

// 2.2.25 & 2.2.26 HeroDeployMode
export interface HeroDeployModeEventCommand {
    mode?: number;
}
export interface DeployModeStatusSync {
    status?: number;
}
export interface HeroDeployMode {
    status?: number;
    mode?: number;
}

// 2.2.27 & 2.2.28 Rune
export interface RuneActivateCommand {
    activate?: number;
}
export interface RuneStatusSync {
    rune_status?: number;
    activated_arms?: number;
    average_rings?: number;
}
export interface RuneStatus {
    activate?: number;
    rune_status?: number;
    activated_arms?: number;
    average_rings?: number;
}

// 2.2.29 SentinelStatusSync
export interface SentinelStatusSync {
    posture_id?: number;
    is_weakened?: boolean;
}

// 2.2.30 & 2.2.31 Dart
export interface DartCommand {
    target_id?: number;
    open?: boolean;
    launch_confirm?: boolean;
}
export interface DartSelectTargetStatusSync {
    target_id?: number;
    open?: number;
}
export interface DartInfo {
    target_id?: number;
    open?: boolean | number;
    launch_confirm?: boolean;
}

// 2.2.32 & 2.2.33 SentryCtrl
export interface SentryCtrlCommand {
    command_id?: number;
}
export interface SentryCtrlResult {
    command_id?: number;
    result_code?: number;
}
export interface GuardCtrl {
    command_id?: number;
    result_code?: number;
}

// 2.2.34 & 2.2.35 AirSupport
export interface AirSupportCommand {
    command_id?: number;
}
export interface AirSupportStatusSync {
    airsupport_status?: number;
    left_time?: number;
    cost_coins?: number;
    is_being_targeted?: number;
    shooter_status?: number;
}
export interface AirSupport {
    command_id?: number;
    airsupport_status?: number;
    left_time?: number;
    cost_coins?: number;
    is_being_targeted?: number;
    shooter_status?: number;
}`;

fs.writeFileSync('src/types/rmType.ts', tsTypes);
console.log('Updated src/types/rmType.ts');

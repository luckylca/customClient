//electron主进程文件
import { app, BrowserWindow, ipcMain } from 'electron'
import { VideoHandler } from './services/VideoHandler';
import { MqttService } from './services/MqttService';
const CONTROL_TOPIC = process.env.MQTT_CONTROL_TOPIC || 'KeyboardMouseControl';
const CONTROL_QOS: 0 = 0;
const COMMON_COMMAND_TOPIC = process.env.MQTT_COMMON_COMMAND_TOPIC || 'CommonCommand';
const COMMON_COMMAND_QOS: 0 = 0;
const HERO_DEPLOY_MODE_TOPIC = process.env.MQTT_HERO_DEPLOY_MODE_TOPIC || 'HeroDeployModeEventCommand';
const HERO_DEPLOY_MODE_QOS: 0 = 0;
const CUSTOM_CONTROL_TOPIC = process.env.MQTT_CUSTOM_CONTROL_TOPIC || 'CustomControl';
const CUSTOM_CONTROL_QOS: 0 = 0;
const PERFORMANCE_SELECTION_TOPIC = process.env.MQTT_PERFORMANCE_SELECTION_TOPIC || 'RobotPerformanceSelectionCommand';
const PERFORMANCE_SELECTION_QOS: 0 = 0;


app.whenReady().then(() => {
    const win = new BrowserWindow({
        fullscreen: false,
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    })
    win.webContents.on('did-fail-load', (_event, code, desc, url) => {
        console.error('[Main] 页面加载失败:', { code, desc, url });
    });

    win.webContents.on('render-process-gone', (_event, details) => {
        console.error('[Main] 渲染进程异常退出:', details);
    });

    win.removeMenu()
    const videoHandler = new VideoHandler(win);

    // Initialize MQTT Service

    const mqttService = new MqttService((topic, data) => {
        if (!win || win.isDestroyed()) return;

        if (topic === 'CustomByteBlock') {
            const streamData = (data as { data?: Uint8Array })?.data ?? data;
            win.webContents.send('custom-byte-block-stream', streamData);
            return;
        }

        win.webContents.send('mqtt-message', { topic, data });
    });

    // Store mqttService reference if needed for IPC later
    (global as any).mqttService = mqttService;

    const devUrlFromArgv = process.argv[2];
    const devUrlFromEnv = process.env.VITE_DEV_SERVER_URL;
    const devUrl = devUrlFromArgv || devUrlFromEnv;

    if (devUrl) {
        console.log('[Main] 加载开发地址:', devUrl);
        win.loadURL(devUrl)
    } else {
        console.log('[Main] 加载本地文件: index.html');
        win.loadFile('index.html')
    }
    // win.webContents.openDevTools()
    win.on('closed', () => {
        videoHandler.close();
        mqttService.disconnect();
    });
})

ipcMain.on('app-toggle-fullscreen', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        win.setFullScreen(!win.isFullScreen())
        // win.webContents.insertCSS('html, body { cursor: none !important; }');
    }
})
let canSentMqtt = false;
let lastControlLogTime = 0;
let controlRxCount = 0;
let controlActiveCount = 0;
let controlPublishedCount = 0;
ipcMain.on('start-mqtt-service', (event, payload?: { clientId?: string; robotId?: string }) => {
    canSentMqtt = true;
    controlRxCount = 0;
    controlActiveCount = 0;
    controlPublishedCount = 0;
    const mqttService = (global as any).mqttService as MqttService;
    console.log(`[Main] start-mqtt-service clientId=${payload?.clientId || '(empty)'} robotId=${payload?.robotId || '(empty)'}`);
    console.log(`[Main] control topic=${CONTROL_TOPIC} qos=${CONTROL_QOS}`);
    mqttService?.connect(payload?.clientId);
})
ipcMain.on('stop-mqtt-service', (event) => {
    canSentMqtt = false;
    const mqttService = (global as any).mqttService as MqttService;
    mqttService?.disconnect();
})
// IPC listener for keyboard/mouse control
import * as rm from './proto/rm_pb.js';
ipcMain.on('send-remote-control', (event, data) => {
    const mqttService = (global as any).mqttService as MqttService;
    controlRxCount += 1;
    const isActive =
        !!data?.leftButtonDown ||
        !!data?.rightButtonDown ||
        !!data?.midButtonDown ||
        (data?.keyboardValue ?? 0) !== 0 ||
        (data?.mouseX ?? 0) !== 0 ||
        (data?.mouseY ?? 0) !== 0 ||
        (data?.mouseZ ?? 0) !== 0;
    if (isActive) {
        controlActiveCount += 1;
    }

    if (mqttService) {
        if (canSentMqtt && mqttService.isConnected()) {
            const controlData = {
                mouseX: data?.mouseX ?? 0,
                mouseY: data?.mouseY ?? 0,
                mouseZ: data?.mouseZ ?? 0,
                leftButtonDown: !!data?.leftButtonDown,
                rightButtonDown: !!data?.rightButtonDown,
                keyboardValue: data?.keyboardValue ?? 0,
                midButtonDown: !!data?.midButtonDown,
            };
            mqttService.publish(CONTROL_TOPIC, controlData, rm.rm.KeyboardMouseControl, CONTROL_QOS);
            controlPublishedCount += 1;

            const now = Date.now();
            if (now - lastControlLogTime > 3000) {
                lastControlLogTime = now;
                console.log(
                    `[Main] control stats rx=${controlRxCount}, active=${controlActiveCount}, published=${controlPublishedCount}, connected=${mqttService.isConnected()} topic=${CONTROL_TOPIC}`,
                );
                if (isActive) {
                    console.log(
                        `[Main] control sample keyboardValue=${controlData.keyboardValue}, mouse=(${controlData.mouseX},${controlData.mouseY},${controlData.mouseZ}), buttons=(${controlData.leftButtonDown ? 1 : 0}${controlData.rightButtonDown ? 1 : 0}${controlData.midButtonDown ? 1 : 0})`,
                    );
                }
            }
        }
    }
});

ipcMain.on('send-common-command', (_event, payload?: { cmdType?: number; param?: number }) => {
    const mqttService = (global as any).mqttService as MqttService;
    if (!mqttService || !canSentMqtt || !mqttService.isConnected()) {
        console.warn('[Main] skip CommonCommand publish: mqtt not ready');
        return;
    }

    const rawCmdType = Number(payload?.cmdType ?? 0);
    const rawParam = Number(payload?.param ?? 0);
    if (!Number.isFinite(rawCmdType) || rawCmdType <= 0) {
        console.warn('[Main] invalid CommonCommand cmdType:', payload?.cmdType);
        return;
    }

    const commandData = {
        cmdType: Math.trunc(rawCmdType),
        param: Math.max(0, Math.trunc(rawParam)),
    };

    mqttService.publish(COMMON_COMMAND_TOPIC, commandData, rm.rm.CommonCommand, COMMON_COMMAND_QOS);
    console.log(
        `[Main] publish CommonCommand cmdType=${commandData.cmdType} param=${commandData.param} topic=${COMMON_COMMAND_TOPIC}`,
    );
});

ipcMain.on('send-hero-deploy-mode', (_event, payload?: { mode?: number }) => {
    const mqttService = (global as any).mqttService as MqttService;
    if (!mqttService || !canSentMqtt || !mqttService.isConnected()) {
        console.warn('[Main] skip HeroDeployModeEventCommand publish: mqtt not ready');
        return;
    }

    const rawMode = Number(payload?.mode ?? 0);
    if (!Number.isFinite(rawMode)) {
        console.warn('[Main] invalid HeroDeployModeEventCommand mode:', payload?.mode);
        return;
    }

    const commandData = {
        mode: rawMode === 1 ? 1 : 0,
    };

    mqttService.publish(HERO_DEPLOY_MODE_TOPIC, commandData, rm.rm.HeroDeployModeEventCommand, HERO_DEPLOY_MODE_QOS);
    console.log(
        `[Main] publish HeroDeployModeEventCommand mode=${commandData.mode} topic=${HERO_DEPLOY_MODE_TOPIC}`,
    );
});

ipcMain.on('send-custom-control', (_event, payload: Uint8Array) => {
    const mqttService = (global as any).mqttService as MqttService;
    if (!mqttService || !canSentMqtt || !mqttService.isConnected()) {
        return;
    }
    const commandData = {
        data: payload
    };
    mqttService.publish(CUSTOM_CONTROL_TOPIC, commandData, rm.rm.CustomControl, CUSTOM_CONTROL_QOS);
});

ipcMain.on('send-robot-performance-selection', (_event, payload?: { shooter?: number; chassis?: number; sentry_control?: number }) => {
    const mqttService = (global as any).mqttService as MqttService;
    if (!mqttService || !canSentMqtt || !mqttService.isConnected()) {
        console.warn('[Main] skip RobotPerformanceSelectionCommand publish: mqtt not ready');
        return;
    }

    const commandData = {
        shooter: Number(payload?.shooter ?? 0),
        chassis: Number(payload?.chassis ?? 0),
        sentry_control: Number(payload?.sentry_control ?? 0),
    };

    mqttService.publish(PERFORMANCE_SELECTION_TOPIC, commandData, rm.rm.RobotPerformanceSelectionCommand, PERFORMANCE_SELECTION_QOS);
    console.log(
        `[Main] publish RobotPerformanceSelectionCommand shooter=${commandData.shooter} chassis=${commandData.chassis} sentry_control=${commandData.sentry_control} topic=${PERFORMANCE_SELECTION_TOPIC}`,
    );
});
//electron主进程文件
import { app, BrowserWindow, ipcMain } from 'electron'
import { VideoHandler } from './services/VideoHandler';
import { MqttService } from './services/MqttService';
const CONTROL_TOPIC = process.env.MQTT_CONTROL_TOPIC || 'KeyboardMouseControl';
const CONTROL_QOS: 0 = 0;

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
        if (win && !win.isDestroyed()) {
            win.webContents.send('mqtt-message', { topic, data });
        }
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
import * as rm from './proto/rm_pb';
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
                // console.log(
                //     `[Main] control stats rx=${controlRxCount}, active=${controlActiveCount}, published=${controlPublishedCount}, connected=${mqttService.isConnected()} topic=${CONTROL_TOPIC}`,
                // );
                // if (isActive) {
                //     console.log(
                //         `[Main] control sample keyboardValue=${controlData.keyboardValue}, mouse=(${controlData.mouseX},${controlData.mouseY},${controlData.mouseZ}), buttons=(${controlData.leftButtonDown ? 1 : 0}${controlData.rightButtonDown ? 1 : 0}${controlData.midButtonDown ? 1 : 0})`,
                //     );
                // }
            }
        }
    }
});
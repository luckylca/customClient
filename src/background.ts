//electron主进程文件
import { app, BrowserWindow, ipcMain } from 'electron'
import { VideoHandler } from './services/VideoHandler';
import { MqttService } from './services/MqttService';

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
    win.removeMenu()
    const videoHandler = new VideoHandler(win);

    // Initialize MQTT Service

    const mqttService = new MqttService((topic, data) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('mqtt-message', { topic, data });
        }
    });
    mqttService.connect();

    // Store mqttService reference if needed for IPC later
    (global as any).mqttService = mqttService;

    if (process.argv[2]) {
        win.loadURL(process.argv[2])
    }
    else {
        win.loadFile('index.html')
    }
})

ipcMain.on('app-toggle-fullscreen', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        win.setFullScreen(!win.isFullScreen())
        // win.webContents.insertCSS('html, body { cursor: none !important; }');
    }
})
let canSentMqtt = false;
ipcMain.on('start-mqtt-service', (event) => {
    canSentMqtt = true;
})
ipcMain.on('stop-mqtt-service', (event) => {
    canSentMqtt = false;
})
// IPC listener for keyboard/mouse control
import * as rm from './proto/rm_pb';
ipcMain.on('send-remote-control', (event, data) => {
    const mqttService = (global as any).mqttService as MqttService;
    if (mqttService) {
        if (canSentMqtt) {
            const controlData = {
                mouseX: data?.mouseX ?? 0,
                mouseY: data?.mouseY ?? 0,
                mouseZ: data?.mouseZ ?? 0,
                leftButtonDown: !!data?.leftButtonDown,
                rightButtonDown: !!data?.rightButtonDown,
                keyboardValue: data?.keyboardValue ?? 0,
                midButtonDown: !!data?.midButtonDown,
            };
            mqttService.publish('KeyboardMouseControl', controlData, rm.rm.KeyboardMouseControl, 1);
        }
    }
});
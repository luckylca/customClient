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
    const mqttService = new MqttService();
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
    }
})
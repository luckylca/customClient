//electron主进程文件
import { app, BrowserWindow } from 'electron'


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
    if(process.argv[2]) {
        win.loadURL(process.argv[2])
    }
    else {
        win.loadFile('index.html')
    }
})
const { app, BrowserWindow } = require('electron')

const createWindow = () => {

    const win = new BrowserWindow({
        autoHideMenuBar: true,
    })

    win.maximize()

    win.loadURL('https://emby.kierankihn.com/web/index.html#!/music?serverId=dfec84876c6441d684d6baaa4c662879&parentId=6588&tab=songs', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
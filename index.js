const { app, BrowserView, BrowserWindow } = require('electron')

app.whenReady().then(() => {

    const win = new BrowserWindow({ width: 1920, height: 1080 })

    win.on('closed', function () {
        win = null
    })

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 1920, height: 1080 })
    view.webContents.loadURL('https://emby.kierankihn.com/web/index.html#!/music?serverId=dfec84876c6441d684d6baaa4c662879&parentId=6588&tab=songs')
})
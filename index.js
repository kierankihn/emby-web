const path = require('path');
const { app, BrowserWindow, Tray, Menu, } = require('electron');

let tray = null;

const createWindow = () => {

    const mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        icon: path.join(__dirname, './img/icon.ico')
    });

    mainWindow.webContents.openDevTools();

    tray = new Tray(path.join(__dirname, './img/icon.ico'));

    let menu = [
        {
            label: '显示主窗口',
            id: 'show-window',
            enabled: !mainWindow.show,
            click() {
                mainWindow.show();
            }
        },
        {
            label: '退出',
            role: 'quit'
        }
    ];

    menu = Menu.buildFromTemplate(menu);

    tray.setContextMenu(menu);

    mainWindow.maximize();

    mainWindow.loadURL('https://emby.kierankihn.com/web/index.html#!/music?serverId=dfec84876c6441d684d6baaa4c662879&parentId=6588&tab=songs', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

    mainWindow.on('minimize', ev => {
        ev.preventDefault();
        mainWindow.hide();
    });

    tray.on('double-click', () => {
        mainWindow.show();
    });

    mainWindow.on('hide', () => {
        menu.getMenuItemById('show-window').enabled = true;
        tray.setContextMenu(menu);
    });

    mainWindow.on('show', () => {
        menu.getMenuItemById('show-window').enabled = false;
        mainWindow.maximize();
        tray.setContextMenu(menu);
    });
};

app.whenReady().then(() => {
    createWindow();


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
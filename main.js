const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
  if (mainWindow) {
    return;
  }

}
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 359,
    frame: false,
    resizable: false,
    icon: __dirname + '/icon.png',
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('Calc.html');
});

// Listen for minimize and close events from the renderer process
ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// Handle the single instance lock
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  // If another instance is running, quit the app
  app.quit();
} else {
  app.whenReady().then(() => {
    // Create the main window
    createWindow();

    // This will handle the behavior when another instance tries to start
    app.on('second-instance', (event, argv, cwd) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})})};
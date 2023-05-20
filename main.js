const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const MainScreen = require("./screens/main/mainScreen");
const { autoUpdater, AppUpdater } = require('electron-updater')

let curWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  curWindow = new MainScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });


  autoUpdater.checkForUpdates();
});

autoUpdater.on("checking-for-update", () => {
  curWindow.showMessage("Checking for updates, current version " + app.getVersion())
})

autoUpdater.on("update-available", (info) => {
  curWindow.showMessage("update available")
  let pth = autoUpdater.downloadUpdate()
  curWindow.showMessage(pth)
})

autoUpdater.on('update-not-available', (info) => {
  curWindow.showMessage("no update available.")
})

autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage("update downloaded.")
})

autoUpdater.on("download-progress", (info) => {
  curWindow.showMessage(`downloading... ${info.transferred  * 100 / info.total}%`)
})

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info)
})

ipcMain.handle('restart', () => {
  autoUpdater.quitAndInstall(true, true)
})

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});


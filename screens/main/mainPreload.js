const { contextBridge, ipcRenderer } = require("electron");

let bridge = {
    updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
  sendRestart: () => ipcRenderer.invoke("restart")
};

contextBridge.exposeInMainWorld("bridge", bridge);
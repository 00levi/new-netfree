const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Llama al apagado del sistema
  shutdownComputer: () => ipcRenderer.invoke('shutdown-computer'),

  // Lee el archivo de control y devuelve los datos como objeto
  readControlFile: () => ipcRenderer.invoke('read-control-file'),

  // Podés agregar más funciones acá si las necesitás
});

const { app, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

// Importar la función desde el archivo externo src/electron/
const { createWindow } = require('./src/electron/window'); 
const { clearSessionData } = require('./src/electron/cleaner');
const { setupAdblocker } = require('./src/electron/adblocker');
const { shutdownComputer } = require('./src/electron/power');

// Lógica IPC para shutdown desde 
ipcMain.handle('shutdown-computer', () => {
  shutdownComputer();
});

// App lista
app.whenReady().then(async () => {
  clearSessionData();           // Limpiar cookies y caché
  await setupAdblocker();       // Activar bloqueador de anuncios
  createWindow();               // Crear ventana
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
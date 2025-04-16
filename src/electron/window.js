const { BrowserWindow, Menu } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, '../../preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  win.loadFile(path.join(__dirname, '../html/index.html'));

  // la barra de herramientas sacarla
  /*
  win.setMenuBarVisibility(false);
  Menu.setApplicationMenu(null);
  */

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http')) {
      event.preventDefault();
    }
  });

  return win;
}

module.exports = {
  createWindow,
  getWindow: () => win
};

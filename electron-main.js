const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 850,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    title: "Project Laser - Reengineered",
    autoHideMenuBar: true
  });

  // Load the root index.html directly (game assets live next to it)
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

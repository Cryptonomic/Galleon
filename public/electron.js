const { app, BrowserWindow, shell, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const configPath = path.join(__dirname, '../src/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { version } = config;

// Conditionally include the development tools that reload the app
if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

const createWindow = async() => {
  // Dynamic import for electron-is-dev
  const { default: isDev } = await import('electron-is-dev');

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Set the title of the main window
  mainWindow.setTitle(`Galleon v${version}`);

  // Remove the menu bar
  mainWindow.setMenu(null);

  // Open URL in user's browser.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  })

  if(isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
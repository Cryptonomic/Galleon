// In your main.js or main.ts for Electron

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Conditionally include the development tools that reload the app
if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    // Use the following for webpack-dev-server
    mainWindow.loadURL('http://localhost:9000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

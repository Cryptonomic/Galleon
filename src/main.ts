// In your main.js or main.ts for Electron

const { app, BrowserWindow } = window.require('electron');
const path = require('path');

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
    mainWindow.loadURL(`file://${__dirname}/renderer.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

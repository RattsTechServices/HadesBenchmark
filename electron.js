const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'src/preload.js')
    },
    icon: path.join(__dirname, 'public/icon.png')
  })

  // Em desenvolvimento, carrega o servidor de desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080')
    win.webContents.openDevTools()
  } else {
    // Em produção, carrega o arquivo index.html
    win.loadFile('dist/index.html')
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Manipuladores IPC
ipcMain.handle('run-benchmark', async (event, config) => {
  // Implementação do benchmark
  return { success: true, data: [] }
})

ipcMain.handle('save-results', async (event, results) => {
  // Implementação do salvamento
  return { success: true }
}) 
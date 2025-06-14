// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Hades Benchmark',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    mainWindow.loadFile('dist/index.html'); // Adjust the path based on your build directory

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// Criar diretório para salvar os benchmarks se não existir
const benchmarksDir = path.join(app.getPath('userData'), 'benchmarks');

async function ensureBenchmarksDir() {
    try {
        await fs.access(benchmarksDir);
    } catch {
        await fs.mkdir(benchmarksDir, { recursive: true });
    }
}

// Handler para salvar benchmark
ipcMain.handle('save-benchmark', async (event, { filename, data }) => {
    await ensureBenchmarksDir();
    const filePath = path.join(benchmarksDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
});

// Handler para carregar benchmarks
ipcMain.handle('load-benchmarks', async () => {
    await ensureBenchmarksDir();
    const files = await fs.readdir(benchmarksDir);
    const benchmarks = [];

    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(benchmarksDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(content);
            benchmarks.push({
                filename: file,
                ...data
            });
        }
    }

    return benchmarks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
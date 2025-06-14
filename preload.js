const { contextBridge, ipcRenderer } = require('electron')

// Expor APIs seguras para o processo de renderização
contextBridge.exposeInMainWorld('electron', {
    saveBenchmark: async (data) => {
        try {
            return await ipcRenderer.invoke('save-benchmark', data)
        } catch (error) {
            console.error('Erro ao salvar benchmark:', error)
            throw error
        }
    },
    loadBenchmarks: async () => {
        try {
            return await ipcRenderer.invoke('load-benchmarks')
        } catch (error) {
            console.error('Erro ao carregar benchmarks:', error)
            throw error
        }
    }
}) 
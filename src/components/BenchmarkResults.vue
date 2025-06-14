<template>
  <div class="benchmark-results">
    <div class="results-header">
      <h2>Resultados do Benchmark</h2>
      <div class="action-buttons">
        <button @click="saveResults" class="save-btn" :disabled="isSaving">
          {{ isSaving ? 'Salvando...' : 'Salvar Resultados' }}
        </button>
        <button @click="goBack" class="back-btn">Voltar</button>
      </div>
    </div>

    <div v-if="saveError" class="error-message">
      {{ saveError }}
    </div>

    <BenchmarkChart :results="results" />
    
    <div class="results-info">
      <h3>Configuração do Benchmark</h3>
      <div class="config-details">
        <p><strong>Base URL:</strong> {{ config.baseUrl }}</p>
        <p><strong>Headers:</strong></p>
        <ul>
          <li v-for="(value, key) in config.headers" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
        <p><strong>Endpoints:</strong></p>
        <div v-for="(endpoint, index) in config.endpoints" :key="index" class="endpoint-info">
          <p><strong>Path:</strong> {{ endpoint.path }}</p>
          <p><strong>Method:</strong> {{ endpoint.method }}</p>
          <p><strong>RPS:</strong> {{ endpoint.rps }}</p>
          <p><strong>Duração:</strong> {{ endpoint.duration }}s</p>
          <p v-if="endpoint.body"><strong>Body:</strong> {{ JSON.stringify(endpoint.body) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BenchmarkChart from './BenchmarkChart.vue'

export default {
  name: 'BenchmarkResults',
  components: {
    BenchmarkChart
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSaving: false,
      saveError: null
    }
  },
  methods: {
    async saveResults() {
      if (this.isSaving) return

      this.isSaving = true
      this.saveError = null

      try {
        const domain = new URL(this.config.baseUrl).hostname
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const filename = `${domain}-hades-benchmark-${timestamp}.json`
        
        const data = {
          config: this.config,
          results: this.results,
          timestamp: new Date().toISOString()
        }

        await window.electron.saveBenchmark({ filename, data })
        this.$emit('saved')
      } catch (error) {
        console.error('Erro ao salvar resultados:', error)
        this.saveError = 'Erro ao salvar os resultados. Por favor, tente novamente.'
      } finally {
        this.isSaving = false
      }
    },
    goBack() {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>
.benchmark-results {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.save-btn,
.back-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.save-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.back-btn {
  background-color: #2196F3;
  color: white;
}

.back-btn:hover {
  background-color: #1976D2;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
}

.results-info {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.config-details {
  margin-top: 15px;
}

.endpoint-info {
  margin: 15px 0;
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.endpoint-info p {
  margin: 5px 0;
}
</style> 
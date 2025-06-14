<template>
  <div class="benchmark-history">
    <h2>Histórico de Benchmarks</h2>
    <div v-if="benchmarks.length === 0" class="no-history">
      <p>Nenhum benchmark salvo ainda.</p>
    </div>
    <div v-else class="history-list">
      <div v-for="benchmark in benchmarks" :key="benchmark.filename" class="history-item" @click="loadBenchmark(benchmark)">
        <div class="history-info">
          <h3>{{ benchmark.filename }}</h3>
          <p class="timestamp">{{ formatDate(benchmark.timestamp) }}</p>
          <p class="domain">{{ benchmark.domain }}</p>
        </div>
        <div class="history-stats">
          <span class="stat success">Sucessos: {{ getTotalSuccess(benchmark) }}</span>
          <span class="stat error">Falhas: {{ getTotalFailures(benchmark) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BenchmarkHistory',
  data() {
    return {
      benchmarks: []
    }
  },
  async created() {
    await this.loadBenchmarks()
  },
  methods: {
    async loadBenchmarks() {
      try {
        this.benchmarks = await window.electron.loadBenchmarks()
      } catch (error) {
        console.error('Erro ao carregar benchmarks:', error)
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    },
    getTotalSuccess(benchmark) {
      return benchmark.results.reduce((acc, curr) => acc + curr.success, 0)
    },
    getTotalFailures(benchmark) {
      return benchmark.results.reduce((acc, curr) => acc + curr.fail, 0)
    },
    loadBenchmark(benchmark) {
      this.$emit('load', benchmark)
    }
  }
}
</script>

<style scoped>
.benchmark-history {
  padding: 20px;
  max-width: 1200px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin: 0 auto;
}

.no-history {
  text-align: center;
  padding: 40px;
  color: #666;
}

.history-list {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.history-item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.history-info h3 {
  margin: 0 0 5px 0;
  color: #2196F3;
}

.timestamp {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.domain {
  color: #4CAF50;
  font-weight: bold;
  margin: 5px 0;
}

.history-stats {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.stat {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.stat.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.stat.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
}
</style> 
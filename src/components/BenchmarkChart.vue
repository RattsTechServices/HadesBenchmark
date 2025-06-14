<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
    <div class="stats-container" v-if="stats">
      <h3>Estatísticas do Benchmark</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Total de Requisições:</span>
          <span class="stat-value">{{ stats.totalRequests }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Sucessos:</span>
          <span class="stat-value success">{{ stats.successCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Falhas:</span>
          <span class="stat-value error">{{ stats.failCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Tempo Médio de Resposta:</span>
          <span class="stat-value">{{ (stats.avgResponseTime).toFixed(2) }}ms</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Taxa de Sucesso:</span>
          <span class="stat-value">{{ stats.successRate }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BenchmarkChart',
  components: { Line },
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Requisições'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tempo (segundos)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Resultados do Benchmark'
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.results.map((_, index) => index + 1),
        datasets: [
          {
            label: 'Sucessos',
            data: this.results.map(r => r.success),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4
          },
          {
            label: 'Falhas',
            data: this.results.map(r => r.fail),
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4
          }
        ]
      }
    },
    stats() {
      if (!this.results.length) return null

      const totalRequests = this.results.reduce((acc, curr) => acc + curr.success + curr.fail, 0)
      const successCount = this.results.reduce((acc, curr) => acc + curr.success, 0)
      const failCount = this.results.reduce((acc, curr) => acc + curr.fail, 0)
      const successRate = ((successCount / totalRequests) * 100).toFixed(2)

      return {
        totalRequests,
        successCount,
        failCount,
        successRate,
        avgResponseTime: this.results.reduce((acc, curr) => acc + curr.avgResponseTime, 0) / this.results.length
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  padding: 20px;
  height: 400px;
  position: relative;
}

.stats-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-label {
  font-size: 0.9em;
  color: #666;
}

.stat-value {
  font-size: 1.2em;
  font-weight: bold;
}

.stat-value.success {
  color: #4CAF50;
}

.stat-value.error {
  color: #f44336;
}
</style> 
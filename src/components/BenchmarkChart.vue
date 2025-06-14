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
          <span class="stat-value">{{ stats.avgResponseTime.toFixed(2) }}ms</span>
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
              text: 'Requisições',
              color: 'var(--text-color)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              color: 'var(--text-color)',
              font: {
                size: 12
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tempo (segundos)',
              color: 'var(--text-color)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              color: 'var(--text-color)',
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'var(--text-color)',
              font: {
                size: 12,
                weight: 'bold'
              },
              padding: 20
            }
          },
          title: {
            display: true,
            text: 'Resultados do Benchmark',
            color: 'var(--text-color)',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            titleColor: 'var(--text-color)',
            bodyColor: 'var(--text-color)',
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            borderWidth: 1,
            padding: 10,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 12
            }
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
            tension: 0.4,
            borderWidth: 2
          },
          {
            label: 'Falhas',
            data: this.results.map(r => r.fail),
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4,
            borderWidth: 2
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
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  background-color: var(--card-bg);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid var(--border-color);
}

.stats-container h3 {
  color: var(--text-color);
  margin-bottom: 15px;
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
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-color);
}

.success {
  color: #4caf50;
}

.error {
  color: #f44336;
}

:root {
  --stats-bg: #f5f5f5;
}

[data-theme="dark"] {
  --stats-bg: #363636;
}
</style> 
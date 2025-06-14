<template>
  <div class="benchmark">
    <BenchmarkForm v-if="!isRunning" @start-benchmark="startBenchmark" @cancel="cancel" />
    <div v-else class="results-container">
      <BenchmarkChart :results="results" />
      <div class="benchmark-info">
        <p>Tempo restante: {{ remainingTime }} segundos</p>
      </div>
      <button @click="stopBenchmark" class="stop-btn">Parar Benchmark</button>
    </div>
  </div>
</template>

<script>
import BenchmarkForm from './BenchmarkForm.vue'
import BenchmarkChart from './BenchmarkChart.vue'
import axios from 'axios'

export default {
  name: 'ApiBenchmark',
  components: {
    BenchmarkForm,
    BenchmarkChart
  },
  data() {
    return {
      isRunning: false,
      results: [],
      interval: null,
      startTime: null,
      config: null,
      remainingTime: 0,
      durationInterval: null
    }
  },
  methods: {
    async startBenchmark(config) {
      this.config = config
      this.isRunning = true
      this.results = []
      this.startTime = Date.now()

      // Criar instância do axios com a configuração base
      const api = axios.create({
        baseURL: config.baseUrl,
        headers: config.headers
      })

      // Iniciar o benchmark para cada endpoint
      this.interval = setInterval(async () => {
        const currentSecond = Math.floor((Date.now() - this.startTime) / 1000)
        
        for (const endpoint of config.endpoints) {
          // Verificar se o endpoint já atingiu sua duração
          if (currentSecond >= endpoint.duration) continue

          const promises = []
          
          // Criar as requisições para este endpoint
          for (let i = 0; i < endpoint.rps; i++) {
            const startTime = Date.now()
            promises.push(
              api.request({
                url: endpoint.path,
                method: endpoint.method,
                data: endpoint.body
              })
              .then(() => ({
                success: true,
                responseTime: Date.now() - startTime
              }))
              .catch(() => ({
                success: false,
                responseTime: Date.now() - startTime
              }))
            )
          }

          // Aguardar todas as requisições deste endpoint
          const results = await Promise.all(promises)
          
          // Calcular estatísticas
          const successCount = results.filter(r => r.success).length
          const failCount = results.filter(r => !r.success).length
          const avgResponseTime = results.reduce((acc, curr) => acc + curr.responseTime, 0) / results.length

          // Atualizar resultados
          if (!this.results[currentSecond]) {
            this.results[currentSecond] = {
              success: 0,
              fail: 0,
              avgResponseTime: 0
            }
          }

          this.results[currentSecond].success += successCount
          this.results[currentSecond].fail += failCount
          this.results[currentSecond].avgResponseTime = 
            (this.results[currentSecond].avgResponseTime + avgResponseTime) / 2
        }

        // Verificar se todos os endpoints terminaram
        const maxDuration = Math.max(...config.endpoints.map(e => e.duration))
        if (currentSecond >= maxDuration) {
          this.stopBenchmark()
        }
      }, 1000)

      // Atualizar o tempo restante
      this.durationInterval = setInterval(() => {
        const currentSecond = Math.floor((Date.now() - this.startTime) / 1000)
        const maxDuration = Math.max(...config.endpoints.map(e => e.duration))
        this.remainingTime = Math.max(0, maxDuration - currentSecond)
      }, 1000)
    },
    stopBenchmark() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      if (this.durationInterval) {
        clearInterval(this.durationInterval)
        this.durationInterval = null
      }
      this.isRunning = false
      
      // Emitir evento de conclusão com os resultados e configuração
      this.$emit('complete', {
        results: this.results,
        config: this.config
      })
    },
    cancel() {
      this.stopBenchmark()
      this.$emit('cancel')
    }
  },
  beforeUnmount() {
    this.stopBenchmark()
  }
}
</script>

<style scoped>
.benchmark {
  padding: 20px;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.benchmark-info {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.stop-btn {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
}

.stop-btn:hover {
  background-color: #d32f2f;
}
</style> 
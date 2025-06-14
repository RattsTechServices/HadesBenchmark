<template>
  <div class="benchmark-form">
    <div class="base-url-section">
      <h2>Configuração Base</h2>
      <div class="form-group">
        <label>Base URL:</label>
        <input v-model="baseUrl" type="text" placeholder="https://api.example.com" class="input-field"/>
      </div>
      <div class="form-group">
        <label>Headers:</label>
        <div v-for="(header, index) in headers" :key="index" class="header-input">
          <input v-model="header.key" placeholder="Key" class="input-field"/>
          <input v-model="header.value" placeholder="Value" class="input-field"/>
          <button @click="removeHeader(index)" class="remove-btn">-</button>
        </div>
        <button @click="addHeader" class="add-btn">+ Adicionar Header</button>
      </div>
    </div>

    <div class="endpoints-section">
      <h2>Endpoints</h2>
      <div v-for="(endpoint, index) in endpoints" :key="index" class="endpoint-card">
        <div class="form-group">
          <label>Path:</label>
          <input v-model="endpoint.path" placeholder="/api/endpoint" class="input-field"/>
        </div>
        <div class="form-group">
          <label>Method:</label>
          <select v-model="endpoint.method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div class="form-group">
          <label>Requests per second:</label>
          <input v-model.number="endpoint.rps" type="number" min="1" class="input-field"/>
        </div>
        <div class="form-group">
          <label>Duração (segundos):</label>
          <input v-model.number="endpoint.duration" type="number" min="1" class="input-field"/>
        </div>
        <div class="form-group" v-if="endpoint.method !== 'GET'">
          <label>Request Body (JSON):</label>
          <textarea v-model="endpoint.body" placeholder="{ }" class="input-field"></textarea>
        </div>
        <button @click="removeEndpoint(index)" class="remove-btn">Remover Endpoint</button>
      </div>
      <button @click="addEndpoint" class="add-btn">+ Adicionar Endpoint</button>
    </div>

    <div class="action-buttons">
      <button @click="startBenchmark" class="start-btn" :disabled="!isValid">Iniciar Benchmark</button>
      <button @click="cancel" class="cancel-btn">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BenchmarkForm',
  data() {
    return {
      baseUrl: '',
      headers: [{ key: '', value: '' }],
      endpoints: [{
        path: '',
        method: 'GET',
        rps: 1,
        duration: 60,
        body: ''
      }]
    }
  },
  computed: {
    isValid() {
      return this.baseUrl && 
             this.endpoints.every(e => e.path && e.rps > 0 && e.duration > 0) &&
             this.headers.every(h => h.key && h.value)
    }
  },
  methods: {
    addHeader() {
      this.headers.push({ key: '', value: '' })
    },
    removeHeader(index) {
      this.headers.splice(index, 1)
    },
    addEndpoint() {
      this.endpoints.push({
        path: '',
        method: 'GET',
        rps: 1,
        duration: 60,
        body: ''
      })
    },
    removeEndpoint(index) {
      this.endpoints.splice(index, 1)
    },
    startBenchmark() {
      const config = {
        baseUrl: this.baseUrl,
        headers: this.headers.reduce((acc, { key, value }) => {
          if (key && value) acc[key] = value
          return acc
        }, {}),
        endpoints: this.endpoints.map(e => ({
          ...e,
          body: e.body ? JSON.parse(e.body) : undefined
        }))
      }
      this.$emit('start-benchmark', config)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.input-field {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
}

.benchmark-form {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.header-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.header-input input {
  flex: 1;
}

.endpoint-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.add-btn,
.remove-btn,
.start-btn,
.cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 0;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
}

.remove-btn {
  background-color: #f44336;
  color: white;
}

.start-btn {
  background-color: #2196F3;
  color: white;
  flex: 1;
  padding: 12px;
  font-size: 1.1em;
}

.cancel-btn {
  background-color: #9e9e9e;
  color: white;
  padding: 12px 24px;
  font-size: 1.1em;
}

.start-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

textarea {
  min-height: 100px;
  font-family: monospace;
}
</style> 
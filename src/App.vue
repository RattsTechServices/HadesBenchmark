<template>
  <div id="app">
    <ThemeSwitcher />
    <h1>🔥 Hades Benchmark</h1>
    <div class="main-content">
      <div v-if="currentView === 'home'" class="home-view">
        <BenchmarkHistory @load="loadBenchmark" />
        <button @click="startNewBenchmark" class="new-benchmark-btn">Novo Benchmark</button>
      </div>
      <div v-else-if="currentView === 'benchmark'" class="benchmark-view">
        <Benchmark @complete="onBenchmarkComplete" @cancel="goToHome" />
      </div>
      <div v-else-if="currentView === 'results'" class="results-view">
        <BenchmarkResults 
          :results="currentResults" 
          :config="currentConfig"
          @saved="onResultsSaved"
          @back="goToHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Benchmark from './components/Benchmark.vue'
import BenchmarkResults from './components/BenchmarkResults.vue'
import BenchmarkHistory from './components/BenchmarkHistory.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

export default {
  name: 'App',
  components: {
    Benchmark,
    BenchmarkResults,
    BenchmarkHistory,
    ThemeSwitcher
  },
  data() {
    return {
      currentView: 'home',
      currentResults: null,
      currentConfig: null
    }
  },
  methods: {
    startNewBenchmark() {
      this.currentView = 'benchmark'
    },
    onBenchmarkComplete(data) {
      this.currentResults = data.results
      this.currentConfig = data.config
      this.currentView = 'results'
    },
    loadBenchmark(benchmark) {
      this.currentResults = benchmark.results
      this.currentConfig = benchmark.config
      this.currentView = 'results'
    },
    onResultsSaved() {
      this.goToHome()
    },
    goToHome() {
      this.currentView = 'home'
      this.currentResults = null
      this.currentConfig = null
    }
  }
}
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --border-color: #e0e0e0;
  --card-bg: #ffffff;
  --hover-bg: #f5f5f5;
  --stats-bg: #f8f9fa;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #2c2c2c;
  --card-bg: #2c2c2c;
  --hover-bg: #3c3c3c;
  --stats-bg: #1a1a1a;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.new-benchmark-btn {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.2s;
}

.new-benchmark-btn:hover {
  background-color: #1976D2;
}

[data-theme="dark"] .new-benchmark-btn {
  background-color: #1976D2;
}

[data-theme="dark"] .new-benchmark-btn:hover {
  background-color: #1565C0;
}
</style>

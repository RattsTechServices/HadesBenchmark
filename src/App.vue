<template>
  <div id="app">
    <h1>🔥 Hades Benchmark</h1>
    <ApiBenchmark />
  </div>
</template>

<script>
import ApiBenchmark from './components/Benchmark.vue'

export default {
  name: 'App',
  components: {
    ApiBenchmark
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>

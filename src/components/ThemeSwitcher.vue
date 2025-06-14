<template>
  <div class="theme-switcher">
    <button @click="toggleTheme" class="theme-btn" :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'">
      <span v-if="isDark">☀️</span>
      <span v-else>🌙</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      isDark: false
    }
  },
  created() {
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
      this.applyTheme()
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.theme-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .theme-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 
# Release v1.0.1

## 🚀 Hades Benchmark - Atualização de Performance e Correções

Esta atualização traz melhorias significativas na performance e correções de bugs importantes.

### ✨ Novas Funcionalidades e Melhorias

- Otimização do processamento de requisições simultâneas
- Melhor gerenciamento de memória durante benchmarks longos
- Interface mais responsiva durante execução de testes
- Melhorias na visualização de gráficos em tempo real
- Suporte a timeouts personalizados por endpoint

### 🐛 Correções

- Corrigido vazamento de memória durante execução de benchmarks longos
- Resolvido problema de travamento ao interromper testes em andamento
- Ajustado comportamento de gráficos com grandes volumes de dados
- Corrigido problema de formatação de números em estatísticas
- Melhorada estabilidade geral da aplicação

### 📦 Distribuição

A versão 1.0.1 está disponível para as seguintes plataformas:

- **macOS**: `.dmg` (instalador) e `.zip` (portátil)
- **Linux**: `.AppImage` (portátil) e `.deb` (instalador)
- **Windows**: `.exe` (instalador NSIS) e `.exe` (portátil)

### 🔄 Modos de Execução

- **Desenvolvimento**: `npm run serve` (http://localhost:3400)
- **Desktop**: `npm run start`

### 📝 Notas de Uso

A ferramenta permite configurar:
- URL base da API
- Headers personalizados
- Múltiplos endpoints com diferentes configurações
- Métricas de performance em tempo real
- Análise detalhada de sucessos e falhas
- Timeouts personalizados por endpoint

### 🔗 Links

- [Documentação](https://github.com/RattsTechServices/hades-benchmark)
- [Issues](https://github.com/RattsTechServices/hades-benchmark/issues)
- [Licença](LICENSE)

---

# Release v1.0.0

## 🎉 Hades Benchmark - Primeira Versão Estável

Hades Benchmark é uma ferramenta de benchmark de API desenvolvida com Vue.js e Electron, oferecendo uma solução completa para testar o desempenho de múltiplos endpoints simultaneamente.

### ✨ Principais Funcionalidades

- Interface gráfica intuitiva e moderna
- Suporte a múltiplos endpoints simultâneos
- Configuração personalizada de headers HTTP
- Suporte completo aos métodos HTTP (GET, POST, PUT, DELETE)
- Visualização em tempo real através de gráficos interativos
- Estatísticas detalhadas de performance
- Suporte a requisições com corpo JSON
- Configuração granular de requisições por segundo
- Duração personalizada por endpoint

### 🛠️ Requisitos Técnicos

- Node.js 14.x ou superior
- npm 6.x ou superior

### 📦 Distribuição

A versão 1.0.0 está disponível para as seguintes plataformas:

- **macOS**: `.dmg` (instalador) e `.zip` (portátil)
- **Linux**: `.AppImage` (portátil) e `.deb` (instalador)
- **Windows**: `.exe` (instalador NSIS) e `.exe` (portátil)

### 🔄 Modos de Execução

- **Desenvolvimento**: `npm run serve` (http://localhost:3400)
- **Desktop**: `npm run start`

### 📝 Notas de Uso

A ferramenta permite configurar:
- URL base da API
- Headers personalizados
- Múltiplos endpoints com diferentes configurações
- Métricas de performance em tempo real
- Análise detalhada de sucessos e falhas

### 🔗 Links

- [Documentação](https://github.com/RattsTechServices/hades-benchmark)
- [Issues](https://github.com/RattsTechServices/hades-benchmark/issues)
- [Licença](LICENSE) 
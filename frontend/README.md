# Frontend - Weather API IPMA

Frontend React + TypeScript para consumir a Weather API IPMA.

## 🚀 Funcionalidades

- ✅ Interface moderna e responsiva
- ✅ Seleção dinâmica de distritos e localidades
- ✅ Previsão atual e por data específica
- ✅ Indicador de status da API
- ✅ Tratamento de erros
- ✅ Design mobile-first
- ✅ TypeScript para type safety

## 🛠️ Tecnologias Utilizadas

- **React 18** com Hooks
- **TypeScript** para tipagem
- **Axios** para chamadas HTTP
- **CSS Grid/Flexbox** para layout
- **CSS Animations** para UX

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16+)
- API Backend rodando na porta 8000

### Executar Frontend

```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências (se necessário)
npm install

# Executar em modo de desenvolvimento
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

### Executar Produção

```bash
# Build para produção
npm run build

# Os arquivos estarão na pasta build/
```

## 🎨 Interface

### Tela Principal
- **Header**: Título, descrição e status da API
- **Controles**: Seleção de distrito, localidade e data
- **Resultado**: Card com previsão meteorológica
- **Footer**: Informações sobre fonte dos dados

### Recursos Visuais
- **Gradientes**: Design moderno com cores azuis
- **Animações**: Transições suaves e efeitos hover
- **Responsivo**: Adaptado para mobile e desktop
- **Acessibilidade**: Labels e estrutura semântica

## 🔌 Integração com API

O frontend consome todos os endpoints da API:

```typescript
// Exemplos de uso dos serviços
weatherService.getDistricts()           // Lista distritos
weatherService.getLocationsByDistrict() // Lista localidades
weatherService.getCurrentForecast()     // Previsão atual
weatherService.getForecastByDate()      // Previsão por data
weatherService.healthCheck()            // Status da API
```

## 📱 Screenshots

### Desktop
- Layout em grid responsivo
- Cards com informações organizadas
- Controles intuitivos

### Mobile
- Layout adaptado para telas pequenas
- Botões touch-friendly
- Scroll otimizado

## 🧪 Desenvolvimento

### Estrutura de Arquivos
```
frontend/src/
├── components/
│   └── WeatherCard.tsx     # Componente de previsão
├── services/
│   └── weatherService.ts   # Cliente HTTP
├── types.ts                # Tipos TypeScript
├── App.tsx                 # Componente principal
├── App.css                 # Estilos principais
└── index.tsx              # Entry point
```

### Adicionando Novos Recursos
1. Criar componentes em `components/`
2. Adicionar tipos em `types.ts`
3. Implementar serviços em `services/`
4. Atualizar estilos em `App.css`

## 🔧 Configuração

### Variáveis de Ambiente
```env
REACT_APP_API_URL=http://localhost:8000
```

### Proxy de Desenvolvimento
O projeto está configurado com proxy para a API backend:
```json
"proxy": "http://localhost:8000"
```

## 📊 Performance

- **Bundle Size**: Otimizado com tree shaking
- **Loading States**: Indicadores de carregamento
- **Error Boundaries**: Tratamento de erros
- **Lazy Loading**: Componentes sob demanda

---

**Desenvolvido com ❤️ usando React + TypeScript**

# Elite & Estilo - Frontend (React)

## 🎨 Sobre

Interface web do Elite & Estilo desenvolvida com React, Vite, TailwindCSS e Framer Motion.

## 📋 Estrutura

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── HeroCarousel.jsx # Carrossel hero com 3 slides
│   │   └── ui/              # Componentes UI (buttons, etc)
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.jsx     # Página inicial
│   │   └── PlansPage.jsx    # Página de planos
│   ├── assets/              # Imagens e recursos estáticos
│   ├── services/            # Serviços e APIs
│   ├── lib/                 # Utilitários
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais + Tailwind
├── public/                  # Arquivos públicos
├── index.html               # HTML template
├── package.json
├── vite.config.js           # Configuração Vite
└── tailwind.config.js       # Configuração TailwindCSS
```

## 🛠️ Stack Tecnológico

### Core
- **React 18** - Biblioteca UI
- **Vite 7** - Build tool ultra-rápido
- **React Router DOM 6** - Roteamento SPA

### Estilização
- **TailwindCSS 3** - Framework CSS utility-first
- **Framer Motion** - Animações fluidas

### UI/UX
- **Swiper.js** - Carrossel moderno e responsivo
- **Lucide React** - Ícones modernos
- **Radix UI** - Componentes acessíveis

## ✨ Componentes Principais

### HeroCarousel

Carrossel hero com 3 slides animados na página inicial.

**Características:**
- ✅ 3 slides com imagens e textos diferentes
- ✅ Autoplay (5 segundos por slide)
- ✅ Controles de navegação (prev/next)
- ✅ Indicadores de paginação (dots)
- ✅ Efeito fade entre slides
- ✅ Totalmente responsivo
- ✅ Touch/swipe enabled
- ✅ Pausa ao passar o mouse
- ✅ Animações suaves com Framer Motion

**Uso:**
```jsx
import HeroCarousel from './components/HeroCarousel'

function App() {
  return <HeroCarousel />
}
```

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

```bash
# Navegar para a pasta frontend
cd frontend

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

### Linting

```bash
# Rodar ESLint
npm run lint
```

## 🎨 Design System

### Cores Primárias

```js
primary: 'hsl(262 83% 58%)',      // Purple #8B5CF6
secondary: 'hsl(210 40% 96%)',    // Slate #F1F5F9
accent: 'hsl(262 83% 58%)',       // Purple-600 #9333EA
```

### Tipografia

- **Font:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700, 800

### Breakpoints (TailwindCSS)

```js
sm: '640px',   // Mobile landscape
md: '768px',   // Tablet
lg: '1024px',  // Desktop
xl: '1280px',  // Large desktop
2xl: '1536px'  // Extra large
```

## 📱 Responsividade

O frontend é **100% responsivo** e otimizado para:

- 📱 **Mobile:** < 768px
- 📱 **Tablet:** 768px - 1024px
- 🖥️ **Desktop:** > 1024px

Todos os componentes adaptam automaticamente:
- Layout e grid
- Tipografia e espaçamentos
- Imagens e mídias
- Navegação e menus

## 🔌 Integração com Backend

### Configuração

As requisições API são feitas para:

```js
// Desenvolvimento local
baseURL: 'http://localhost:8888/.netlify/functions/salons-function'

// Produção
baseURL: 'https://elitestilo.netlify.app/.netlify/functions/salons-function'
```

### Exemplo de uso

```jsx
// Buscar salões
fetch('/.netlify/functions/salons-function/salons')
  .then(res => res.json())
  .then(data => setSalons(data))

// Buscar com filtro
fetch(`/.netlify/functions/salons-function/salons/search?q=Salvador`)
  .then(res => res.json())
  .then(data => setFilteredSalons(data))
```

## 🎭 Animações

### Framer Motion

Usado para animações suaves:

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo animado
</motion.div>
```

### Swiper.js

Usado no HeroCarousel:

```jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
```

## 🧩 Componentes UI

### Button

Componente de botão reutilizável com variantes:

```jsx
import { Button } from './components/ui/button'

<Button variant="default">Clique aqui</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

## 📦 Dependências Principais

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.0",
  "swiper": "^11.x",
  "framer-motion": "^12.15.0",
  "lucide-react": "^0.510.0",
  "tailwindcss": "^3.4.15"
}
```

## 🐛 Troubleshooting

### Build falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Vite não inicia

```bash
# Verificar porta em uso
lsof -ti:5173 | xargs kill -9

# Iniciar novamente
npm run dev
```

### Imagens não carregam

Verifique se as imagens estão em:
- `src/assets/` para imports
- `public/` para assets estáticos

## 🚀 Deploy

### Netlify

O frontend é automaticamente deployed quando:
1. Push para branch `main`
2. Build command: `npm run build`
3. Publish directory: `dist`

### Configuração Netlify

```toml
[build]
  command = "cd frontend && npm ci && npm run build"
  publish = "frontend/dist"
```

## 📚 Recursos

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper.js](https://swiperjs.com/)

## 📞 Contato

Para dúvidas sobre o frontend, abra uma issue no GitHub.

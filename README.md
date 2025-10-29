# Elite & Estilo 💈✨

Sistema de gestão completo para barbearias e salões de beleza, desenvolvido com React, Node.js, PostgreSQL/Neon e tecnologias modernas.

🌐 **Site:** https://elitestilo.netlify.app  
📱 **GitHub:** https://github.com/cristiano-superacao/elite-estilo  
📊 **Status:** ✅ Em Produção

---

## 🚀 Funcionalidades

### Frontend
✅ **Carrossel Hero** - 3 slides animados com autoplay e controles  
✅ **Página de Planos** - 4 opções de planos (Teste Grátis, Mensal, Semestral, Anual)  
✅ **Catálogo de Salões** - Busca, filtros, avaliações e informações detalhadas  
✅ **Sistema de Agendamento** - Modal interativo com integração WhatsApp  
✅ **Promoções Especiais** - Cards animados com descontos e ofertas  
✅ **Design Responsivo** - Otimizado para mobile, tablet e desktop  
✅ **Navegação Fluida** - Header glass effect, menu mobile e transições suaves  

### Backend
✅ **API RESTful** - Node.js/Express com Netlify Functions  
✅ **Banco de Dados** - PostgreSQL (Neon) com Prisma ORM  
✅ **Modelo Completo de Dados:**
  - 👥 Users (clientes, donos de salões, admins)
  - 💈 Salons (informações completas dos estabelecimentos)
  - 💳 Plans (planos de assinatura: Gratuito, Mensal, Semestral, Anual)
  - 📅 Appointments (agendamentos com controle de status)
  - 🎉 Promotions (promoções e ofertas especiais)
  - ⭐ Reviews (avaliações e feedback dos clientes)
  - 💬 Chat Messages (sistema de mensagens)

✅ **Endpoints:**
  - `GET /api/salons` - Lista todos os salões
  - `GET /api/salons/search?q=termo` - Busca salões por nome, cidade ou serviço
  - `POST /api/appointments` - Cria agendamento
  - Documentação completa em [DATABASE.md](./DATABASE.md)

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **Vite 6** - Build tool ultra-rápido
- **TailwindCSS 3** - Framework CSS utility-first
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **React Router DOM** - Roteamento SPA

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL 15+** - Banco de dados relacional
- **Prisma ORM** - ORM type-safe e moderno
- **Neon** - PostgreSQL serverless na nuvem
- **Netlify Functions** - Serverless backend

---

## 📋 Setup e Instalação

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Conta Neon (PostgreSQL)
- Conta Netlify

### 1. Clone o Repositório
```bash
git clone https://github.com/cristiano-superacao/elite-estilo.git
cd elite-estilo/elite-estilo
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://usuario:senha@ep-endereco.neon.tech/dbname?sslmode=require"
NODE_ENV="development"
```

### 4. Configure o Banco de Dados

**Opção A: Usando Prisma ORM (Recomendado)**

```bash
# Gerar Prisma Client
npm run db:generate

# Criar e aplicar migrações
npm run db:migrate

# Popular banco com dados de exemplo (opcional)
npm run db:seed
```

**Opção B: Usando SQL Direto**

Execute o script SQL completo em `prisma/migrations/init.sql` no seu banco Neon via psql ou interface web:

```bash
psql $DATABASE_URL < prisma/migrations/init.sql
```

Para mais detalhes, veja [DATABASE.md](./DATABASE.md) e [prisma/README.md](./prisma/README.md).

### 5. Desenvolvimento Local
```bash
npm run dev
```
Acesse: http://localhost:5173

### 6. Build para Produção
```bash
npm run build
npm run preview
```

---

## 🚀 Deploy

### Netlify (Automático via Git)

1. **Conecte o Repositório GitHub ao Netlify**
2. **Configure o Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `api`
   - Node version: `20`

3. **Adicione as Variáveis de Ambiente no Netlify:**
   - `NEON_DATABASE_URL`
   - `NODE_ENV=production`

4. **Deploy Automático:**
   - Todo push para `main` dispara deploy automático

### Deploy Manual via CLI
```bash
npm install -g netlify-cli
netlify login
cd elite-estilo
netlify deploy --prod --dir=dist
```

---

## 📁 Estrutura do Projeto

```
elite-estilo/
├── api/                          # Backend Serverless
│   ├── database.js               # API com funções helper do Prisma
│   ├── prisma-salons.js          # Netlify Function com Prisma
│   ├── db.js                     # Conexão PostgreSQL/Neon (legacy)
│   ├── db.sql                    # Script legacy (veja prisma/migrations)
│   └── salons.js                 # API Express (Netlify Function - legacy)
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Schema do banco de dados
│   ├── migrations/               # Migrações SQL
│   │   └── init.sql              # Schema completo com triggers
│   ├── example-queries.js        # Exemplos de uso do Prisma
│   └── README.md                 # Documentação do Prisma
├── src/
│   ├── lib/
│   │   └── prisma.js             # Cliente Prisma singleton
│   ├── assets/                   # Imagens e recursos estáticos
│   │   └── images.js             # Exportações de imagens
│   ├── components/
│   │   └── ui/                   # Componentes UI reutilizáveis
│   │       └── button.jsx
│   ├── pages/
│   │   ├── HomePage.jsx          # Página inicial (integrada com API)
│   │   └── PlansPage.jsx         # Página de planos
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globais + Tailwind
├── public/                       # Arquivos públicos
├── dist/                         # Build de produção
├── .env                          # Variáveis de ambiente (não commitado)
├── .env.example                  # Exemplo de variáveis
├── DATABASE.md                   # Documentação completa do banco
├── netlify.toml                  # Configuração Netlify
├── prisma.config.ts              # Configuração Prisma
├── tailwind.config.js            # Configuração Tailwind
├── vite.config.js                # Configuração Vite
├── package.json                  # Dependências e scripts
└── README.md                     # Documentação
```

---

## 🔐 Segurança

- ✅ Variáveis de ambiente protegidas
- ✅ Conexão SSL com banco de dados
- ✅ Validação de inputs no backend
- ✅ CORS configurado
- ✅ Rate limiting (Netlify)

---

## 📱 Responsividade

O sistema é **100% responsivo** com breakpoints otimizados:
- 📱 **Mobile:** < 768px
- 📱 **Tablet:** 768px - 1024px
- 🖥️ **Desktop:** > 1024px

Todos os componentes adaptam layout, tipografia e espaçamento automaticamente.

---

## 🎨 Design System

### Cores Primárias
- **Primary:** Purple #8B5CF6 (`hsl(262 83% 58%)`)
- **Secondary:** Slate #F1F5F9
- **Accent:** Purple-600 #9333EA

### Tipografia
- **Font:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700, 800

### Componentes
- Glass effect (backdrop-blur)
- Gradientes modernos
- Sombras suaves
- Animações com Framer Motion
- Cards hover com elevação

---

## 🧪 Testes

Para testar localmente:
```bash
# Teste de build
npm run build

# Teste de preview
npm run preview

# Teste da API (com servidor local)
netlify dev
```

---

## 📞 Contato e Suporte

- **WhatsApp:** [(71) 99337-2960](https://wa.me/5571993372960)
- **E-mail:** contato@elitestilo.com
- **Instagram:** [@elitestilo](https://instagram.com/elitestilo)
- **Localização:** Salvador, BA - Brasil
- **GitHub Issues:** [Reportar Bug](https://github.com/cristiano-superacao/elite-estilo/issues)

---

## 📄 Licença

© 2025 Elite & Estilo. Todos os direitos reservados.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 🎯 Roadmap

- [ ] Sistema de autenticação (login/registro)
- [ ] Dashboard administrativo para salões
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] App mobile (React Native)
- [ ] Sistema de pagamento integrado
- [ ] Programa de fidelidade
- [ ] API pública documentada (Swagger)

---

**Desenvolvido com ❤️ por Cristiano Superação**

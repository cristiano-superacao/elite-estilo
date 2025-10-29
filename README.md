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
✅ **Banco de Dados** - PostgreSQL (Neon) na nuvem  
✅ **Endpoints:**
  - `GET /api/salons` - Lista todos os salões
  - `GET /api/salons/search?q=termo` - Busca salões por nome, cidade ou serviço
  - `POST /api/appointments` - Cria agendamento

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
- **PostgreSQL** - Banco de dados relacional
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
NEON_DATABASE_URL="postgresql://usuario:senha@ep-endereco.neon.tech/dbname?sslmode=require"
NODE_ENV="development"
```

### 4. Configure o Banco de Dados
Execute o script SQL em `api/db.sql` no seu banco Neon:
```sql
CREATE TABLE salons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  image TEXT,
  address VARCHAR(200),
  city VARCHAR(100),
  rating NUMERIC(2,1),
  reviews INT,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  hours VARCHAR(100),
  services TEXT[],
  prices JSONB,
  specialties TEXT[],
  badge VARCHAR(50),
  color VARCHAR(50),
  description TEXT,
  amenities TEXT[],
  owner VARCHAR(100)
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  service VARCHAR(100),
  date DATE,
  hour TIME
);
```

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
│   ├── db.js                     # Conexão PostgreSQL/Neon
│   ├── db.sql                    # Script de criação de tabelas
│   └── salons.js                 # API Express (Netlify Function)
├── src/
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
├── netlify.toml                  # Configuração Netlify
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

## 📱 App Mobile (React Native)

O Elite & Estilo agora possui um aplicativo móvel desenvolvido com React Native e Expo!

### Funcionalidades do App Mobile
- ✅ **Autenticação completa** - Login e registro de usuários
- ✅ **Armazenamento seguro** - Tokens JWT protegidos com SecureStore
- ✅ **Validação de dados** - Validação em tempo real com feedback visual
- ✅ **Navegação fluida** - React Navigation com rotas protegidas
- ✅ **API integrada** - Consumo da API Node.js/Express
- 🔜 **Catálogo de salões** - Navegação e busca de salões
- 🔜 **Sistema de agendamento** - Marcar horários via app
- 🔜 **Visualização de planos** - Planos e assinaturas
- 🔜 **Notificações push** - Alertas e lembretes

Para mais informações sobre o app mobile, consulte: [Mobile App README](./mobile/README.md)

## 🎯 Roadmap

- [x] Sistema de autenticação (login/registro) - **IMPLEMENTADO**
- [x] App mobile (React Native) - **IMPLEMENTADO**
- [x] API de autenticação JWT - **IMPLEMENTADO**
- [ ] Dashboard administrativo para salões
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] Sistema de pagamento integrado
- [ ] Programa de fidelidade
- [ ] API pública documentada (Swagger)

---

**Desenvolvido com ❤️ por Cristiano Superação**

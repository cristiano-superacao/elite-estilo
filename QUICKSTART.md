# Elite & Estilo - Quick Start Guide

Guia rápido para começar a desenvolver no projeto Elite & Estilo.

## 🚀 Setup Rápido (5 minutos)

### 1. Clone o Repositório

```bash
git clone https://github.com/cristiano-superacao/elite-estilo.git
cd elite-estilo
```

### 2. Configure Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas credenciais
nano .env
```

Configure:
```env
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"
JWT_SECRET="sua-chave-secreta-aqui"
NODE_ENV="development"
```

### 3. Instale Dependências

```bash
# Frontend web
npm install

# Mobile app (opcional)
cd mobile
npm install
cd ..
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
# Modo 1: Apenas frontend web
npm run dev
# Acesse: http://localhost:5173

# Modo 2: Frontend + Backend (Netlify Dev)
netlify dev
# Acesse: http://localhost:8888
```

### 5. Inicie o Mobile App (Opcional)

```bash
cd mobile
npm start
# Escaneie o QR code com Expo Go
```

---

## 📁 Estrutura do Projeto

```
elite-estilo/
├── api/                    # Backend API (Node.js/Express)
│   ├── auth.js            # Endpoints de autenticação
│   ├── salons.js          # Endpoints de salões
│   └── db.js              # Conexão PostgreSQL
│
├── src/                    # Frontend Web (React)
│   ├── pages/             # Páginas
│   ├── components/        # Componentes reutilizáveis
│   ├── services/          # Services (API calls)
│   └── App.jsx            # Componente principal
│
├── mobile/                 # Mobile App (React Native)
│   ├── src/
│   │   ├── screens/       # Telas do app
│   │   └── services/      # Services (Auth, API)
│   ├── App.js             # App principal
│   └── config.js          # Configuração de API
│
├── public/                 # Assets públicos
├── package.json            # Dependências web
└── README.md              # Documentação principal
```

---

## 🛠️ Comandos Úteis

### Frontend Web

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linter
npm run lint
```

### Backend API (Local)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar servidor local com functions
netlify dev

# API estará em: http://localhost:8888/.netlify/functions
```

### Mobile App

```bash
cd mobile

# Iniciar Expo
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios
```

---

## 🔑 Testando a API

### 1. Registrar Usuário

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Usuario",
    "email": "teste@email.com",
    "password": "senha123",
    "phone": "(71) 99999-9999"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "senha123"
  }'
```

Resposta inclui o `token` JWT.

### 3. Acessar Endpoint Protegido

```bash
curl -X GET http://localhost:8888/.netlify/functions/auth-function/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📱 Testando o Mobile App

### 1. Iniciar o App

```bash
cd mobile
npm start
```

### 2. Escanear QR Code

- **iOS:** Use a câmera nativa
- **Android:** Use o app Expo Go

### 3. Testar Login

1. Abra o app no dispositivo
2. Digite email e senha
3. Click em "Entrar"
4. Você será redirecionado para a Home

### 4. Criar Nova Conta

1. Click em "Cadastre-se"
2. Preencha os dados
3. Click em "Criar Conta"
4. Conta será criada e você fará login automaticamente

---

## 🗄️ Configurar Banco de Dados

### Opção 1: Neon (Cloud - Recomendado)

1. Crie conta em [neon.tech](https://neon.tech/)
2. Crie novo projeto
3. Copie connection string
4. Execute SQL do arquivo `api/db.sql`

### Opção 2: PostgreSQL Local

```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Criar banco
sudo -u postgres createdb elitestilo

# Executar schema
psql -U postgres -d elitestilo -f api/db.sql

# Connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/elitestilo"
```

---

## 🔧 Desenvolvimento

### Adicionar Nova Tela no Mobile

1. Crie arquivo em `mobile/src/screens/MinhaScreen.js`
2. Adicione rota em `mobile/App.js`:

```javascript
<Stack.Screen
  name="MinhaScreen"
  component={MinhaScreen}
  options={{ title: 'Minha Tela' }}
/>
```

### Adicionar Novo Endpoint na API

1. Edite `api/auth.js` ou `api/salons.js`
2. Adicione novo endpoint:

```javascript
app.get('/novo-endpoint', authenticateToken, async (req, res) => {
  // Sua lógica aqui
  res.json({ message: 'Sucesso!' });
});
```

### Adicionar Nova Página Web

1. Crie arquivo em `src/pages/MinhaPage.jsx`
2. Adicione rota em `src/App.jsx`:

```javascript
<Route path="/minha-pagina" element={<MinhaPage />} />
```

---

## 🐛 Debug

### Ver Logs do Backend

```bash
# Em desenvolvimento com Netlify Dev
netlify dev
# Logs aparecem no console
```

### Ver Logs do Mobile

```bash
# Expo mostra logs no terminal
npm start
# Ou use React Native Debugger
```

### Inspecionar Requisições HTTP

Use extensão do navegador:
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- Network tab do DevTools (F12)

---

## 📚 Recursos

### Documentação
- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Mobile README](./mobile/README.md)

### Links Úteis
- [React Docs](https://react.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Neon Docs](https://neon.tech/docs)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 🆘 Problemas Comuns

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### "Port already in use"
```bash
# Parar processos na porta 5173
lsof -ti:5173 | xargs kill -9
```

### "Database connection failed"
- Verifique DATABASE_URL no .env
- Teste conexão: `psql $DATABASE_URL`

### Expo não conecta
- Verifique se está na mesma rede Wi-Fi
- Tente modo tunnel: `expo start --tunnel`

---

## 📞 Suporte

- GitHub Issues: [Reportar Bug](https://github.com/cristiano-superacao/elite-estilo/issues)
- Email: contato@elitestilo.com
- WhatsApp: (71) 99337-2960

---

**Happy Coding! 🚀**

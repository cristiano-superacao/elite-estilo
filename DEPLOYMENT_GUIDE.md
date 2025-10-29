# Elite & Estilo - Deployment Guide

Este guia explica como fazer o deploy completo do sistema Elite & Estilo, incluindo backend (API), frontend web e aplicativo mobile.

## 📋 Índice

1. [Backend API (Node.js + PostgreSQL)](#backend-api)
2. [Frontend Web (React + Vite)](#frontend-web)
3. [Mobile App (React Native + Expo)](#mobile-app)
4. [Configuração do Banco de Dados](#database-setup)
5. [Variáveis de Ambiente](#environment-variables)

---

## 1. Backend API (Node.js + PostgreSQL) {#backend-api}

### Pré-requisitos
- Conta no [Netlify](https://www.netlify.com/)
- Conta no [Neon](https://neon.tech/) (PostgreSQL serverless)
- Node.js 20+

### Passo 1: Configurar Banco de Dados no Neon

1. Acesse [Neon Console](https://console.neon.tech/)
2. Crie um novo projeto
3. Copie a connection string (formato: `postgresql://user:pass@host/db`)
4. Execute o script SQL do arquivo `api/db.sql` no Query Editor do Neon

### Passo 2: Deploy no Netlify

#### Via GitHub (Recomendado)

1. Acesse [Netlify](https://app.netlify.com/)
2. Click em "Add new site" > "Import an existing project"
3. Conecte com GitHub e selecione o repositório `elite-estilo`
4. Configure o build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `api`

5. Adicione as variáveis de ambiente:
   - `DATABASE_URL` - Connection string do Neon
   - `JWT_SECRET` - String secreta para JWT (mínimo 32 caracteres)
   - `NODE_ENV` - `production`

6. Click em "Deploy site"

#### Via CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login no Netlify
netlify login

# Deploy
cd /path/to/elite-estilo
netlify deploy --prod --dir=dist
```

### Passo 3: Testar Endpoints da API

```bash
# Testar registro
curl -X POST https://seu-site.netlify.app/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "password": "senha123"
  }'

# Testar login
curl -X POST https://seu-site.netlify.app/.netlify/functions/auth-function/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "senha123"
  }'
```

---

## 2. Frontend Web (React + Vite) {#frontend-web}

### Deploy Automático

O frontend já está configurado para deploy automático no Netlify junto com o backend. Todo push para a branch `main` dispara um novo deploy.

### Build Local (Teste)

```bash
cd /path/to/elite-estilo
npm install
npm run build
npm run preview
```

---

## 3. Mobile App (React Native + Expo) {#mobile-app}

### Pré-requisitos
- Node.js 20+
- Expo CLI: `npm install -g expo-cli`
- Conta no [Expo](https://expo.dev/)

### Passo 1: Configurar API Endpoint

Edite o arquivo `mobile/config.js`:

```javascript
const API_URL = 'https://seu-site.netlify.app/.netlify/functions';
```

### Passo 2: Instalar Dependências

```bash
cd mobile
npm install
```

### Passo 3: Adicionar Assets (Ícones)

Adicione os seguintes arquivos na pasta `mobile/assets/`:
- `icon.png` (1024x1024)
- `splash.png` (1284x2778)
- `adaptive-icon.png` (1024x1024)
- `favicon.png` (48x48)

### Passo 4: Desenvolvimento Local

```bash
# Iniciar Expo
cd mobile
npm start

# Escanear QR code com Expo Go app
```

### Passo 5: Build e Publicação

#### Build para Android (APK)

```bash
cd mobile
eas build --platform android --profile preview
```

#### Build para iOS (App Store)

```bash
cd mobile
eas build --platform ios --profile production
```

#### Publicar no Expo (OTA Updates)

```bash
cd mobile
expo publish
```

### Passo 6: Submissão às Stores

#### Google Play Store

1. Crie conta no [Google Play Console](https://play.google.com/console/)
2. Baixe o APK gerado pelo EAS Build
3. Crie novo app e faça upload do APK
4. Preencha informações e screenshots
5. Submeta para revisão

#### Apple App Store

1. Crie conta no [Apple Developer Program](https://developer.apple.com/)
2. Baixe o IPA gerado pelo EAS Build
3. Use Transporter app para enviar para App Store Connect
4. Preencha informações e screenshots
5. Submeta para revisão

---

## 4. Configuração do Banco de Dados {#database-setup}

### Esquema do Banco

Execute o seguinte SQL no Neon Query Editor:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Tabela de salões
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

-- Tabela de agendamentos
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  service VARCHAR(100),
  date DATE,
  hour TIME
);
```

### Inserir Dados de Teste

```sql
-- Inserir usuário de teste
INSERT INTO users (name, email, password_hash, phone)
VALUES (
  'Usuário Teste',
  'teste@elitestilo.com',
  '$2a$10$examplehashhere', -- Use bcrypt.hash('senha123', 10)
  '(71) 99999-9999'
);
```

---

## 5. Variáveis de Ambiente {#environment-variables}

### Backend (Netlify)

Configurar em: Site Settings > Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_SECRET=sua-chave-secreta-muito-longa-e-aleatoria-aqui
NODE_ENV=production
```

### Mobile App (config.js)

Editar diretamente no código:

```javascript
const API_URL = 'https://seu-site.netlify.app/.netlify/functions';
```

### Frontend Web

Não requer variáveis de ambiente adicionais. A API é consumida via Netlify Functions na mesma URL.

---

## 🔐 Segurança em Produção

### Checklist de Segurança

- [ ] JWT_SECRET com no mínimo 32 caracteres aleatórios
- [ ] DATABASE_URL com SSL habilitado (`?sslmode=require`)
- [ ] Senhas criptografadas com bcrypt (10 rounds)
- [ ] Tokens expiram após 7 dias
- [ ] HTTPS habilitado em produção (automático no Netlify)
- [ ] CORS configurado adequadamente
- [ ] Rate limiting ativo (automático no Netlify)

### Gerar JWT Secret Seguro

```bash
# No terminal (Linux/Mac)
openssl rand -base64 32

# Ou em Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🧪 Testes

### Testar Backend API

```bash
# Teste manual com curl
curl -X POST https://seu-site.netlify.app/.netlify/functions/auth-function/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senha123"}'
```

### Testar Mobile App

```bash
cd mobile
npm start
# Usar Expo Go para testar no dispositivo físico
```

### Testar Frontend Web

```bash
npm run build
npm run preview
# Acessar http://localhost:4173
```

---

## 📊 Monitoramento

### Netlify

- Acesse o dashboard do Netlify para ver logs de deploy
- Function logs disponíveis em Real-time logs
- Metrics de uso e performance

### Neon (PostgreSQL)

- Dashboard mostra uso do banco de dados
- Query statistics disponíveis
- Backups automáticos

### Expo (Mobile)

- Dashboard do Expo mostra downloads e crashes
- Analytics de uso disponíveis
- OTA update statistics

---

## 🆘 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: Database connection failed
- Verifique se a DATABASE_URL está correta
- Confirme que SSL está habilitado (`?sslmode=require`)
- Teste conexão no Neon Query Editor

### Erro: JWT token invalid
- Verifique se JWT_SECRET é o mesmo no deploy
- Tokens expiram após 7 dias
- Fazer novo login para obter novo token

### App mobile não conecta à API
- Verifique se API_URL está correto em `config.js`
- Confirme que a API está acessível (testar com curl)
- Verifique se o dispositivo tem internet

---

## 📞 Suporte

Para dúvidas sobre deployment:
- Email: contato@elitestilo.com
- WhatsApp: (71) 99337-2960
- GitHub Issues: https://github.com/cristiano-superacao/elite-estilo/issues

---

**Desenvolvido com ❤️ pela equipe Elite & Estilo**

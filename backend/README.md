# Elite & Estilo - Backend (Node.js/Express)

## 🔧 Sobre

Backend serverless do Elite & Estilo usando Node.js, Express e Netlify Functions com PostgreSQL (Neon).

## 📋 Estrutura

```
backend/
├── functions/           # Netlify Functions
│   ├── salons-function.js    # Function principal
│   ├── salons.js             # Rotas Express
│   ├── db.js                 # Conexão com PostgreSQL
│   └── netlify.toml          # Config Netlify Functions
└── db/                  # Scripts de banco de dados
    └── db.sql           # Schema e migrations
```

## 🛠️ Stack Tecnológico

- **Node.js 20+** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional
- **Neon** - PostgreSQL serverless na nuvem
- **Netlify Functions** - Backend serverless
- **@neondatabase/serverless** - Driver PostgreSQL otimizado

## 🗄️ Banco de Dados

### Tabelas

#### `salons`
Armazena informações dos salões/barbearias.

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
```

#### `appointments`
Armazena os agendamentos realizados.

```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  service VARCHAR(100),
  date DATE,
  hour TIME
);
```

### Setup do Banco

1. Crie uma conta em [Neon](https://neon.tech)
2. Crie um novo projeto PostgreSQL
3. Execute o script `db/db.sql` no console SQL do Neon
4. Copie a connection string

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NEON_DATABASE_URL="postgresql://usuario:senha@ep-endereco.neon.tech/dbname?sslmode=require"
NODE_ENV="development"
```

## 🚀 API Endpoints

### Base URL
- **Local:** `http://localhost:8888/.netlify/functions/salons-function`
- **Produção:** `https://elitestilo.netlify.app/.netlify/functions/salons-function`

### Endpoints Disponíveis

#### Listar todos os salões
```http
GET /salons
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Barbearia Elegance",
    "city": "Salvador",
    "rating": 4.8,
    "services": ["Corte", "Barba"],
    ...
  }
]
```

#### Buscar salões
```http
GET /salons/search?q=termo
```

**Parâmetros:**
- `q` (string): Termo de busca (nome, cidade ou serviço)

**Resposta:**
```json
[
  {
    "id": 2,
    "name": "Salão Beleza Pura",
    ...
  }
]
```

#### Criar agendamento
```http
POST /appointments
```

**Body:**
```json
{
  "salon_id": 1,
  "client_name": "João Silva",
  "service": "Corte",
  "date": "2025-02-15",
  "hour": "14:00"
}
```

**Resposta:**
```json
{
  "id": 123,
  "salon_id": 1,
  "client_name": "João Silva",
  "service": "Corte",
  "date": "2025-02-15",
  "hour": "14:00"
}
```

## 🧪 Desenvolvimento Local

### Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Rodar servidor local

```bash
# Na raiz do projeto
netlify dev
```

Acesse: `http://localhost:8888`

### Testar função localmente

```bash
# Testar endpoint de salões
curl http://localhost:8888/.netlify/functions/salons-function/salons

# Testar busca
curl "http://localhost:8888/.netlify/functions/salons-function/salons/search?q=Salvador"
```

## 📦 Deploy

### Deploy Automático (Recomendado)

Todo push para branch `main` dispara deploy automático via GitHub Actions/Netlify.

### Deploy Manual

```bash
# Build e deploy
netlify deploy --prod
```

## 🔒 Segurança

- ✅ Variáveis de ambiente protegidas
- ✅ Conexão SSL com banco de dados
- ✅ Validação de inputs
- ✅ CORS configurado
- ✅ Rate limiting (Netlify)
- ✅ SQL injection prevention (prepared statements)

## 📚 Recursos

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Neon Docs](https://neon.tech/docs/introduction)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## 🐛 Troubleshooting

### Erro de conexão com banco

Verifique se:
1. `NEON_DATABASE_URL` está configurada corretamente
2. Banco de dados está ativo no Neon
3. IP do servidor está autorizado (se aplicável)

### Function não responde

```bash
# Verificar logs
netlify functions:log salons-function
```

## 📞 Contato

Para dúvidas sobre o backend, abra uma issue no GitHub.

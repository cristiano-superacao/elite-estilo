# Elite & Estilo - API Documentation

## Base URL

- **Development:** `http://localhost:8888/.netlify/functions`
- **Production:** `https://elitestilo.netlify.app/.netlify/functions`

## Authentication Endpoints

### POST /auth-function/register

Cria uma nova conta de usuário.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "(11) 99999-9999"
}
```

**Response (201 Created):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "created_at": "2025-10-29T23:11:42.182Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Dados inválidos
- `409 Conflict` - Email já cadastrado
- `500 Internal Server Error` - Erro no servidor

### POST /auth-function/login

Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "created_at": "2025-10-29T23:11:42.182Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Email ou senha incorretos
- `500 Internal Server Error` - Erro no servidor

### GET /auth-function/verify

Verifica se um token JWT é válido.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "joao@email.com",
    "name": "João Silva"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Token não fornecido
- `403 Forbidden` - Token inválido ou expirado

### GET /auth-function/profile

Obtém o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "created_at": "2025-10-29T23:11:42.182Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Token não fornecido
- `403 Forbidden` - Token inválido ou expirado
- `404 Not Found` - Usuário não encontrado

### PUT /auth-function/profile

Atualiza o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "name": "João Silva Santos",
  "phone": "(11) 98888-8888"
}
```

**Response (200 OK):**
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva Santos",
    "email": "joao@email.com",
    "phone": "(11) 98888-8888",
    "created_at": "2025-10-29T23:11:42.182Z",
    "updated_at": "2025-10-29T23:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Token não fornecido
- `403 Forbidden` - Token inválido ou expirado
- `404 Not Found` - Usuário não encontrado

## Salons Endpoints

### GET /salons-function/salons

Lista todos os salões cadastrados.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Barbearia Elite",
    "image": "https://...",
    "address": "Rua das Flores, 123",
    "city": "Salvador",
    "rating": 4.8,
    "reviews": 250,
    "phone": "(71) 3333-3333",
    "whatsapp": "5571999999999",
    "hours": "Seg-Sex: 9h-19h, Sáb: 9h-17h",
    "services": ["Corte", "Barba", "Sobrancelha"],
    "prices": {
      "corte": 35,
      "barba": 25,
      "sobrancelha": 15
    },
    "specialties": ["Corte clássico", "Barba desenhada"],
    "badge": "Premium",
    "color": "purple",
    "description": "Barbearia tradicional com profissionais experientes",
    "amenities": ["Wi-Fi", "Ar condicionado", "TV"],
    "owner": "João Silva"
  }
]
```

### GET /salons-function/salons/search?q=termo

Busca salões por nome, cidade ou serviço.

**Query Parameters:**
- `q` (string) - Termo de busca

**Example:** `/salons-function/salons/search?q=Salvador`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Barbearia Elite",
    ...
  }
]
```

## Appointments Endpoint

### POST /salons-function/appointments

Cria um novo agendamento.

**Request Body:**
```json
{
  "salon_id": 1,
  "client_name": "João Silva",
  "service": "Corte de cabelo",
  "date": "2025-11-01",
  "hour": "14:00"
}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

**Error Responses:**
- `500 Internal Server Error` - Erro no servidor

## Authentication

A maioria dos endpoints requer autenticação via JWT token. O token deve ser incluído no header `Authorization` como:

```
Authorization: Bearer <seu_token_jwt>
```

O token é obtido ao fazer login ou registro e tem validade de 7 dias.

## Error Handling

Todos os endpoints retornam erros no seguinte formato:

```json
{
  "error": "Mensagem de erro descritiva"
}
```

## Rate Limiting

A API está hospedada no Netlify e possui rate limiting automático para prevenir abuso.

## CORS

A API permite requisições de qualquer origem para facilitar o desenvolvimento e integração com aplicativos mobile e web.

## Database Schema

### users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### salons table
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

### appointments table
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

## Security

- Senhas são criptografadas com bcrypt (10 salt rounds)
- Tokens JWT são assinados com chave secreta
- Conexão SSL com banco de dados PostgreSQL/Neon
- Validação de inputs no backend
- Tokens expiram após 7 dias

## Contact

Para dúvidas sobre a API:
- Email: contato@elitestilo.com
- WhatsApp: (71) 99337-2960
- GitHub Issues: https://github.com/cristiano-superacao/elite-estilo/issues

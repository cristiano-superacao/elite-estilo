# Elite & Estilo - API Documentation

## Base URL
```
Production: https://elitestilo.netlify.app/.netlify/functions/api
Development: http://localhost:8888/.netlify/functions/api
```

## Endpoints

### 1. Catálogo de Salões

#### GET /api/salons
Lista todos os salões com paginação e filtros.

**Query Parameters:**
- `page` (opcional, default: 1) - Número da página
- `limit` (opcional, default: 10) - Itens por página
- `city` (opcional) - Filtrar por cidade
- `service` (opcional) - Filtrar por serviço
- `rating` (opcional) - Avaliação mínima (0-5)
- `sort` (opcional) - Ordenação: `rating`, `reviews`, `name`

**Exemplo de Requisição:**
```bash
GET /api/salons?page=1&limit=10&city=Salvador&rating=4.5&sort=rating
```

**Exemplo de Resposta (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Barbearia Elite Premium",
      "image": "https://images.unsplash.com/photo-1...",
      "address": "Rua das Flores, 123",
      "city": "Salvador",
      "rating": 4.8,
      "reviews": 127,
      "phone": "(71) 3333-4444",
      "whatsapp": "(71) 99999-8888",
      "hours": "Seg-Sex: 9h-20h | Sáb: 9h-18h",
      "services": ["Corte", "Barba", "Sobrancelha"],
      "prices": {
        "Corte": "R$ 45,00",
        "Barba": "R$ 35,00"
      },
      "specialties": ["Corte Moderno", "Barba Tradicional"],
      "badge": "Premium",
      "color": "purple",
      "description": "Barbearia de alto padrão...",
      "amenities": ["Wi-Fi", "Estacionamento", "Ar-Condicionado"],
      "owner": "João Silva",
      "created_at": "2025-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

#### GET /api/salons/:id
Retorna detalhes de um salão específico.

**Path Parameters:**
- `id` (obrigatório) - ID do salão

**Exemplo de Requisição:**
```bash
GET /api/salons/1
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Barbearia Elite Premium",
  "image": "https://images.unsplash.com/photo-1...",
  "address": "Rua das Flores, 123",
  "city": "Salvador",
  "rating": 4.8,
  "reviews": 127,
  "phone": "(71) 3333-4444",
  "whatsapp": "(71) 99999-8888",
  "hours": "Seg-Sex: 9h-20h | Sáb: 9h-18h",
  "services": ["Corte", "Barba", "Sobrancelha"],
  "prices": {
    "Corte": "R$ 45,00",
    "Barba": "R$ 35,00"
  },
  "specialties": ["Corte Moderno", "Barba Tradicional"],
  "badge": "Premium",
  "color": "purple",
  "description": "Barbearia de alto padrão com ambiente moderno...",
  "amenities": ["Wi-Fi", "Estacionamento", "Ar-Condicionado"],
  "owner": "João Silva",
  "created_at": "2025-01-15T10:30:00.000Z"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Salão não encontrado"
}
```

---

#### GET /api/salons/search
Busca salões por nome, cidade, serviço ou descrição.

**Query Parameters:**
- `q` (obrigatório) - Termo de busca

**Exemplo de Requisição:**
```bash
GET /api/salons/search?q=barba
```

**Exemplo de Resposta (200 OK):**
```json
{
  "query": "barba",
  "results": 12,
  "data": [
    {
      "id": 1,
      "name": "Barbearia Elite Premium",
      "city": "Salvador",
      "rating": 4.8,
      "services": ["Corte", "Barba", "Sobrancelha"],
      ...
    }
  ]
}
```

---

### 2. Página de Planos

#### GET /api/plans
Lista todos os planos disponíveis.

**Exemplo de Requisição:**
```bash
GET /api/plans
```

**Exemplo de Resposta (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Teste Gratuito",
      "price": 0.00,
      "duration": "90 dias",
      "description": "Experimente todas as funcionalidades sem compromisso",
      "features": [
        { "text": "Cadastro de salão", "included": true },
        { "text": "Até 3 profissionais", "included": true },
        { "text": "Agendamentos ilimitados", "included": true },
        { "text": "Chat com clientes", "included": true },
        { "text": "Dashboard básico", "included": true },
        { "text": "Relatórios avançados", "included": false }
      ],
      "highlight": false,
      "button_text": "Começar Teste Grátis",
      "badge": "Ideal para começar",
      "created_at": "2025-01-10T08:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Plano Mensal",
      "price": 50.00,
      "duration": "por mês",
      "description": "Flexibilidade para gerenciar seu negócio mês a mês",
      "features": [
        { "text": "Cadastro de salão", "included": true },
        { "text": "Profissionais ilimitados", "included": true },
        { "text": "Agendamentos ilimitados", "included": true },
        { "text": "Relatórios avançados", "included": true },
        { "text": "WhatsApp Business", "included": true },
        { "text": "Suporte prioritário", "included": true }
      ],
      "highlight": false,
      "button_text": "Assinar Mensal",
      "badge": "Mais flexível",
      "created_at": "2025-01-10T08:00:00.000Z"
    }
  ],
  "total": 4
}
```

---

#### GET /api/plans/:id
Retorna detalhes de um plano específico.

**Path Parameters:**
- `id` (obrigatório) - ID do plano

**Exemplo de Requisição:**
```bash
GET /api/plans/2
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 2,
  "name": "Plano Mensal",
  "price": 50.00,
  "duration": "por mês",
  "description": "Flexibilidade para gerenciar seu negócio mês a mês",
  "features": [
    { "text": "Cadastro de salão", "included": true },
    { "text": "Profissionais ilimitados", "included": true },
    { "text": "Agendamentos ilimitados", "included": true }
  ],
  "highlight": false,
  "button_text": "Assinar Mensal",
  "badge": "Mais flexível",
  "created_at": "2025-01-10T08:00:00.000Z"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Plano não encontrado"
}
```

---

### 3. Sistema de Agendamento

#### POST /api/appointments
Cria um novo agendamento.

**Request Body:**
```json
{
  "salon_id": 1,
  "client_name": "Maria Silva",
  "client_email": "maria@email.com",
  "client_phone": "(71) 98888-7777",
  "service": "Corte + Barba",
  "date": "2025-02-15",
  "hour": "14:30",
  "notes": "Preferência por profissional experiente"
}
```

**Campos Obrigatórios:**
- `salon_id` - ID do salão
- `client_name` - Nome do cliente
- `service` - Serviço desejado
- `date` - Data do agendamento (formato: YYYY-MM-DD)
- `hour` - Horário do agendamento (formato: HH:MM)

**Campos Opcionais:**
- `client_email` - E-mail do cliente
- `client_phone` - Telefone do cliente
- `notes` - Observações adicionais

**Exemplo de Resposta (201 Created):**
```json
{
  "message": "Agendamento criado com sucesso",
  "data": {
    "id": 42,
    "salon_id": 1,
    "client_name": "Maria Silva",
    "client_email": "maria@email.com",
    "client_phone": "(71) 98888-7777",
    "service": "Corte + Barba",
    "date": "2025-02-15",
    "hour": "14:30:00",
    "status": "pending",
    "notes": "Preferência por profissional experiente",
    "created_at": "2025-01-20T16:45:00.000Z",
    "updated_at": "2025-01-20T16:45:00.000Z"
  }
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "error": "Campos obrigatórios faltando",
  "required": ["salon_id", "client_name", "service", "date", "hour"]
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Salão não encontrado"
}
```

**Resposta de Erro (409 Conflict):**
```json
{
  "error": "Horário não disponível",
  "message": "Já existe um agendamento para este horário"
}
```

---

#### GET /api/appointments
Consulta agendamentos com filtros e paginação.

**Query Parameters:**
- `salon_id` (opcional) - Filtrar por salão
- `client_email` (opcional) - Filtrar por e-mail do cliente
- `status` (opcional) - Filtrar por status: `pending`, `confirmed`, `cancelled`, `completed`
- `date` (opcional) - Filtrar por data (formato: YYYY-MM-DD)
- `page` (opcional, default: 1) - Número da página
- `limit` (opcional, default: 20) - Itens por página

**Exemplo de Requisição:**
```bash
GET /api/appointments?salon_id=1&status=pending&page=1&limit=10
```

**Exemplo de Resposta (200 OK):**
```json
{
  "data": [
    {
      "id": 42,
      "salon_id": 1,
      "salon_name": "Barbearia Elite Premium",
      "salon_address": "Rua das Flores, 123",
      "client_name": "Maria Silva",
      "client_email": "maria@email.com",
      "client_phone": "(71) 98888-7777",
      "service": "Corte + Barba",
      "date": "2025-02-15",
      "hour": "14:30:00",
      "status": "pending",
      "notes": "Preferência por profissional experiente",
      "created_at": "2025-01-20T16:45:00.000Z",
      "updated_at": "2025-01-20T16:45:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

#### GET /api/appointments/:id
Retorna detalhes de um agendamento específico.

**Path Parameters:**
- `id` (obrigatório) - ID do agendamento

**Exemplo de Requisição:**
```bash
GET /api/appointments/42
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 42,
  "salon_id": 1,
  "salon_name": "Barbearia Elite Premium",
  "salon_address": "Rua das Flores, 123",
  "salon_phone": "(71) 3333-4444",
  "client_name": "Maria Silva",
  "client_email": "maria@email.com",
  "client_phone": "(71) 98888-7777",
  "service": "Corte + Barba",
  "date": "2025-02-15",
  "hour": "14:30:00",
  "status": "pending",
  "notes": "Preferência por profissional experiente",
  "created_at": "2025-01-20T16:45:00.000Z",
  "updated_at": "2025-01-20T16:45:00.000Z"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Agendamento não encontrado"
}
```

---

#### DELETE /api/appointments/:id
Cancela um agendamento existente.

**Path Parameters:**
- `id` (obrigatório) - ID do agendamento

**Exemplo de Requisição:**
```bash
DELETE /api/appointments/42
```

**Exemplo de Resposta (200 OK):**
```json
{
  "message": "Agendamento cancelado com sucesso",
  "data": {
    "id": 42,
    "salon_id": 1,
    "client_name": "Maria Silva",
    "client_email": "maria@email.com",
    "service": "Corte + Barba",
    "date": "2025-02-15",
    "hour": "14:30:00",
    "status": "cancelled",
    "updated_at": "2025-01-21T10:15:00.000Z"
  }
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Agendamento não encontrado"
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "error": "Agendamento já está cancelado"
}
```

---

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Requisição inválida (parâmetros faltando ou inválidos)
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito (ex: horário já ocupado)
- `500 Internal Server Error` - Erro no servidor

---

## Autenticação

Atualmente a API é pública. Em versões futuras será implementado sistema de autenticação com tokens JWT.

---

## Rate Limiting

- Limite: 100 requisições por minuto por IP (Netlify padrão)
- Após exceder: Status 429 (Too Many Requests)

---

## CORS

A API aceita requisições de qualquer origem durante o desenvolvimento. Em produção, será restrito ao domínio oficial.

---

## Integração com Banco de Dados

Todos os endpoints estão integrados com PostgreSQL (Neon) utilizando a biblioteca `pg`.

**Variáveis de Ambiente Necessárias:**
```env
DATABASE_URL=postgresql://usuario:senha@endpoint.neon.tech/dbname?sslmode=require
```

---

## Exemplos de Uso com JavaScript (Fetch API)

### Listar Salões
```javascript
fetch('https://elitestilo.netlify.app/.netlify/functions/api/salons?page=1&limit=10')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Criar Agendamento
```javascript
fetch('https://elitestilo.netlify.app/.netlify/functions/api/appointments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    salon_id: 1,
    client_name: 'João Santos',
    client_email: 'joao@email.com',
    service: 'Corte',
    date: '2025-02-20',
    hour: '15:00'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Cancelar Agendamento
```javascript
fetch('https://elitestilo.netlify.app/.netlify/functions/api/appointments/42', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

---

## Suporte

Para dúvidas ou problemas:
- **GitHub Issues:** https://github.com/cristiano-superacao/elite-estilo/issues
- **Email:** contato@elitestilo.com
- **WhatsApp:** (71) 99337-2960

---

**Desenvolvido por Cristiano Superação | Elite & Estilo © 2025**

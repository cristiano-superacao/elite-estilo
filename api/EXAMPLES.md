# Elite & Estilo - API Examples

Este documento contém exemplos práticos de como usar a API.

## Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@endpoint.neon.tech/dbname?sslmode=require
NODE_ENV=development
```

### 2. Popular o Banco de Dados

Execute o script SQL para criar as tabelas:

```bash
# Conecte ao seu banco Neon e execute:
psql $DATABASE_URL < api/db.sql
```

### 3. Inserir Dados de Exemplo

```sql
-- Inserir salões de exemplo
INSERT INTO salons (name, image, address, city, rating, reviews, phone, whatsapp, hours, services, prices, specialties, badge, color, description, amenities, owner)
VALUES 
  ('Barbearia Elite Premium', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1', 'Rua das Flores, 123', 'Salvador', 4.8, 127, '(71) 3333-4444', '(71) 99999-8888', 'Seg-Sex: 9h-20h | Sáb: 9h-18h', ARRAY['Corte', 'Barba', 'Sobrancelha'], '{"Corte": "R$ 45,00", "Barba": "R$ 35,00"}'::jsonb, ARRAY['Corte Moderno', 'Barba Tradicional'], 'Premium', 'purple', 'Barbearia de alto padrão com ambiente moderno', ARRAY['Wi-Fi', 'Estacionamento', 'Ar-Condicionado'], 'João Silva'),
  ('Salão Beleza Total', 'https://images.unsplash.com/photo-1560066984-138dadb4c035', 'Av. Principal, 456', 'Salvador', 4.5, 89, '(71) 2222-3333', '(71) 98888-7777', 'Seg-Sáb: 8h-19h', ARRAY['Corte', 'Coloração', 'Manicure', 'Pedicure'], '{"Corte": "R$ 60,00", "Coloração": "R$ 150,00"}'::jsonb, ARRAY['Coloração Profissional', 'Tratamentos Capilares'], 'Destaque', 'pink', 'Salão completo para cuidados com cabelo e unhas', ARRAY['Wi-Fi', 'Café Cortesia', 'Produtos Profissionais'], 'Maria Santos');

-- Inserir planos de exemplo
INSERT INTO plans (name, price, duration, description, features, highlight, button_text, badge)
VALUES
  ('Teste Gratuito', 0.00, '90 dias', 'Experimente todas as funcionalidades sem compromisso', 
   '[{"text": "Cadastro de salão", "included": true}, {"text": "Até 3 profissionais", "included": true}, {"text": "Agendamentos ilimitados", "included": true}, {"text": "Chat com clientes", "included": true}, {"text": "Dashboard básico", "included": true}, {"text": "Relatórios avançados", "included": false}]'::jsonb, 
   false, 'Começar Teste Grátis', 'Ideal para começar'),
  ('Plano Mensal', 50.00, 'por mês', 'Flexibilidade para gerenciar seu negócio mês a mês',
   '[{"text": "Cadastro de salão", "included": true}, {"text": "Profissionais ilimitados", "included": true}, {"text": "Agendamentos ilimitados", "included": true}, {"text": "Relatórios avançados", "included": true}, {"text": "WhatsApp Business", "included": true}, {"text": "Suporte prioritário", "included": true}]'::jsonb,
   false, 'Assinar Mensal', 'Mais flexível'),
  ('Plano Semestral', 240.00, '6 meses', 'Economia de 20% com pagamento semestral',
   '[{"text": "Todos os recursos do Mensal", "included": true}, {"text": "20% de desconto", "included": true}, {"text": "Suporte VIP", "included": true}, {"text": "Consultoria mensal", "included": true}]'::jsonb,
   true, 'Assinar Semestral', 'Mais Vendido'),
  ('Plano Anual', 420.00, '12 meses', 'Melhor custo-benefício com 30% de economia',
   '[{"text": "Todos os recursos do Mensal", "included": true}, {"text": "30% de desconto", "included": true}, {"text": "Suporte Premium 24/7", "included": true}, {"text": "Treinamento completo", "included": true}, {"text": "Personalização avançada", "included": true}]'::jsonb,
   false, 'Assinar Anual', 'Melhor Valor');
```

---

## Exemplos de Uso

### 1. Testar Conectividade

```bash
curl http://localhost:8888/.netlify/functions/api/health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T10:30:00.000Z",
  "service": "Elite & Estilo API"
}
```

---

### 2. Listar Salões

#### Listar todos os salões (primeira página)
```bash
curl "http://localhost:8888/.netlify/functions/api/salons?page=1&limit=10"
```

#### Filtrar por cidade
```bash
curl "http://localhost:8888/.netlify/functions/api/salons?city=Salvador"
```

#### Filtrar por serviço
```bash
curl "http://localhost:8888/.netlify/functions/api/salons?service=Corte"
```

#### Filtrar por avaliação mínima e ordenar
```bash
curl "http://localhost:8888/.netlify/functions/api/salons?rating=4.5&sort=rating"
```

#### Combinação de filtros
```bash
curl "http://localhost:8888/.netlify/functions/api/salons?city=Salvador&service=Barba&rating=4&sort=reviews&page=1&limit=5"
```

---

### 3. Detalhes de um Salão

```bash
curl http://localhost:8888/.netlify/functions/api/salons/1
```

---

### 4. Buscar Salões

```bash
curl "http://localhost:8888/.netlify/functions/api/salons/search?q=barba"
```

---

### 5. Listar Planos

```bash
curl http://localhost:8888/.netlify/functions/api/plans
```

---

### 6. Detalhes de um Plano

```bash
curl http://localhost:8888/.netlify/functions/api/plans/2
```

---

### 7. Criar Agendamento

```bash
curl -X POST http://localhost:8888/.netlify/functions/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "salon_id": 1,
    "client_name": "João Santos",
    "client_email": "joao@email.com",
    "client_phone": "(71) 98765-4321",
    "service": "Corte + Barba",
    "date": "2025-02-20",
    "hour": "15:00",
    "notes": "Preferência por profissional experiente"
  }'
```

---

### 8. Listar Agendamentos

#### Todos os agendamentos
```bash
curl "http://localhost:8888/.netlify/functions/api/appointments?page=1&limit=20"
```

#### Agendamentos de um salão específico
```bash
curl "http://localhost:8888/.netlify/functions/api/appointments?salon_id=1"
```

#### Agendamentos de um cliente (por email)
```bash
curl "http://localhost:8888/.netlify/functions/api/appointments?client_email=joao@email.com"
```

#### Agendamentos por status
```bash
curl "http://localhost:8888/.netlify/functions/api/appointments?status=pending"
```

#### Agendamentos de uma data específica
```bash
curl "http://localhost:8888/.netlify/functions/api/appointments?date=2025-02-20"
```

---

### 9. Detalhes de um Agendamento

```bash
curl http://localhost:8888/.netlify/functions/api/appointments/1
```

---

### 10. Cancelar Agendamento

```bash
curl -X DELETE http://localhost:8888/.netlify/functions/api/appointments/1
```

---

## Exemplos com JavaScript (Frontend)

### Fetch API

```javascript
// Listar salões
async function getSalons() {
  try {
    const response = await fetch('/.netlify/functions/api/salons?page=1&limit=10');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Criar agendamento
async function createAppointment() {
  try {
    const response = await fetch('/.netlify/functions/api/appointments', {
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
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Cancelar agendamento
async function cancelAppointment(id) {
  try {
    const response = await fetch(`/.netlify/functions/api/appointments/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/.netlify/functions/api'
});

// Listar salões
const salons = await api.get('/salons', {
  params: { page: 1, limit: 10, city: 'Salvador' }
});

// Criar agendamento
const appointment = await api.post('/appointments', {
  salon_id: 1,
  client_name: 'João Santos',
  service: 'Corte',
  date: '2025-02-20',
  hour: '15:00'
});

// Cancelar agendamento
await api.delete(`/appointments/${appointmentId}`);
```

---

## Tratamento de Erros

### Exemplo de erro 400 (Bad Request)
```json
{
  "error": "Campos obrigatórios faltando",
  "required": ["salon_id", "client_name", "service", "date", "hour"]
}
```

### Exemplo de erro 404 (Not Found)
```json
{
  "error": "Salão não encontrado"
}
```

### Exemplo de erro 409 (Conflict)
```json
{
  "error": "Horário não disponível",
  "message": "Já existe um agendamento para este horário"
}
```

### Exemplo de erro 500 (Internal Server Error)
```json
{
  "error": "Erro interno do servidor",
  "message": "Connection timeout"
}
```

---

## Testes com Postman

1. Importe a coleção de endpoints
2. Configure a variável `{{base_url}}` = `http://localhost:8888/.netlify/functions/api`
3. Execute os requests

---

## Próximos Passos

1. **Autenticação**: Implementar JWT para proteger endpoints
2. **Rate Limiting**: Adicionar limites de requisições por usuário
3. **Webhooks**: Notificações automáticas para novos agendamentos
4. **Filtros Avançados**: Adicionar mais opções de busca e filtros
5. **Exportação**: Permitir exportar agendamentos em PDF/Excel
6. **Analytics**: Dashboard com estatísticas de uso

---

**Desenvolvido por Cristiano Superação | Elite & Estilo © 2025**

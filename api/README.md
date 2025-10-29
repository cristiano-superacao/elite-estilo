# Elite & Estilo - Backend API

API RESTful completa para o sistema Elite & Estilo, desenvolvida com Node.js, Express e Netlify Functions.

## 📋 Visão Geral

Esta API fornece endpoints completos para gerenciar:
- **Catálogo de Salões** - Listagem, busca e filtros
- **Planos** - Listagem e detalhes dos planos disponíveis
- **Agendamentos** - Criação, consulta e cancelamento

## 🏗️ Arquitetura

```
api/
├── db.js                    # Configuração de conexão PostgreSQL/Neon
├── db.sql                   # Schema do banco de dados
├── seed-data.sql            # Dados de exemplo para testes
├── index.js                 # API principal com middleware
├── salons-api.js           # Endpoints de salões
├── plans-api.js            # Endpoints de planos
├── appointments-api.js     # Endpoints de agendamentos
├── api.js                  # Netlify Function wrapper
├── test-api.js             # Script de teste
├── API_DOCUMENTATION.md    # Documentação detalhada
├── EXAMPLES.md             # Exemplos práticos de uso
└── README.md               # Este arquivo
```

## 🚀 Endpoints Disponíveis

### Salões
- `GET /api/salons` - Lista salões com paginação e filtros
- `GET /api/salons/:id` - Detalhes de um salão
- `GET /api/salons/search` - Busca por termo

### Planos
- `GET /api/plans` - Lista todos os planos
- `GET /api/plans/:id` - Detalhes de um plano

### Agendamentos
- `POST /api/appointments` - Criar agendamento
- `GET /api/appointments` - Listar agendamentos com filtros
- `GET /api/appointments/:id` - Detalhes de um agendamento
- `DELETE /api/appointments/:id` - Cancelar agendamento

### Health Check
- `GET /api/health` - Verifica status da API

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@endpoint.neon.tech/dbname?sslmode=require
NODE_ENV=production
```

### 2. Criar Tabelas

Execute o script SQL no seu banco Neon:

```bash
# Opção 1: Via psql (não exponha a URL diretamente)
psql "$(cat .env | grep DATABASE_URL | cut -d= -f2-)" < api/db.sql

# Opção 2: Copie o conteúdo de api/db.sql e execute na interface web do Neon
```

### 3. Popular com Dados de Exemplo (Opcional)

```bash
psql "$(cat .env | grep DATABASE_URL | cut -d= -f2-)" < api/seed-data.sql
```

## 🧪 Testes

### Teste de Estrutura da API

```bash
node api/test-api.js
```

### Teste Local com Netlify Dev

```bash
# Instalar Netlify CLI (se necessário)
npm install -g netlify-cli

# Iniciar servidor local
netlify dev

# Acessar
# http://localhost:8888/.netlify/functions/api/health
```

## 🔐 Segurança

### Implementações de Segurança

✅ **Parametrização de Queries SQL** - Todas as queries usam prepared statements  
✅ **Validação de Entrada** - Validação de dados obrigatórios nos endpoints  
✅ **CORS Configurado** - Headers CORS adequados para produção  
✅ **Tratamento de Erros** - Error handler centralizado  
✅ **Constraints de Banco** - CHECK constraint para status de appointments  
✅ **SSL/TLS** - Conexão segura com banco de dados  
✅ **Sem Vulnerabilidades** - Dependências auditadas e corrigidas  

### Validações Implementadas

1. **Appointments:**
   - Campos obrigatórios verificados
   - Verificação de existência do salão
   - Validação de disponibilidade de horário
   - Status apenas com valores permitidos

2. **Queries:**
   - Todas usando prepared statements ($1, $2, etc)
   - Prevenção de SQL injection

3. **Filtros:**
   - Validação de tipos de dados
   - Sanitização de inputs

## 📊 Schema do Banco de Dados

### Tabela `salons`
Armazena informações dos salões cadastrados.

**Campos principais:**
- `id` - Identificador único
- `name` - Nome do salão
- `city` - Cidade
- `rating` - Avaliação (0-5)
- `services` - Array de serviços
- `prices` - JSON com preços

### Tabela `plans`
Armazena os planos disponíveis.

**Campos principais:**
- `id` - Identificador único
- `name` - Nome do plano
- `price` - Preço
- `features` - JSON com features
- `highlight` - Destaque (boolean)

### Tabela `appointments`
Armazena os agendamentos realizados.

**Campos principais:**
- `id` - Identificador único
- `salon_id` - Referência ao salão
- `client_name` - Nome do cliente
- `service` - Serviço solicitado
- `date` - Data do agendamento
- `hour` - Horário do agendamento
- `status` - Status (pending, confirmed, completed, cancelled)

## 📚 Documentação Completa

Para documentação detalhada com todos os exemplos de requisições e respostas, consulte:

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Documentação completa da API
- **[EXAMPLES.md](./EXAMPLES.md)** - Exemplos práticos com curl e JavaScript

## 🛠️ Tecnologias Utilizadas

- **Node.js 20** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional
- **Neon** - PostgreSQL serverless na nuvem
- **Netlify Functions** - Serverless deployment
- **serverless-http** - Wrapper para Express em serverless
- **pg** - Cliente PostgreSQL para Node.js

## 📈 Próximas Funcionalidades

- [ ] Autenticação com JWT
- [ ] Rate limiting por usuário
- [ ] Webhooks para notificações
- [ ] Filtros avançados
- [ ] Exportação de dados (PDF/Excel)
- [ ] Analytics e métricas
- [ ] Cache com Redis
- [ ] Logs estruturados

## 🤝 Contribuindo

Para contribuir com melhorias na API:

1. Faça fork do repositório
2. Crie uma branch para sua feature
3. Implemente suas mudanças
4. Execute os testes: `node api/test-api.js`
5. Execute o lint: `npm run lint`
6. Faça commit com mensagem descritiva
7. Abra um Pull Request

## 📞 Suporte

- **GitHub Issues**: [Reportar Bug](https://github.com/cristiano-superacao/elite-estilo/issues)
- **Email**: contato@elitestilo.com
- **WhatsApp**: (71) 99337-2960

## 📄 Licença

© 2025 Elite & Estilo. Todos os direitos reservados.

---

**Desenvolvido por Cristiano Superação**

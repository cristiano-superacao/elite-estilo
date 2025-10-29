# Elite & Estilo - Testing Guide

Guia completo para testar o sistema de autenticação mobile do Elite & Estilo.

---

## 📋 Pré-requisitos para Testes

### Backend
- PostgreSQL/Neon database configurado
- Netlify Dev CLI instalado (`npm install -g netlify-cli`)
- Variáveis de ambiente configuradas

### Mobile
- Node.js 20+
- Expo CLI instalado (`npm install -g expo-cli`)
- Expo Go app instalado no smartphone
- Ou emulador Android/iOS configurado

---

## 🧪 1. Testando o Backend (API)

### Setup Inicial

```bash
# 1. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 2. Inicie o servidor local
netlify dev
# API estará em http://localhost:8888/.netlify/functions
```

### Teste 1: Registro de Novo Usuário

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@test.com",
    "password": "senha123",
    "phone": "(11) 99999-9999"
  }'
```

**Resultado Esperado:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@test.com",
    "phone": "(11) 99999-9999",
    "created_at": "2025-10-29T23:11:42.182Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Teste 2: Login com Credenciais Válidas

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@test.com",
    "password": "senha123"
  }'
```

**Resultado Esperado:**
```json
{
  "message": "Login realizado com sucesso",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Teste 3: Login com Credenciais Inválidas

```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@test.com",
    "password": "senhaerrada"
  }'
```

**Resultado Esperado:**
```json
{
  "error": "Email ou senha incorretos"
}
```

### Teste 4: Verificar Token

```bash
# Substitua YOUR_TOKEN pelo token recebido no login
curl -X GET http://localhost:8888/.netlify/functions/auth-function/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Resultado Esperado:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "joao@test.com",
    "name": "João Silva"
  }
}
```

### Teste 5: Obter Perfil (Rota Protegida)

```bash
curl -X GET http://localhost:8888/.netlify/functions/auth-function/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Resultado Esperado:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@test.com",
  "phone": "(11) 99999-9999",
  "created_at": "2025-10-29T23:11:42.182Z"
}
```

### Teste 6: Atualizar Perfil

```bash
curl -X PUT http://localhost:8888/.netlify/functions/auth-function/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Santos",
    "phone": "(11) 98888-8888"
  }'
```

### Teste 7: Validações de Entrada

#### Email inválido
```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "email-invalido",
    "password": "senha123"
  }'
```
**Esperado:** `{ "error": "Email inválido" }`

#### Senha curta
```bash
curl -X POST http://localhost:8888/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "test@test.com",
    "password": "123"
  }'
```
**Esperado:** `{ "error": "Senha deve ter no mínimo 6 caracteres" }`

#### Email duplicado
```bash
# Tente registrar com email já existente
curl -X POST http://localhost:8888/.netlify/functions/auth-function/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Outro Nome",
    "email": "joao@test.com",
    "password": "senha123"
  }'
```
**Esperado:** `{ "error": "Email já cadastrado" }`

---

## 📱 2. Testando o Mobile App

### Setup Inicial

```bash
# 1. Navegue para o diretório mobile
cd mobile

# 2. Instale dependências
npm install

# 3. Inicie o Expo
npm start
```

### Teste Manual - Fluxo Completo

#### Passo 1: Criar Nova Conta

1. Abra o app no Expo Go
2. Toque em "Cadastre-se"
3. Preencha os campos:
   - **Nome:** João Silva
   - **Email:** joao@mobile.com
   - **Telefone:** (11) 99999-9999
   - **Senha:** senha123
   - **Confirmar Senha:** senha123
4. Toque em "Criar Conta"

**Resultado Esperado:**
- Alert de sucesso
- Redirecionamento para tela Home
- Boas-vindas com nome do usuário

#### Passo 2: Logout

1. Na tela Home
2. Toque em "Sair da Conta"
3. Confirme no alert

**Resultado Esperado:**
- Redirecionamento para tela de Login

#### Passo 3: Login com Conta Existente

1. Na tela de Login
2. Preencha:
   - **Email:** joao@mobile.com
   - **Senha:** senha123
3. Toque em "Entrar"

**Resultado Esperado:**
- Alert de sucesso
- Redirecionamento para tela Home

#### Passo 4: Testar Validações

##### Email Inválido
1. Digite: teste123 (sem @)
2. Tente fazer login
**Esperado:** Mensagem de erro "Email inválido"

##### Senha Curta
1. Digite senha: 123
2. Tente fazer login
**Esperado:** Mensagem de erro "Senha deve ter no mínimo 6 caracteres"

##### Credenciais Incorretas
1. Digite email: joao@mobile.com
2. Digite senha: senhaerrada123
3. Tente fazer login
**Esperado:** Alert "Email ou senha incorretos"

##### Senhas Não Coincidem (Registro)
1. Vá para tela de registro
2. Digite senha: senha123
3. Digite confirmação: senha456
**Esperado:** Mensagem de erro "As senhas não coincidem"

#### Passo 5: Testar Navegação

1. Na tela Home, toque em cada opção:
   - ✅ Catálogo de Salões → Tela placeholder
   - ✅ Meus Agendamentos → Tela placeholder
   - ✅ Planos → Tela placeholder
   - ✅ Notificações → Tela placeholder

2. Em cada tela placeholder:
   - Botão "Voltar" funciona corretamente

#### Passo 6: Persistência de Login

1. Feche o app completamente
2. Reabra o app

**Resultado Esperado:**
- App abre diretamente na tela Home
- Token é recuperado do SecureStore
- Usuário continua autenticado

---

## 🧪 3. Testes de Integração

### Cenário 1: Fluxo Completo de Novo Usuário

```
1. Usuário abre o app pela primeira vez
   ✓ Vê tela de login
   
2. Usuário clica em "Cadastre-se"
   ✓ Navega para tela de registro
   
3. Usuário preenche formulário e submete
   ✓ Backend valida dados
   ✓ Cria usuário no banco
   ✓ Gera token JWT
   ✓ Retorna token e dados do usuário
   
4. App armazena token
   ✓ Token salvo no SecureStore
   ✓ Dados do usuário salvos
   
5. Usuário é redirecionado
   ✓ Navega para tela Home
   ✓ Vê saudação personalizada
```

### Cenário 2: Fluxo de Login Existente

```
1. Usuário abre o app
   ✓ Vê tela de login
   
2. Usuário digita email e senha
   ✓ Validação local passa
   
3. Usuário submete formulário
   ✓ Request enviada para API
   ✓ Backend valida credenciais
   ✓ Compara senha hash
   ✓ Gera novo token JWT
   
4. App recebe resposta
   ✓ Armazena token no SecureStore
   ✓ Armazena dados do usuário
   ✓ Navega para Home
```

### Cenário 3: Token Expirado

```
1. Usuário com token expirado abre o app
   ✓ Token é carregado do SecureStore
   ✓ App tenta acessar API
   ✓ Backend rejeita token expirado
   
2. App detecta token inválido
   ✓ Limpa dados do SecureStore
   ✓ Redireciona para tela de login
   
3. Usuário faz login novamente
   ✓ Novo token é gerado
   ✓ Ciclo continua normalmente
```

---

## 🐛 4. Casos de Erro Comuns

### Erro: "Network request failed"

**Causa:** Backend não está rodando ou URL incorreta

**Solução:**
```bash
# Verifique se o backend está rodando
netlify dev

# Verifique URL no mobile/config.js
# Em desenvolvimento deve ser: http://localhost:8888/.netlify/functions
# Ou use o IP da sua máquina se estiver testando em dispositivo físico
```

### Erro: "Database connection failed"

**Causa:** DATABASE_URL incorreta ou banco não configurado

**Solução:**
```bash
# Teste a conexão
psql $DATABASE_URL

# Execute o schema
psql $DATABASE_URL < api/db.sql
```

### Erro: "Token inválido"

**Causa:** JWT_SECRET diferente entre backend e token gerado

**Solução:**
```bash
# Verifique se JWT_SECRET está configurado
echo $JWT_SECRET

# Se necessário, faça login novamente para obter novo token
```

### Erro: Expo não conecta

**Causa:** Dispositivo e computador em redes diferentes

**Solução:**
```bash
# Use modo tunnel
cd mobile
expo start --tunnel
```

---

## ✅ Checklist de Testes

### Backend API
- [ ] Registro de novo usuário funciona
- [ ] Login com credenciais válidas funciona
- [ ] Login com credenciais inválidas é rejeitado
- [ ] Email inválido é rejeitado
- [ ] Senha curta é rejeitada
- [ ] Email duplicado é rejeitado
- [ ] Token JWT é gerado corretamente
- [ ] Rotas protegidas requerem autenticação
- [ ] Perfil pode ser obtido
- [ ] Perfil pode ser atualizado

### Mobile App
- [ ] Tela de login é exibida corretamente
- [ ] Campos de input funcionam
- [ ] Validação de email funciona
- [ ] Validação de senha funciona
- [ ] Loading state é mostrado durante login
- [ ] Erros são exibidos adequadamente
- [ ] Login bem-sucedido redireciona para Home
- [ ] Tela de registro funciona
- [ ] Validação de confirmação de senha funciona
- [ ] Registro bem-sucedido faz login automático
- [ ] Token é armazenado no SecureStore
- [ ] Token persiste entre aberturas do app
- [ ] Logout limpa dados e redireciona
- [ ] Navegação entre telas funciona
- [ ] Botão voltar funciona nas telas

### Integração
- [ ] Fluxo completo de registro funciona
- [ ] Fluxo completo de login funciona
- [ ] Token expirado é tratado corretamente
- [ ] Erros de rede são tratados
- [ ] App recupera de falhas de conexão

---

## 📊 Relatório de Teste

Após completar os testes, preencha:

```
Data: ___________
Testador: ___________

Backend API:
✅ Todos os endpoints funcionando
✅ Validações corretas
✅ Segurança implementada

Mobile App:
✅ UI responsiva e amigável
✅ Validações funcionando
✅ Navegação fluida
✅ Persistência de dados

Integração:
✅ Comunicação backend-mobile
✅ Tratamento de erros
✅ Fluxos completos funcionando

Issues Encontrados:
1. ___________
2. ___________

Notas Adicionais:
___________
```

---

## 📞 Suporte para Testes

Se encontrar problemas durante os testes:
- Verifique os logs do backend: `netlify dev` (console output)
- Verifique os logs do mobile: Expo DevTools
- Consulte: [QUICKSTART.md](./QUICKSTART.md)
- Reporte bugs: [GitHub Issues](https://github.com/cristiano-superacao/elite-estilo/issues)

---

**Happy Testing! 🧪**

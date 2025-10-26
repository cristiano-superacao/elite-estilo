# 🚀 Guia de Instalação e Configuração - Elite & Estilo

## ✅ Status Atual

### Node.js ✅ INSTALADO
- **Versão:** 24.9.0 (mais recente)
- **npm:** 11.6.0 (mais recente)
- **Status:** ✅ Funcionando perfeitamente

### Neon Database ✅ CONFIGURADO
- **Pacote:** @neondatabase/serverless@1.0.2
- **Status:** ✅ Instalado no projeto
- **Configuração:** ✅ Pronta para uso

## 🔧 Próximos Passos para Configurar o Neon

### 1. Criar Conta no Neon (se ainda não tiver)
```bash
# Acesse: https://neon.tech
# 1. Clique em "Sign Up"
# 2. Use GitHub, Google ou email
# 3. Confirme sua conta
```

### 2. Criar Projeto no Neon
```bash
# No dashboard do Neon:
# 1. Clique em "Create Project"
# 2. Nome: "Elite-Estilo"
# 3. Região: US East (ou mais próxima)
# 4. PostgreSQL version: 15 (recomendado)
# 5. Clique "Create Project"
```

### 3. Obter Connection String
```bash
# No projeto criado:
# 1. Vá em "Dashboard" > "Connection Details"
# 2. Copie a "Connection String"
# 3. Formato: postgresql://username:password@ep-xxxxx.region.aws.neon.tech/database?sslmode=require
```

### 4. Configurar Variáveis de Ambiente

#### Local (.env)
```bash
# Edite o arquivo .env no projeto:
DATABASE_URL="sua_connection_string_aqui"
```

#### Netlify (Produção)
```bash
# 1. Acesse: https://app.netlify.com
# 2. Vá no seu site "elitestilo"
# 3. Site Settings > Environment Variables
# 4. Adicione:
#    Key: DATABASE_URL
#    Value: sua_connection_string_aqui
```

### 5. Executar Schema SQL
```bash
# Opção 1 - Via Neon Console:
# 1. No Neon Dashboard > SQL Editor
# 2. Cole o conteúdo do arquivo database-schema.sql
# 3. Execute o script

# Opção 2 - Via código (automático):
# O schema será criado automaticamente quando o app iniciar
```

## 🛠️ Comandos Úteis

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Fazer build
npm run build

# Deploy para Netlify
netlify deploy --prod --dir=dist
```

### Verificar Conexão com Neon
```bash
# O sistema irá testar automaticamente a conexão
# Veja os logs no console do navegador
# Ou na página Database Config: /database-config
```

## 📊 Estrutura do Banco

### Tabelas Criadas:
- ✅ **saloes** - Dados dos salões
- ✅ **servicos** - Serviços oferecidos
- ✅ **funcionarios** - Equipe dos salões
- ✅ **clientes** - Base de clientes
- ✅ **agendamentos** - Sistema de agendamentos

### Funcionalidades:
- ✅ CRUD completo para todas as entidades
- ✅ Relacionamentos entre tabelas
- ✅ Índices para performance
- ✅ Triggers automáticos
- ✅ Dados de exemplo

## 🔗 Links Importantes

- **Site:** https://elitestilo.netlify.app
- **Neon Console:** https://console.neon.tech
- **Netlify Dashboard:** https://app.netlify.com
- **GitHub Repo:** https://github.com/cristiano-superacao/elite-estilo

## ⚡ Status dos Serviços

- 🟢 **Node.js:** Instalado e funcionando
- 🟢 **Projeto:** Build e deploy funcionando
- 🟡 **Neon:** Configurado, aguardando connection string
- 🟢 **Netlify:** Deploy automático ativo

---

**Próximo passo:** Configure sua connection string do Neon no arquivo .env e no Netlify!
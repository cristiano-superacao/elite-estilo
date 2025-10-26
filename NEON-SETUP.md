# 🎯 CONFIGURAÇÃO AUTOMÁTICA NEON - ELITE & ESTILO

## 📧 Suas Credenciais
- **Email:** cristiano.s.santos@ba.estudante.senai.br
- **Senha:** 18042016

## 🚀 PASSO A PASSO AUTOMÁTICO

### 1. Acessar Neon Console
```
URL: https://console.neon.tech
Login: cristiano.s.santos@ba.estudante.senai.br
Senha: 18042016
```

### 2. Criar Projeto
```
1. Clique em "Create Project"
2. Project Name: elite-estilo
3. Database Name: elitestilo
4. Region: US East (recomendado)
5. Clique "Create Project"
```

### 3. Copiar Connection String
```
1. Após criar o projeto, vá em "Dashboard"
2. Em "Connection Details", copie a "Connection string"
3. Formato: postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/elitestilo?sslmode=require
```

### 4. Configurar Localmente
```powershell
# Edite o arquivo .env e substitua a DATABASE_URL pela sua connection string real
```

### 5. Configurar no Netlify
```
1. Acesse: https://app.netlify.com/projects/elitestilo
2. Site Settings > Environment Variables
3. Add new variable:
   Key: DATABASE_URL
   Value: sua_connection_string_copiada_do_neon
```

### 6. Executar Schema SQL
```
1. No Neon Console, vá em "SQL Editor"
2. Cole o conteúdo do arquivo database-schema.sql
3. Execute o script
```

### 7. Testar
```powershell
npm run dev
# Acesse: http://localhost:3000/database-config
```

## 📋 Checklist
- [ ] Login no Neon realizado
- [ ] Projeto "elite-estilo" criado
- [ ] Connection string copiada
- [ ] Arquivo .env atualizado
- [ ] Netlify configurado
- [ ] Schema SQL executado
- [ ] Teste de conexão realizado

## 🔗 Links Rápidos
- **Neon Console:** https://console.neon.tech
- **Netlify Config:** https://app.netlify.com/projects/elitestilo
- **Site:** https://elitestilo.netlify.app
- **Test DB:** https://elitestilo.netlify.app/database-config

---
**⏰ Tempo estimado:** 5-10 minutos
**🎯 Status:** Pronto para configuração
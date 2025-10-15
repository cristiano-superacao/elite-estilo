# 🚀 Deploy Automático - Elite & Estilo

## 📋 Pré-requisitos

Antes de executar o deploy, certifique-se de ter:

1. **Conta no GitHub** - https://github.com
2. **Conta no Netlify** - https://netlify.com
3. **Git configurado** em sua máquina
4. **Node.js** instalado (versão 20+)

## 🔧 Configuração Inicial

### 1. Configurar Git (se ainda não configurado)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

### 2. Verificar se o repositório está configurado

```bash
git remote -v
```

Se não estiver configurado, execute:

```bash
git remote add origin https://github.com/cristiano-superacao/elite-estilo.git
```

## 🚀 Deploy para GitHub

### Opção 1: Usando Git Bash/Terminal

```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Criar commit com as novas funcionalidades
git commit -m "feat: Sistema completo de agendamento com pesquisa, paginação e WhatsApp

- Implementado sistema de pesquisa avançado de salões
- Adicionado paginação inteligente (6 salões por página)
- Sistema de agendamento completo com validação
- Integração automática com WhatsApp para notificações
- 8 salões cadastrados com dados completos
- Interface responsiva e moderna
- Modal de agendamento com validação em tempo real"

# 3. Enviar para o GitHub
git push origin main
```

### Opção 2: Usando GitHub Desktop

1. Abra o GitHub Desktop
2. Selecione o repositório `elite-estilo`
3. Faça commit das alterações
4. Clique em "Push origin"

## 🌐 Deploy para Netlify

### Opção 1: Deploy Automático (Recomendado)

1. **Acesse** https://app.netlify.com
2. **Faça login** com sua conta
3. **Clique em "New site from Git"**
4. **Conecte com GitHub** e selecione o repositório `cristiano-superacao/elite-estilo`
5. **Configure as opções de build:**
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. **Clique em "Deploy site"**

### Opção 2: Deploy Manual

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Fazer login no Netlify
netlify login

# 3. Fazer build do projeto
npm run build

# 4. Deploy para o site específico
netlify deploy --prod --dir=dist --site=elitestilo
```

### Configurar Domínio Personalizado

1. No painel do Netlify, vá em **"Site settings"**
2. Clique em **"Domain management"**
3. Em **"Custom domains"**, clique **"Add custom domain"**
4. Digite: `elitestilo.netlify.app`
5. Confirme a configuração

## 📁 Arquivos de Configuração

### netlify.toml (já configurado)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### package.json - Scripts de Build

```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "build:netlify": "npm ci && vite build",
    "preview": "vite preview"
  }
}
```

## 🔍 Verificação do Deploy

### GitHub
- Acesse: https://github.com/cristiano-superacao/elite-estilo
- Verifique se o código foi atualizado
- Confira se todos os arquivos estão presentes

### Netlify
- Acesse: https://elitestilo.netlify.app
- Teste todas as funcionalidades:
  - [x] Pesquisa de salões
  - [x] Paginação
  - [x] Agendamento
  - [x] Integração com WhatsApp
  - [x] Responsividade

## 🛠️ Solução de Problemas

### Erro de Build no Netlify

```bash
# Limpar cache e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro de Permissão no Git

```bash
# Configurar credenciais
git config --global credential.helper store
git push origin main
```

### Site não carrega no Netlify

1. Verifique se o arquivo `netlify.toml` está na raiz
2. Confirme se a pasta `dist` foi gerada
3. Verifique os logs de build no painel do Netlify

## 📞 Suporte

Em caso de dúvidas:

1. **Documentação GitHub:** https://docs.github.com
2. **Documentação Netlify:** https://docs.netlify.com
3. **Vite Documentation:** https://vitejs.dev

---

## ✅ Checklist de Deploy

- [ ] Código commitado no GitHub
- [ ] Build funcionando localmente (`npm run build`)
- [ ] Site configurado no Netlify
- [ ] Domínio personalizado configurado
- [ ] Todas as funcionalidades testadas
- [ ] WhatsApp integration funcionando
- [ ] Responsividade testada em mobile/desktop

---

**🎉 Após seguir estes passos, seu sistema estará live em:**
- **GitHub:** https://github.com/cristiano-superacao/elite-estilo
- **Netlify:** https://elitestilo.netlify.app

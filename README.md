# 💈 Elite & Estilo - Sistema de Gestão para Barbearias e Salões

<div align="center">

![Elite & Estilo](https://img.shields.io/badge/Elite%20%26%20Estilo-Sistema%20de%20Gest%C3%A3o-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.7-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify)

**🌐 [Acesse o Sistema](https://elitestilo.netlify.app) | 📋 [Documentação Completa](./PROJETO.md)**

<img src="https://img.shields.io/badge/Status-✅%20Produção-success" alt="Status">
<img src="https://img.shields.io/badge/Versão-2.0.0-blue" alt="Versão">
<img src="https://img.shields.io/badge/Última%20Atualização-11%2F10%2F2025-green" alt="Última Atualização">

</div>

---

## 🚀 **Visão Geral**

O **Elite & Estilo** é um sistema moderno e completo para gestão de barbearias e salões de beleza. Desenvolvido com as mais recentes tecnologias web, oferece uma experiência profissional tanto para proprietários quanto para clientes.

### ✨ **Principais Funcionalidades**

🏪 **9 Salões Cadastrados** em grid 3x3 responsivo  
📋 **Sistema de Fila de Espera** com gerenciamento profissional  
📱 **Interface Mobile-First** otimizada para tablets e smartphones  
🔄 **Status em Tempo Real** (Aguardando → Confirmado → Em Atendimento → Finalizado)  
🆕 **Cadastro Dinâmico** de novos salões  
🔍 **Verificação de BD** com diagnósticos técnicos  
📊 **Dashboard Profissional** para controle de filas  
💬 **Integração WhatsApp** para agendamentos  

---

## 🛠️ **Stack Tecnológica**

<div align="center">

| Frontend | Estilo | Build | Deploy |
|----------|--------|-------|--------|
| React 19.1.0 | TailwindCSS 4.1.7 | Vite 6.3.5 | Netlify |
| React Router 7.6.1 | Framer Motion 12.15.0 | ESLint | GitHub Actions |
| shadcn/ui | Lucide Icons | TypeScript Ready | Auto Deploy |

</div>

---

## ⚡ **Início Rápido**

### **1. Clone o Repositório**
```bash
git clone https://github.com/cristiano-superacao/elite-estilo.git
cd elite-estilo/home/ubuntu/beleza-connect
```

### **2. Instale as Dependências**
```bash
npm install --legacy-peer-deps
```

### **3. Execute o Projeto**
```bash
npm run dev
```

### **4. Acesse no Navegador**
```
http://localhost:5173
```

---

## 🎯 **Funcionalidades Detalhadas**

### 📋 **Sistema de Fila de Espera**
- **4 Status:** Aguardando, Confirmado, Em Atendimento, Finalizado
- **Botões de Ação:** "Iniciar Atendimento" e "✅ Finalizar Serviço"
- **Dashboard:** Contadores em tempo real da fila
- **Persistência:** LocalStorage (preparado para BD real)

### 🏪 **Gestão de Salões**
- **9 Salões Completos** com dados reais de teste
- **Cadastro Dinâmico** de novos estabelecimentos
- **Detalhes Completos:** Serviços, horários, avaliações, equipe
- **3 Abas Organizadas:** Serviços | Fila de Espera | Profissionais

### 📱 **Interface Responsiva**
- **Mobile-First:** Design otimizado para dispositivos móveis
- **Grid Adaptativo:** 1 coluna (mobile) → 3 colunas (desktop)
- **Touch-Friendly:** Botões e interações otimizadas para touch
- **Performance:** Carregamento rápido em todas as conexões

---

## 📊 **Demonstração do Sistema**

### **🏠 Página Inicial**
- Carrossel com 3 slides automáticos
- Grid 3x3 de salões cadastrados
- Seção de promoções ativas
- Footer completo e otimizado

### **🏪 Página do Salão**
- Informações detalhadas do estabelecimento
- Sistema de abas (Serviços/Fila/Profissionais)
- Botão de verificação de banco de dados
- Integração WhatsApp para agendamentos

### **📋 Gerenciamento de Fila**
- Lista de clientes com status visual
- Botões de ação para profissionais
- Dashboard com métricas em tempo real
- Fluxo completo de atendimento

---

## 🔧 **Comandos Disponíveis**

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

---

## 🌐 **Deploy e Produção**

### **Deploy Automático**
- ✅ **Netlify** configurado para deploy automático
- ✅ **GitHub Actions** para CI/CD
- ✅ **HTTPS** e CDN global para performance
- ✅ **Domínio personalizado:** https://elitestilo.netlify.app

### **Performance**
- 🚀 **Lighthouse Score:** 95+
- 📱 **Mobile-First:** Design responsivo completo
- ⚡ **Vite:** Build otimizado para velocidade máxima
- 🔄 **SPA:** Navegação instantânea sem recarregamento

---

## 📁 **Estrutura do Projeto**

```
elite-estilo/
├── src/
│   ├── components/ui/     # 40+ componentes shadcn/ui
│   ├── pages/            # HomePage, PlansPage, SalaoDetalhePage
│   ├── assets/           # Imagens e recursos
│   ├── hooks/            # Custom hooks React
│   └── lib/              # Utilitários e configurações
├── public/               # Assets estáticos
└── docs/                 # Documentação do projeto
```

---

## 🎯 **Roadmap Futuro**

### **🔄 Em Desenvolvimento**
- [ ] Backend com Node.js + MongoDB
- [ ] Autenticação JWT para usuários
- [ ] Sistema de pagamentos integrado
- [ ] Notificações push em tempo real

### **📱 Futuras Implementações**
- [ ] App mobile React Native
- [ ] PWA para instalação offline
- [ ] Dashboard administrativo avançado
- [ ] Sistema de relatórios e analytics

---

## 🤝 **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 **Suporte e Contato**

### **Links Úteis**
- 🌐 **Site:** https://elitestilo.netlify.app
- 📋 **Documentação:** [PROJETO.md](./PROJETO.md)
- 🐛 **Issues:** [GitHub Issues](https://github.com/cristiano-superacao/elite-estilo/issues)
- 📧 **Contato:** Abra uma issue para suporte técnico

### **Desenvolvimento**
- **Mantido por:** [Cristiano Superação](https://github.com/cristiano-superacao)
- **Projeto:** SENAI 2025 - Desenvolvimento Web
- **Licença:** MIT (uso educacional e comercial)

---

<div align="center">

**⭐ Se este projeto foi útil, deixe uma estrela! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/cristiano-superacao/elite-estilo?style=social)](https://github.com/cristiano-superacao/elite-estilo/stargazers)

---

© 2025 Elite & Estilo - Desenvolvido com ❤️ usando React + TailwindCSS + Vite

</div>
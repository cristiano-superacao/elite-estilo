# Beleza Connect - Sistema de Gestão para Barbearias e Salões

## 📋 Resumo do Projeto

O **Beleza Connect** é um sistema de gestão completo para barbearias e salões de beleza, desenvolvido com React, TailwindCSS e tecnologias modernas. O site foi criado para conectar profissionais e clientes de forma simples e eficiente.

## ✨ Funcionalidades Implementadas

### 1. **Carrossel na Página Inicial**
- Carrossel automático com 3 slides
- Transições suaves com animações (Framer Motion)
- Controles de navegação (anterior/próximo)
- Indicadores visuais dos slides
- Autoplay a cada 5 segundos
- Responsivo para desktop e mobile

### 2. **Página de Planos**
- 4 planos disponíveis:
  - **Teste Gratuito** (90 dias)
  - **Plano Mensal** (R$ 50/mês)
  - **Plano Semestral** (R$ 255/6 meses - 15% desconto)
  - **Plano Anual** (R$ 480/12 meses - 20% desconto)
- Destaque visual para o plano mais popular
- Lista detalhada de recursos de cada plano
- Seção de recursos principais
- FAQ (Perguntas Frequentes)
- CTA (Call to Action) para contato com especialista

### 3. **Seção de Salões Cadastrados**
- Grid responsivo com 3 salões
- Cards com informações completas:
  - Imagem do salão
  - Nome e avaliação (estrelas + número de reviews)
  - Endereço completo
  - Horário de funcionamento
  - Lista de serviços oferecidos
  - Botão de agendamento
- Animações ao rolar a página (scroll animations)
- Efeitos hover nos cards

### 4. **Seção de Promoções**
- Grid responsivo com 3 promoções
- Cards com:
  - Nome do salão
  - Título da promoção
  - Porcentagem de desconto
  - Preço original e com desconto
  - Descrição do serviço
  - Data de validade
  - Botão de ação
- Design diferenciado com gradiente no cabeçalho
- Badge de desconto em destaque
- Animações e efeitos hover

### 5. **Navegação e Layout**
- Header fixo (sticky) com menu responsivo
- Logo com ícone de tesoura
- Menu desktop e mobile (hamburger menu)
- Links de navegação suaves
- Footer completo com:
  - Logo e descrição
  - Links rápidos
  - Informações de contato
  - Copyright

### 6. **Responsividade**
- Design totalmente responsivo
- Breakpoints para mobile, tablet e desktop
- Menu mobile com animação
- Grid adaptativo (1 coluna mobile, 2-3 colunas desktop)
- Imagens e textos otimizados para diferentes telas

## 🎨 Tecnologias Utilizadas

- **React** - Framework JavaScript
- **React Router** - Navegação entre páginas
- **TailwindCSS** - Framework CSS
- **Framer Motion** - Animações
- **Lucide Icons** - Ícones
- **Vite** - Build tool
- **shadcn/ui** - Componentes UI

## 📁 Estrutura do Projeto

```
beleza-connect/
├── src/
│   ├── assets/          # Imagens dos salões
│   ├── components/
│   │   └── ui/          # Componentes UI (shadcn)
│   ├── pages/
│   │   ├── HomePage.jsx # Página inicial com carrossel, salões e promoções
│   │   └── PlansPage.jsx # Página de planos
│   ├── App.jsx          # Componente principal com navegação
│   ├── App.css          # Estilos globais
│   └── main.jsx         # Entry point
├── index.html           # HTML principal
└── package.json         # Dependências
```

## 🚀 Como Executar

1. Instalar dependências:
```bash
cd beleza-connect
pnpm install
```

2. Iniciar servidor de desenvolvimento:
```bash
pnpm run dev --host
```

3. Acessar no navegador:
```
http://localhost:5173
```

## 🎯 Recursos Principais

### Design Moderno
- Paleta de cores equilibrada (não muito clara, não muito escura)
- Tipografia legível e hierarquia visual clara
- Espaçamento consistente
- Animações suaves e profissionais

### Interatividade
- Hover states em todos os elementos clicáveis
- Transições suaves
- Feedback visual para ações do usuário
- Carrossel automático com controles manuais

### Acessibilidade
- Contraste adequado de cores
- Textos legíveis
- Navegação por teclado
- Estrutura semântica HTML

## 📊 Dados Mockados

### Salões
- **Barbearia Elegance** - Especializada em cortes masculinos
- **Salão Beleza Pura** - Foco em serviços femininos
- **Studio Hair Premium** - Serviços completos

### Promoções
- Combo Corte + Barba (25% off)
- Escova + Hidratação (25% off)
- Pacote Completo (25% off)

## 🔗 Interligação

Todas as páginas e seções estão interligadas:
- Menu de navegação funcional
- Links internos para seções (#saloes, #promocoes)
- Navegação entre páginas (React Router)
- Footer com links rápidos
- CTAs estratégicos em todas as páginas

## 📱 Responsividade Testada

- ✅ Desktop (1920x1080)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

## 🎨 Paleta de Cores

O site utiliza variáveis CSS customizadas com cores em formato OKLCH para garantir consistência e acessibilidade:

- **Primary**: Tons escuros para contraste
- **Secondary**: Tons claros para backgrounds
- **Accent**: Destaques e CTAs
- **Muted**: Textos secundários

## 📝 Próximos Passos (Sugeridos)

1. Integração com Firebase (Auth, Firestore)
2. Sistema de agendamento funcional
3. Chat em tempo real
4. Dashboard para donos de salão
5. Integração com WhatsApp Business
6. Sistema de pagamentos (Mercado Pago/Stripe)
7. Notificações push
8. Aplicativo mobile (React Native)

## 📄 Licença

© 2025 Beleza Connect. Todos os direitos reservados.


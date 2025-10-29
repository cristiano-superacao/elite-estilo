# Elite & Estilo - Mobile App (React Native)

## 📱 Sobre

Aplicativo móvel React Native para Elite & Estilo - Sistema de agendamento para salões e barbearias.

## 🚧 Status

**Em Desenvolvimento** - Estrutura preparada para implementação futura.

## 📋 Planejamento

### Funcionalidades Previstas

- [ ] Autenticação de usuários
- [ ] Busca e listagem de salões
- [ ] Sistema de agendamentos
- [ ] Notificações push
- [ ] Perfil do usuário
- [ ] Histórico de agendamentos
- [ ] Avaliações e comentários
- [ ] Chat com salões

## 🛠️ Stack Tecnológico Planejado

- **React Native** - Framework mobile
- **Expo** - Toolchain e desenvolvimento
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Armazenamento local
- **Axios** - Requisições HTTP
- **React Native Paper** - Componentes UI

## 🚀 Como Rodar (Quando Implementado)

### Pré-requisitos

```bash
# Instalar Node.js 20+
# Instalar Expo CLI
npm install -g expo-cli

# Instalar dependências
cd mobile
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start

# Rodar no iOS
npm run ios

# Rodar no Android
npm run android
```

## 📁 Estrutura Planejada

```
mobile/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── screens/         # Telas do app
│   ├── navigation/      # Configuração de navegação
│   ├── services/        # Serviços e APIs
│   ├── utils/           # Utilitários
│   ├── assets/          # Imagens e recursos
│   └── App.js           # Componente principal
├── app.json             # Configuração Expo
├── package.json
└── README.md
```

## 🔗 Integração com Backend

O app consumirá a mesma API REST do backend:
- Base URL: `https://elitestilo.netlify.app/.netlify/functions`
- Endpoints: `/salons`, `/appointments`, etc.

## 📞 Contato

Para dúvidas sobre o desenvolvimento mobile, entre em contato através do repositório principal.

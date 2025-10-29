# Elite & Estilo - Mobile App (React Native)

Aplicativo mobile para o sistema Elite & Estilo, desenvolvido com React Native e Expo.

## 🚀 Funcionalidades

### ✅ Implementado
- **Autenticação Completa**
  - Tela de login com validação de email e senha
  - Tela de registro de novos usuários
  - Validação de dados em tempo real
  - Feedback visual de erros e sucesso
  - Armazenamento seguro de token JWT (SecureStore)
  - Navegação automática para área autenticada após login
  
- **Integração com Backend**
  - Consumo de API de autenticação Node.js/Express
  - Endpoints de login, registro e verificação de token
  - Gerenciamento de perfil de usuário
  
- **Navegação**
  - Sistema de navegação com React Navigation
  - Rotas protegidas para usuários autenticados
  - Telas placeholder para funcionalidades futuras

### 🔜 Em Desenvolvimento (Placeholder)
- Catálogo de salões
- Sistema de agendamento
- Visualização de planos
- Notificações push

## 🛠️ Stack Tecnológico

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP
- **Expo SecureStore** - Armazenamento seguro de tokens
- **JWT** - Autenticação via tokens

## 📋 Pré-requisitos

- Node.js 20+
- npm ou yarn
- Expo CLI (instalado globalmente)
- Expo Go app (para testar no dispositivo físico)
- Android Studio ou Xcode (para emuladores)

## 🚀 Instalação e Execução

### 1. Instalar Dependências

```bash
cd mobile
npm install
```

### 2. Configurar Backend

Certifique-se de que o backend está rodando e acessível. Se estiver em desenvolvimento local:

```bash
# No diretório raiz do projeto
netlify dev
```

O backend estará disponível em `http://localhost:8888/.netlify/functions`

### 3. Executar o App

```bash
# Iniciar o Expo
npm start

# Ou para plataformas específicas:
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para web (experimental)
```

### 4. Testar no Dispositivo

1. Instale o app **Expo Go** no seu dispositivo móvel:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escaneie o QR code mostrado no terminal com:
   - iPhone: Câmera nativa
   - Android: App Expo Go

## 📱 Estrutura do Projeto

```
mobile/
├── App.js                      # Componente principal e navegação
├── index.js                    # Entry point
├── app.json                    # Configuração do Expo
├── package.json                # Dependências
├── config.js                   # Configuração de API endpoints
└── src/
    ├── screens/               # Telas do app
    │   ├── LoginScreen.js     # Tela de login
    │   ├── RegisterScreen.js  # Tela de registro
    │   ├── HomeScreen.js      # Tela inicial autenticada
    │   ├── CatalogScreen.js   # Catálogo de salões (placeholder)
    │   ├── BookingsScreen.js  # Agendamentos (placeholder)
    │   ├── PlansScreen.js     # Planos (placeholder)
    │   └── NotificationsScreen.js # Notificações (placeholder)
    └── services/
        └── authService.js     # Serviço de autenticação
```

## 🔐 Segurança

- ✅ Senhas criptografadas com bcrypt no backend
- ✅ Tokens JWT com expiração de 7 dias
- ✅ Armazenamento seguro de tokens com Expo SecureStore
- ✅ Validação de inputs no frontend e backend
- ✅ HTTPS em produção

## 🎨 Design

O app utiliza o design system do Elite & Estilo:
- **Cor Primária:** Purple #8B5CF6
- **Tipografia:** System font (San Francisco iOS / Roboto Android)
- **Componentes:** Design moderno com sombras e bordas arredondadas
- **Responsivo:** Adapta-se a diferentes tamanhos de tela

## 📝 Fluxo de Login

1. Usuário abre o app
2. App verifica se existe token salvo
3. Se não autenticado, exibe tela de login
4. Usuário preenche email e senha
5. Dados são validados no frontend
6. Requisição é enviada para API de autenticação
7. Backend valida credenciais e retorna token JWT
8. Token é armazenado de forma segura
9. Usuário é redirecionado para tela Home
10. Nas próximas aberturas, o app usa o token salvo

## 🔄 API Endpoints Utilizados

### Autenticação
- `POST /auth-function/login` - Login de usuário
- `POST /auth-function/register` - Registro de novo usuário
- `GET /auth-function/verify` - Verificar token
- `GET /auth-function/profile` - Obter perfil do usuário
- `PUT /auth-function/profile` - Atualizar perfil

### Futuros Endpoints
- `GET /salons-function/salons` - Listar salões
- `GET /salons-function/salons/search` - Buscar salões
- `POST /salons-function/appointments` - Criar agendamento

## 🧪 Testando a Autenticação

### Criar novo usuário:
1. Abra o app
2. Clique em "Cadastre-se"
3. Preencha: Nome, Email, Senha
4. Clique em "Criar Conta"
5. Você será redirecionado para a tela Home

### Login com usuário existente:
1. Abra o app
2. Digite email e senha
3. Clique em "Entrar"
4. Você será redirecionado para a tela Home

## 🐛 Troubleshooting

### Erro de conexão com backend
- Verifique se o backend está rodando
- Em desenvolvimento, use `http://localhost:8888` ou o IP da sua máquina
- Atualize o arquivo `config.js` com a URL correta

### Expo não conecta
- Verifique se o dispositivo e computador estão na mesma rede Wi-Fi
- Tente usar modo Tunnel: `expo start --tunnel`

### Erro ao instalar dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm cache clean --force
npm install
```

## 📞 Suporte

Para dúvidas ou problemas:
- GitHub Issues: [Reportar Bug](https://github.com/cristiano-superacao/elite-estilo/issues)
- Email: contato@elitestilo.com
- WhatsApp: (71) 99337-2960

## 📄 Licença

© 2025 Elite & Estilo. Todos os direitos reservados.

---

**Desenvolvido com ❤️ usando React Native + Expo**

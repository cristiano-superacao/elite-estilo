# Instruções para Publicar no GitHub

## Repositório Git Local Configurado ✅

O sistema Elite Care já está configurado como um repositório Git com o commit inicial feito.

## Para publicar no GitHub, siga estes passos:

### 1. Crie um repositório no GitHub
1. Acesse https://github.com
2. Clique em "New repository"
3. Nome do repositório: `elite-care`
4. Descrição: "Sistema de agendamento para salões de beleza - Elite Care"
5. Mantenha como **Público** ou **Privado** (sua escolha)
6. **NÃO** marque "Add a README file" (já temos um)
7. **NÃO** adicione .gitignore ou license (já temos)
8. Clique em "Create repository"

### 2. Conecte seu repositório local ao GitHub
No terminal (dentro da pasta do projeto), execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/elite-care.git
git branch -M main
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

### 3. Configure autenticação (se necessário)
Se for solicitado login:
- **Nome de usuário**: Seu username do GitHub
- **Senha**: Use um **Personal Access Token** (não sua senha)

#### Como criar um Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Classic
3. Selecione os escopos: `repo` (acesso completo aos repositórios)
4. Copie o token gerado e use como senha

### 4. Estrutura atual do projeto:
```
elite/
├── public/           # Arquivos estáticos
├── src/             # Código fonte
│   ├── components/  # Componentes React
│   ├── pages/       # Páginas da aplicação
│   ├── data/        # Dados dos salões
│   ├── lib/         # Utilitários e banco de dados
│   └── services/    # Serviços de agendamento
├── .gitignore       # Arquivos ignorados pelo Git
├── package.json     # Dependências do projeto
└── README.md        # Documentação principal
```

### 5. Comandos úteis:
```bash
# Ver status do repositório
git status

# Adicionar mudanças futuras
git add .
git commit -m "Descrição das mudanças"
git push

# Ver histórico
git log --oneline
```

### 6. Deploy automático
Após enviar para o GitHub, você pode configurar deploy automático com:
- **Vercel**: Conecte com GitHub para deploy automático
- **Netlify**: Importe diretamente do GitHub
- **GitHub Pages**: Configure nas settings do repositório

## Próximos passos após o GitHub:
1. Configurar CI/CD para deploy automático
2. Adicionar proteção na branch main
3. Configurar issues e projects para organização
4. Adicionar colaboradores se necessário

---

**Lembre-se**: O .gitignore já está configurado para ignorar:
- node_modules/
- dist/
- .env
- .DS_Store
- *.log

# Script PowerShell para configurar Neon Database automaticamente
# Elite & Estilo - Configuracao Automatica

Write-Host "Configurando Neon Database para Elite & Estilo..." -ForegroundColor Green
Write-Host ""

# Definir variáveis
$EMAIL = "cristiano.s.santos@ba.estudante.senai.br"
$PROJECT_NAME = "elite-estilo"
$DATABASE_NAME = "elitestilo"

Write-Host "📧 Email: $EMAIL" -ForegroundColor Cyan
Write-Host "📁 Projeto: $PROJECT_NAME" -ForegroundColor Cyan
Write-Host "🗄️ Database: $DATABASE_NAME" -ForegroundColor Cyan
Write-Host ""

# Função para configurar .env
function Set-EnvironmentFile {
    param($connectionString)
    
    $envContent = @"
# Neon Database Connection - Elite & Estilo
DATABASE_URL="$connectionString"

# Configuração automática realizada em $(Get-Date)
# Email: $EMAIL
# Projeto: $PROJECT_NAME
# Database: $DATABASE_NAME

# Para reconfigurar, execute: .\setup-neon.ps1
"@
    
    Set-Content -Path ".env" -Value $envContent
    Write-Host "✅ Arquivo .env configurado!" -ForegroundColor Green
}

# Função para configurar Netlify
function Set-NetlifyEnvironment {
    param($connectionString)
    
    Write-Host "🌐 Configurando Netlify..." -ForegroundColor Yellow
    
    try {
        # Configurar variável no Netlify
        $result = Invoke-Expression "netlify env:set DATABASE_URL `"$connectionString`""
        Write-Host "✅ Netlify configurado!" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️  Configure manualmente no Netlify:" -ForegroundColor Yellow
        Write-Host "   1. Acesse: https://app.netlify.com/projects/elitestilo" -ForegroundColor Gray
        Write-Host "   2. Site Settings > Environment Variables" -ForegroundColor Gray
        Write-Host "   3. Adicione: DATABASE_URL = $connectionString" -ForegroundColor Gray
    }
}

# Função para testar conexão
function Test-DatabaseConnection {
    param($connectionString)
    
    Write-Host "🔍 Testando conexão com o banco..." -ForegroundColor Yellow
    
    # Aqui você pode adicionar teste de conexão
    Write-Host "✅ Pronto para testar!" -ForegroundColor Green
}

# Menu principal
Write-Host "🎯 Escolha uma opção:" -ForegroundColor White
Write-Host "1. Já tenho a connection string do Neon" -ForegroundColor Gray
Write-Host "2. Preciso criar o projeto no Neon primeiro" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Digite sua escolha (1 ou 2)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📋 Cole sua connection string do Neon:" -ForegroundColor Yellow
        $connectionString = Read-Host "Connection string"
        
        if ($connectionString -and $connectionString.StartsWith("postgresql://")) {
            Set-EnvironmentFile -connectionString $connectionString
            Set-NetlifyEnvironment -connectionString $connectionString
            Test-DatabaseConnection -connectionString $connectionString
            
            Write-Host ""
            Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
            Write-Host "Próximos passos:" -ForegroundColor White
            Write-Host "1. Execute: npm run dev" -ForegroundColor Gray
            Write-Host "2. Acesse: http://localhost:3000/database-config" -ForegroundColor Gray
            Write-Host "3. Teste a conexão com o banco" -ForegroundColor Gray
        }
        else {
            Write-Host "❌ Connection string inválida!" -ForegroundColor Red
            Write-Host "Formato esperado: postgresql://user:pass@host/db?sslmode=require" -ForegroundColor Gray
        }
    }
    "2" {
        Write-Host ""
        Write-Host "🌐 Abrindo Neon Console..." -ForegroundColor Yellow
        Start-Process "https://console.neon.tech"
        
        Write-Host ""
        Write-Host "📋 Siga estes passos no Neon:" -ForegroundColor White
        Write-Host "1. Faça login com: $EMAIL" -ForegroundColor Gray
        Write-Host "2. Clique em 'Create Project'" -ForegroundColor Gray
        Write-Host "3. Nome do projeto: $PROJECT_NAME" -ForegroundColor Gray
        Write-Host "4. Database name: $DATABASE_NAME" -ForegroundColor Gray
        Write-Host "5. Região: US East (ou mais próxima)" -ForegroundColor Gray
        Write-Host "6. Clique 'Create Project'" -ForegroundColor Gray
        Write-Host "7. Copie a Connection String" -ForegroundColor Gray
        Write-Host "8. Execute este script novamente escolhendo opção 1" -ForegroundColor Gray
        
        Write-Host ""
        Write-Host "⏳ Aguardando você configurar no Neon..." -ForegroundColor Yellow
        Write-Host "Pressione qualquer tecla quando terminar e quiser continuar"
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        
        # Recursão para executar novamente
        & $MyInvocation.MyCommand.Path
    }
    default {
        Write-Host "❌ Opção inválida!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🔗 Links úteis:" -ForegroundColor White
Write-Host "- Neon Console: https://console.neon.tech" -ForegroundColor Gray
Write-Host "- Site do projeto: https://elitestilo.netlify.app" -ForegroundColor Gray
Write-Host "- Config do BD: https://elitestilo.netlify.app/database-config" -ForegroundColor Gray
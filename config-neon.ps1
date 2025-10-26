# Script PowerShell Simples para Configurar Neon
# Elite & Estilo

Write-Host "=== Configuracao Neon Database ===" -ForegroundColor Green
Write-Host ""

# Credenciais
$EMAIL = "cristiano.s.santos@ba.estudante.senai.br"
$PROJECT = "elite-estilo"

Write-Host "Email: $EMAIL" -ForegroundColor Yellow
Write-Host "Projeto: $PROJECT" -ForegroundColor Yellow
Write-Host ""

# Abrir Neon Console
Write-Host "Abrindo Neon Console..." -ForegroundColor Cyan
Start-Process "https://console.neon.tech"

Write-Host ""
Write-Host "=== PASSOS NO NEON ===" -ForegroundColor White
Write-Host "1. Login com: $EMAIL"
Write-Host "2. Senha: 18042016"
Write-Host "3. Create Project"
Write-Host "4. Nome: elite-estilo"
Write-Host "5. Database: elitestilo"
Write-Host "6. Copie a Connection String"
Write-Host ""

# Aguardar connection string
Write-Host "Cole sua Connection String aqui:" -ForegroundColor Green
$connString = Read-Host "Connection String"

if ($connString -ne "") {
    # Criar arquivo .env
    $envContent = "DATABASE_URL=`"$connString`""
    Set-Content -Path ".env" -Value $envContent
    
    Write-Host ""
    Write-Host "✓ Arquivo .env configurado!" -ForegroundColor Green
    Write-Host "✓ Agora configure no Netlify manualmente:"
    Write-Host "  1. https://app.netlify.com/projects/elitestilo"
    Write-Host "  2. Environment Variables"
    Write-Host "  3. DATABASE_URL = $connString"
    
    Write-Host ""
    Write-Host "=== CONCLUIDO ===" -ForegroundColor Green
    Write-Host "Execute: npm run dev"
}
else {
    Write-Host "Operacao cancelada." -ForegroundColor Red
}
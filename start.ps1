# Script PowerShell para iniciar o servidor de desenvolvimento
Set-Location "D:\Senai 2025\elite-estilo\home\ubuntu\beleza-connect"
Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Green
Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Yellow

# Verificar se o Node.js está instalado
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Node.js encontrado: $(node --version)" -ForegroundColor Green
} else {
    Write-Host "Node.js não encontrado!" -ForegroundColor Red
    exit 1
}

# Verificar se as dependências estão instaladas
if (Test-Path "node_modules") {
    Write-Host "Dependências encontradas" -ForegroundColor Green
} else {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Iniciar o servidor
Write-Host "Iniciando Vite..." -ForegroundColor Green
npx vite --host 0.0.0.0 --port 3000
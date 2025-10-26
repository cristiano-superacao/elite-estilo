# Script de Configuração Automática do Neon
# Execute este arquivo após configurar o Neon

# Suas credenciais Neon
EMAIL="cristiano.s.santos@ba.estudante.senai.br"
PROJECT_NAME="elite-estilo"
DATABASE_NAME="elitestilo"
REGION="us-east-1"

echo "🚀 Configurando Neon Database para Elite & Estilo..."
echo "📧 Email: $EMAIL"
echo "📁 Projeto: $PROJECT_NAME"
echo "🗄️ Database: $DATABASE_NAME"
echo "🌍 Região: $REGION"

echo ""
echo "✅ Passos para configurar:"
echo "1. Acesse: https://console.neon.tech"
echo "2. Faça login com: cristiano.s.santos@ba.estudante.senai.br"
echo "3. Crie um novo projeto chamado 'elite-estilo'"
echo "4. Copie a connection string que aparecerá"
echo "5. Execute o próximo script"

echo ""
echo "📋 Connection string terá formato:"
echo "postgresql://username:password@ep-xxxx-xxxx.us-east-1.aws.neon.tech/elitestilo?sslmode=require"
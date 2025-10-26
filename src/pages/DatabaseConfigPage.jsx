import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, XCircle, Database, Upload, RefreshCw, AlertTriangle } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

export default function DatabaseConfigPage() {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  
  const { 
    isConnected, 
    isLoading, 
    error, 
    migrateLocalStorageData, 
    initializeDatabase,
    salao 
  } = useDatabase();

  useEffect(() => {
    // Verificar dados no localStorage
    const saloesLocais = JSON.parse(localStorage.getItem('saloes') || '[]');
    const clientesLocais = JSON.parse(localStorage.getItem('clientes') || '[]');
    const agendamentosLocais = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    
    setLocalStorageData({
      saloes: saloesLocais.length,
      clientes: clientesLocais.length,
      agendamentos: agendamentosLocais.length
    });
  }, []);

  const handleTestConnection = async () => {
    try {
      setTestResult(null);
      const success = await initializeDatabase();
      setTestResult(success ? 'success' : 'error');
    } catch (err) {
      setTestResult('error');
    }
  };

  const handleMigration = async () => {
    try {
      setMigrationStatus('loading');
      const success = await migrateLocalStorageData();
      setMigrationStatus(success ? 'success' : 'error');
    } catch (err) {
      setMigrationStatus('error');
    }
  };

  const handleSaveUrl = () => {
    if (databaseUrl) {
      // Salvar no localStorage temporariamente (em produção seria salvo no .env)
      localStorage.setItem('DATABASE_URL', databaseUrl);
      alert('URL do banco salva! Reinicie a aplicação para aplicar as mudanças.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuração do Banco de Dados
          </h1>
          <p className="text-gray-600">
            Configure e gerencie a conexão com o Neon PostgreSQL
          </p>
        </div>

        {/* Status da Conexão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
              ) : isConnected ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {isLoading ? 'Verificando conexão...' : 
                 isConnected ? 'Conectado ao Neon Database' : 
                 'Não conectado'}
              </span>
              {isConnected && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              )}
            </div>
            {error && (
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Configuração da URL */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar URL do Banco</CardTitle>
            <CardDescription>
              Configure a connection string do seu banco Neon PostgreSQL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="database-url">Database URL</Label>
              <Input
                id="database-url"
                type="password"
                placeholder="postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
                value={databaseUrl}
                onChange={(e) => setDatabaseUrl(e.target.value)}
              />
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Instruções:</strong>
                <br />1. Acesse <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">neon.tech</a> e crie uma conta
                <br />2. Crie um novo projeto/database
                <br />3. Copie a connection string e cole acima
                <br />4. Configure a mesma variável no Netlify (Site Settings → Environment Variables)
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleSaveUrl} disabled={!databaseUrl}>
              Salvar URL
            </Button>
            <Button 
              variant="outline" 
              onClick={handleTestConnection}
              disabled={isLoading}
            >
              {isLoading ? 'Testando...' : 'Testar Conexão'}
            </Button>
          </CardFooter>
        </Card>

        {/* Dados Locais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Migração de Dados
            </CardTitle>
            <CardDescription>
              Migre seus dados do localStorage para o banco Neon
            </CardDescription>
          </CardHeader>
          <CardContent>
            {localStorageData && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {localStorageData.saloes}
                  </div>
                  <div className="text-sm text-gray-600">Salões</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {localStorageData.clientes}
                  </div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {localStorageData.agendamentos}
                  </div>
                  <div className="text-sm text-gray-600">Agendamentos</div>
                </div>
              </div>
            )}
            
            {migrationStatus === 'success' && (
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Migração concluída com sucesso! Os dados foram transferidos para o banco Neon.
                </AlertDescription>
              </Alert>
            )}
            
            {migrationStatus === 'error' && (
              <Alert className="mb-4">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Erro na migração. Verifique a conexão com o banco e tente novamente.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleMigration}
              disabled={!isConnected || migrationStatus === 'loading'}
              className="w-full"
            >
              {migrationStatus === 'loading' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Migrando dados...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Migrar Dados para Neon
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Instruções para Netlify */}
        <Card>
          <CardHeader>
            <CardTitle>Configuração no Netlify</CardTitle>
            <CardDescription>
              Configure as variáveis de ambiente para produção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Passos para configurar no Netlify:</strong>
                  <br />1. Acesse seu site no Netlify Dashboard
                  <br />2. Vá em Site Settings → Environment Variables
                  <br />3. Adicione a variável: <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code>
                  <br />4. Cole a mesma connection string do Neon
                  <br />5. Faça redeploy do site
                </AlertDescription>
              </Alert>
              
              <Textarea
                placeholder="DATABASE_URL=postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
                value={databaseUrl}
                readOnly
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
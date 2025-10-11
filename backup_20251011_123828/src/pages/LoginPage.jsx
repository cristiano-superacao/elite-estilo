import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Lock, Mail, Scissors, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    salaoNome: '',
    telefone: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Simulação de login
      if (formData.email && formData.password) {
        // Salvar dados do usuário no localStorage para simular autenticação
        localStorage.setItem('userLoggedIn', 'true')
        localStorage.setItem('userEmail', formData.email)
        
        // Redirecionar para dashboard do salão
        navigate('/dashboard-salao')
      } else {
        alert('Por favor, preencha todos os campos!')
      }
    } else {
      // Simulação de cadastro
      if (formData.email && formData.password && formData.salaoNome && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          alert('As senhas não coincidem!')
          return
        }
        
        // Salvar dados do usuário
        localStorage.setItem('userLoggedIn', 'true')
        localStorage.setItem('userEmail', formData.email)
        localStorage.setItem('salaoNome', formData.salaoNome)
        
        // Redirecionar para completar cadastro do salão
        navigate('/cadastro-salao')
      } else {
        alert('Por favor, preencha todos os campos!')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center p-4">
      {/* Botão Voltar */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 p-2"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-4">
            <Scissors className="w-8 h-8" />
            <span>Elite & Estilo</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin 
              ? 'Acesse sua conta e gerencie seu salão' 
              : 'Cadastre seu salão e comece a crescer'
            }
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          {/* Campo Nome do Salão (apenas no cadastro) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Salão
              </label>
              <div className="relative">
                <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="salaoNome"
                  value={formData.salaoNome}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nome do seu salão"
                  required
                />
              </div>
            </div>
          )}

          {/* Campo Telefone (apenas no cadastro) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone (WhatsApp)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(71) 99999-9999"
                />
              </div>
            </div>
          )}

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Campo Confirmar Senha (apenas no cadastro) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
            </div>
          )}

          {/* Botão Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full py-3 text-lg"
          >
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </Button>
        </form>

        {/* Alternar entre Login e Cadastro */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({
                email: '',
                password: '',
                salaoNome: '',
                telefone: '',
                confirmPassword: ''
              })
            }}
            className="text-primary font-semibold hover:underline mt-2"
          >
            {isLogin ? 'Cadastre seu salão' : 'Fazer login'}
          </button>
        </div>

        {/* Links Adicionais */}
        {isLogin && (
          <div className="mt-6 text-center">
            <button className="text-sm text-gray-500 hover:text-primary">
              Esqueceu sua senha?
            </button>
          </div>
        )}

        {/* Informações para clientes */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            <strong>Cliente?</strong> Use o botão "Agendar" nos salões para fazer seus agendamentos.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/agendamento')}
            className="mt-2"
          >
            Ir para Agendamentos
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
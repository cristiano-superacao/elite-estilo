import { useState, useEffect } from 'react'
import { Calendar, Users, Clock, Star, Plus, Eye, MessageCircle, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function DashboardSalaoPage() {
  const navigate = useNavigate()
  const [salaoNome, setSalaoNome] = useState('')
  
  // Verificar autenticação
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn')
    const storedSalaoNome = localStorage.getItem('salaoNome')
    
    if (!userLoggedIn) {
      navigate('/login')
      return
    }
    
    setSalaoNome(storedSalaoNome || 'Meu Salão')
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('salaoNome')
    navigate('/login')
  }

  const [filaEspera] = useState([
    { id: 1, cliente: "João Silva", servico: "Corte + Barba", profissional: "Carlos", horario: "14:30", status: "confirmado", rank: 1, telefone: "(71) 99999-1234" },
    { id: 2, cliente: "Maria Santos", servico: "Escova", profissional: "Ana", horario: "15:00", status: "confirmado", rank: 2, telefone: "(71) 99999-5678" },
    { id: 3, cliente: "Pedro Oliveira", servico: "Corte Masculino", profissional: "Carlos", horario: "15:30", status: "aguardando", rank: 3, telefone: "(71) 99999-9012" },
    { id: 4, cliente: "Ana Costa", servico: "Barba + Pigmentação", profissional: "Ricardo", horario: "16:00", status: "confirmado", rank: 4, telefone: "(71) 99999-3456" },
    { id: 5, cliente: "Roberto Lima", servico: "Corte Social", profissional: "Carlos", horario: "16:30", status: "aguardando", rank: 5, telefone: "(71) 99999-7890" }
  ])

  const [clientesRanking, setClientesRanking] = useState([
    { id: 1, nome: "João Silva", totalVisitas: 15, valorGasto: 850.00, ultimaVisita: "2025-10-10", servicos: ["Corte + Barba", "Barba"], status: "vip" },
    { id: 2, nome: "Maria Santos", totalVisitas: 12, valorGasto: 720.00, ultimaVisita: "2025-10-08", servicos: ["Escova", "Hidratação"], status: "regular" },
    { id: 3, nome: "Pedro Oliveira", totalVisitas: 8, valorGasto: 400.00, ultimaVisita: "2025-10-05", servicos: ["Corte Masculino"], status: "regular" },
    { id: 4, nome: "Ana Costa", totalVisitas: 20, valorGasto: 1200.00, ultimaVisita: "2025-10-09", servicos: ["Barba", "Pigmentação"], status: "vip" },
    { id: 5, nome: "Roberto Lima", totalVisitas: 5, valorGasto: 250.00, ultimaVisita: "2025-09-28", servicos: ["Corte Social"], status: "novo" }
  ])

  const [servicos] = useState([
    { id: 1, nome: "Corte Masculino", preco: 25, tempo: "30min", ativo: true },
    { id: 2, nome: "Barba", preco: 20, tempo: "20min", ativo: true },
    { id: 3, nome: "Corte + Barba", preco: 40, tempo: "45min", ativo: true }
  ])

  const [profissionais] = useState([
    { id: 1, nome: "Carlos Mendes", especialidade: "Cortes Masculinos", status: "disponivel", agendamentos: 8 },
    { id: 2, nome: "Ana Costa", especialidade: "Cortes Femininos", status: "ocupado", agendamentos: 12 }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{salaoNome}</h1>
              <p className="text-gray-600">Dashboard do Salão</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Hoje</p>
                <p className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/configuracao-salao')}
                className="flex items-center gap-2 mr-2"
              >
                <Settings className="w-4 h-4" />
                Configurar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fila de Espera</p>
                <p className="text-2xl font-semibold text-gray-900">{filaEspera.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Próximo</p>
                <p className="text-2xl font-semibold text-gray-900">14:30</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avaliação</p>
                <p className="text-2xl font-semibold text-gray-900">4.8</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fila de Espera */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Fila de Espera</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filaEspera.map((agendamento) => (
                  <div key={agendamento.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                        {agendamento.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{agendamento.cliente}</h3>
                        <p className="text-sm text-gray-600">{agendamento.servico}</p>
                        <p className="text-sm text-gray-500">Com {agendamento.profissional}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{agendamento.horario}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agendamento.status === 'confirmado' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {agendamento.status === 'confirmado' ? 'Confirmado' : 'Aguardando'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://wa.me/55${agendamento.telefone.replace(/\D/g, '')}?text=Olá ${agendamento.cliente}! Seu agendamento para ${agendamento.servico} está confirmado para ${agendamento.horario}.`, '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profissionais */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Profissionais</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {profissionais.map((profissional) => (
                  <div key={profissional.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">{profissional.nome}</h3>
                        <p className="text-sm text-gray-600">{profissional.especialidade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{profissional.agendamentos} agendamentos</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        profissional.status === 'disponivel' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {profissional.status === 'disponivel' ? 'Disponível' : 'Ocupado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ranking de Clientes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Top Clientes</h2>
                <Button size="sm" variant="outline">Ver Todos</Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {clientesRanking.slice(0, 4).map((cliente, index) => (
                  <div key={cliente.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{cliente.nome}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            cliente.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                            cliente.status === 'regular' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {cliente.status === 'vip' ? '⭐ VIP' : cliente.status === 'regular' ? '🔵 Regular' : '🆕 Novo'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{cliente.totalVisitas} visitas • R$ {cliente.valorGasto.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Última visita: {new Date(cliente.ultimaVisita).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-gray-500"
                        onClick={() => window.open(`https://wa.me/5571993372960?text=Olá ${cliente.nome}! Que tal agendar um novo horário? Temos promoções especiais para você! 😊`, '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Estatísticas rápidas */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Estatísticas Hoje</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Novos Clientes</p>
                    <p className="font-semibold text-lg">2</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Receita Estimada</p>
                    <p className="font-semibold text-lg text-green-600">R$ 380</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow"
        >
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Serviços Oferecidos</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicos.map((servico) => (
                <div key={servico.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{servico.nome}</h3>
                    <span className={`w-3 h-3 rounded-full ${servico.ativo ? 'bg-green-400' : 'bg-gray-300'}`} />
                  </div>
                  <p className="text-lg font-bold text-primary">R$ {servico.preco}</p>
                  <p className="text-sm text-gray-600">{servico.tempo}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardSalaoPage
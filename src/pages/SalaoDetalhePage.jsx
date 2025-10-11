import { useState } from 'react'
import { ArrowLeft, Star, MapPin, Phone, Clock, User, Scissors, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

// Mock data dos salões (mesmo do AgendamentoPage)
const saloesDisponiveis = [
  {
    id: 1,
    nome: "Barbearia Elegance",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(71) 3333-1111",
    avaliacao: 4.8,
    totalAvaliacoes: 156,
    imagem: "/src/assets/salon1.jpg",
    destaque: true,
    descricao: "Especializada em cortes masculinos clássicos e modernos",
    profissionais: [
      { id: 1, nome: "João Silva", especialidade: "Corte Masculino", preco: 25, avatar: "👨‍💼", status: "disponivel" },
      { id: 2, nome: "Pedro Santos", especialidade: "Barba", preco: 20, avatar: "👨‍🦲", status: "ocupado" }
    ],
    servicos: [
      { id: 1, nome: "Corte Masculino", preco: 25, tempo: "30min", popular: true },
      { id: 2, nome: "Barba", preco: 20, tempo: "20min", popular: false },
      { id: 3, nome: "Corte + Barba", preco: 40, tempo: "45min", popular: true }
    ],
    horarios: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00"],
    filaEspera: [
      { id: 1, cliente: "Carlos Silva", servico: "Corte + Barba", profissional: "João Silva", horario: "14:30", status: "confirmado" },
      { id: 2, cliente: "Roberto Lima", servico: "Corte Masculino", profissional: "João Silva", horario: "15:00", status: "aguardando" },
      { id: 3, cliente: "Fernando Costa", servico: "Barba", profissional: "Pedro Santos", horario: "15:30", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "08:00",
      fechamento: "18:00"
    }
  },
  {
    id: 2,
    nome: "Salão Beleza Pura",
    endereco: "Av. Liberdade, 456 - Pituba",
    telefone: "(71) 3333-2222",
    avaliacao: 4.9,
    totalAvaliacoes: 203,
    imagem: "/src/assets/salon2.jpg",
    destaque: true,
    descricao: "Cuidados completos para cabelos femininos e tratamentos",
    profissionais: [
      { id: 3, nome: "Ana Costa", especialidade: "Cabelo Feminino", preco: 45, avatar: "👩‍🦱", status: "disponivel" },
      { id: 4, nome: "Maria Silva", especialidade: "Manicure", preco: 25, avatar: "💅", status: "disponivel" }
    ],
    servicos: [
      { id: 4, nome: "Corte Feminino", preco: 45, tempo: "45min", popular: true },
      { id: 5, nome: "Escova", preco: 30, tempo: "30min", popular: true },
      { id: 6, nome: "Manicure", preco: 25, tempo: "40min", popular: false }
    ],
    horarios: ["08:00", "08:30", "09:00", "09:30", "10:00", "13:00", "13:30", "14:00"],
    filaEspera: [
      { id: 4, cliente: "Julia Santos", servico: "Corte Feminino", profissional: "Ana Costa", horario: "09:00", status: "confirmado" },
      { id: 5, cliente: "Mariana Lima", servico: "Escova", profissional: "Ana Costa", horario: "09:30", status: "confirmado" },
      { id: 6, cliente: "Patricia Costa", servico: "Manicure", profissional: "Maria Silva", horario: "10:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "08:00",
      fechamento: "18:00"
    }
  },
  {
    id: 3,
    nome: "Studio Hair Premium",
    endereco: "Rua dos Artistas, 789 - Barra",
    telefone: "(71) 3333-3333",
    avaliacao: 4.7,
    totalAvaliacoes: 98,
    imagem: "/src/assets/salon3.jpg",
    destaque: false,
    descricao: "Especialistas em coloração e tratamentos capilares premium",
    profissionais: [
      { id: 5, nome: "Carlos Mendes", especialidade: "Coloração", preco: 80, avatar: "🎨", status: "ocupado" },
      { id: 6, nome: "Lucia Reis", especialidade: "Tratamentos", preco: 60, avatar: "✨", status: "disponivel" }
    ],
    servicos: [
      { id: 7, nome: "Coloração", preco: 80, tempo: "90min", popular: true },
      { id: 8, nome: "Hidratação", preco: 40, tempo: "60min", popular: false },
      { id: 9, nome: "Penteado", preco: 50, tempo: "45min", popular: false }
    ],
    horarios: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
    filaEspera: [
      { id: 7, cliente: "Amanda Silva", servico: "Coloração", profissional: "Carlos Mendes", horario: "14:00", status: "confirmado" }
    ],
    horarioFuncionamento: {
      abertura: "09:00",
      fechamento: "18:00"
    }
  }
]

function SalaoDetalhePage() {
  const navigate = useNavigate()
  const { salaoId } = useParams()
  const [abaSelecionada, setAbaSelecionada] = useState('espera') // espera, servicos, profissionais

  const salao = saloesDisponiveis.find(s => s.id === parseInt(salaoId))

  if (!salao) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Salão não encontrado</h1>
          <Button onClick={() => navigate('/agendamento')}>
            Voltar para Agendamento
          </Button>
        </div>
      </div>
    )
  }

  const iniciarAgendamento = () => {
    navigate('/agendamento', { 
      state: { 
        salaoSelecionado: salao,
        etapaInicial: 'agendamento'
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/agendamento')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">{salao.nome}</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Informações do Salão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lado esquerdo - Informações */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{salao.nome}</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{salao.avaliacao}</span>
                    <span className="text-gray-500">({salao.totalAvaliacoes} avaliações)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{salao.descricao}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{salao.endereco}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{salao.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {salao.horarioFuncionamento.abertura} às {salao.horarioFuncionamento.fechamento}
                  </span>
                </div>
              </div>

              <Button 
                onClick={iniciarAgendamento}
                className="w-full py-3"
                size="lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Horário
              </Button>
            </div>

            {/* Lado direito - Estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{salao.profissionais.length}</div>
                <div className="text-sm text-blue-600">Profissionais</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{salao.servicos.length}</div>
                <div className="text-sm text-green-600">Serviços</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{salao.filaEspera.length}</div>
                <div className="text-sm text-yellow-600">Na Fila</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  R$ {Math.round(salao.servicos.reduce((acc, s) => acc + s.preco, 0) / salao.servicos.length)}
                </div>
                <div className="text-sm text-purple-600">Preço Médio</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Abas */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Navigation */}
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setAbaSelecionada('espera')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  abaSelecionada === 'espera'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🕐 Mural de Espera ({salao.filaEspera.length})
              </button>
              <button
                onClick={() => setAbaSelecionada('servicos')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  abaSelecionada === 'servicos'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ✂️ Mural de Serviços ({salao.servicos.length})
              </button>
              <button
                onClick={() => setAbaSelecionada('profissionais')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  abaSelecionada === 'profissionais'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👥 Profissionais ({salao.profissionais.length})
              </button>
            </nav>
          </div>

          {/* Conteúdo das Abas */}
          <div className="p-6">
            {abaSelecionada === 'espera' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Fila de Espera - {new Date().toLocaleDateString('pt-BR')}
                </h3>
                
                {salao.filaEspera.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum cliente na fila de espera no momento</p>
                    <p className="text-sm">Seja o primeiro a agendar!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {salao.filaEspera.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.cliente}</h4>
                            <p className="text-sm text-gray-600">{item.servico}</p>
                            <p className="text-xs text-gray-500">Com {item.profissional}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{item.horario}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'confirmado' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status === 'confirmado' ? '✅ Confirmado' : '⏳ Aguardando'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {abaSelecionada === 'servicos' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">Serviços Disponíveis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {salao.servicos.map((servico) => (
                    <div key={servico.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{servico.nome}</h4>
                        {servico.popular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            🔥 Popular
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">R$ {servico.preco}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {servico.tempo}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={iniciarAgendamento}
                      >
                        Agendar Este Serviço
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {abaSelecionada === 'profissionais' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold mb-4">Nossa Equipe</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {salao.profissionais.map((profissional) => (
                    <div key={profissional.id} className="border rounded-lg p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                          {profissional.avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{profissional.nome}</h4>
                          <p className="text-gray-600">{profissional.especialidade}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            profissional.status === 'disponivel' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {profissional.status === 'disponivel' ? '🟢 Disponível' : '🔴 Ocupado'}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">A partir de</span>
                        <span className="text-lg font-bold text-primary">R$ {profissional.preco}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={iniciarAgendamento}
                        disabled={profissional.status === 'ocupado'}
                      >
                        {profissional.status === 'disponivel' ? 'Agendar com Este Profissional' : 'Indisponível'}
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Botão de Contato Fixo */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg"
            onClick={() => {
              const message = encodeURIComponent(`Olá! Gostaria de falar sobre o ${salao.nome}`);
              window.open(`https://wa.me/5571993372960?text=${message}`, '_blank');
            }}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SalaoDetalhePage
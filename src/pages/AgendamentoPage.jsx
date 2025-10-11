import { useState, useEffect } from 'react'
import { ArrowLeft, Clock, User, Scissors, MapPin, Calendar, ChevronRight, ChevronLeft, Star, Phone, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data dos salões cadastrados com mais informações
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
      { id: 1, nome: "João Silva", especialidade: "Corte Masculino", preco: 25, avatar: "👨‍💼" },
      { id: 2, nome: "Pedro Santos", especialidade: "Barba", preco: 20, avatar: "👨‍🦲" }
    ],
    servicos: [
      { id: 1, nome: "Corte Masculino", preco: 25, tempo: "30min", popular: true },
      { id: 2, nome: "Barba", preco: 20, tempo: "20min", popular: false },
      { id: 3, nome: "Corte + Barba", preco: 40, tempo: "45min", popular: true }
    ],
    horarios: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00"],
    filaEspera: [
      { cliente: "Carlos Silva", servico: "Corte + Barba", horario: "14:30" },
      { cliente: "Roberto Lima", servico: "Corte Masculino", horario: "15:00" }
    ]
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
      { id: 3, nome: "Ana Costa", especialidade: "Cabelo Feminino", preco: 45, avatar: "👩‍🦱" },
      { id: 4, nome: "Maria Silva", especialidade: "Manicure", preco: 25, avatar: "💅" }
    ],
    servicos: [
      { id: 4, nome: "Corte Feminino", preco: 45, tempo: "45min", popular: true },
      { id: 5, nome: "Escova", preco: 30, tempo: "30min", popular: true },
      { id: 6, nome: "Manicure", preco: 25, tempo: "40min", popular: false }
    ],
    horarios: ["08:00", "08:30", "09:00", "09:30", "10:00", "13:00", "13:30", "14:00"],
    filaEspera: [
      { cliente: "Julia Santos", servico: "Corte Feminino", horario: "09:00" },
      { cliente: "Mariana Lima", servico: "Escova", horario: "09:30" },
      { cliente: "Patricia Costa", servico: "Manicure", horario: "10:00" }
    ]
  },
  {
    id: 3,
    nome: "Studio Cabelo Premium",
    endereco: "Rua dos Artistas, 789 - Barra",
    telefone: "(71) 3333-3333",
    avaliacao: 4.7,
    totalAvaliacoes: 98,
    imagem: "/src/assets/salon3.jpg",
    destaque: false,
    descricao: "Especialistas em coloração e tratamentos capilares premium",
    profissionais: [
      { id: 5, nome: "Carlos Mendes", especialidade: "Coloração", preco: 80, avatar: "🎨" },
      { id: 6, nome: "Lucia Reis", especialidade: "Tratamentos", preco: 60, avatar: "✨" }
    ],
    servicos: [
      { id: 7, nome: "Coloração", preco: 80, tempo: "90min", popular: true },
      { id: 8, nome: "Hidratação", preco: 40, tempo: "60min", popular: false },
      { id: 9, nome: "Penteado", preco: 50, tempo: "45min", popular: false }
    ],
    horarios: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
    filaEspera: [
      { cliente: "Amanda Silva", servico: "Coloração", horario: "14:00" }
    ]
  },
  // Mais salões para preencher a grade
  {
    id: 4,
    nome: "Corte & Arte",
    endereco: "Rua da Harmonia, 321 - Ondina",
    telefone: "(71) 3333-4444",
    avaliacao: 4.6,
    totalAvaliacoes: 87,
    imagem: "/src/assets/salon1.jpg",
    destaque: false,
    descricao: "Arte em cada corte, estilo em cada cliente",
    profissionais: [
      { id: 7, nome: "Ricardo Alves", especialidade: "Cortes Modernos", preco: 35, avatar: "✂️" }
    ],
    servicos: [
      { id: 10, nome: "Corte Moderno", preco: 35, tempo: "40min", popular: true }
    ],
    horarios: ["08:30", "09:00", "09:30", "14:00", "14:30", "15:00"],
    filaEspera: []
  },
  {
    id: 5,
    nome: "Beleza & Cia",
    endereco: "Av. Oceânica, 555 - Barra",
    telefone: "(71) 3333-5555",
    avaliacao: 4.5,
    totalAvaliacoes: 134,
    imagem: "/src/assets/salon2.jpg",
    destaque: false,
    descricao: "Seu momento de beleza e bem-estar",
    profissionais: [
      { id: 8, nome: "Fernanda Costa", especialidade: "Estética", preco: 50, avatar: "💆‍♀️" }
    ],
    servicos: [
      { id: 11, nome: "Limpeza de Pele", preco: 60, tempo: "60min", popular: true }
    ],
    horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    filaEspera: []
  },
  {
    id: 6,
    nome: "Estilo Urbano",
    endereco: "Rua do Comércio, 789 - Pelourinho",
    telefone: "(71) 3333-6666",
    avaliacao: 4.4,
    totalAvaliacoes: 76,
    imagem: "/src/assets/salon3.jpg",
    destaque: false,
    descricao: "Tendências urbanas e cortes descolados",
    profissionais: [
      { id: 9, nome: "Bruno Silva", especialidade: "Cortes Urbanos", preco: 30, avatar: "🕶️" }
    ],
    servicos: [
      { id: 12, nome: "Corte Urbano", preco: 30, tempo: "35min", popular: true }
    ],
    horarios: ["08:00", "08:30", "09:00", "13:30", "14:00", "14:30"],
    filaEspera: []
  }
]

function AgendamentoPage() {
  const navigate = useNavigate()
  const [etapaAtual, setEtapaAtual] = useState('inicio') // inicio, agendamento, profissional, servico, horario, confirmacao
  const [currentSlide, setCurrentSlide] = useState(0)
  const [agendamento, setAgendamento] = useState({
    salao: null,
    profissional: null,
    servico: null,
    horario: null,
    data: new Date().toISOString().split('T')[0]
  })

  // Carrossel automático
  useEffect(() => {
    const saloesDestaque = saloesDisponiveis.filter(salao => salao.destaque)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % saloesDestaque.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const saloesDestaque = saloesDisponiveis.filter(salao => salao.destaque)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % saloesDestaque.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + saloesDestaque.length) % saloesDestaque.length)
  }

  const proximaEtapa = () => {
    const etapas = ['inicio', 'agendamento', 'profissional', 'servico', 'horario', 'confirmacao']
    const indiceAtual = etapas.indexOf(etapaAtual)
    if (indiceAtual < etapas.length - 1) {
      setEtapaAtual(etapas[indiceAtual + 1])
    }
  }

  const voltarEtapa = () => {
    const etapas = ['inicio', 'agendamento', 'profissional', 'servico', 'horario', 'confirmacao']
    const indiceAtual = etapas.indexOf(etapaAtual)
    if (indiceAtual > 0) {
      setEtapaAtual(etapas[indiceAtual - 1])
    } else {
      navigate('/')
    }
  }

  const finalizarAgendamento = () => {
    const { salao, profissional, servico, horario, data } = agendamento
    const message = encodeURIComponent(
      `🗓️ *AGENDAMENTO - Elite & Estilo*\n\n` +
      `📍 *Salão:* ${salao.nome}\n` +
      `👤 *Profissional:* ${profissional.nome}\n` +
      `✂️ *Serviço:* ${servico.nome}\n` +
      `💰 *Valor:* R$ ${servico.preco}\n` +
      `📅 *Data:* ${new Date(data).toLocaleDateString('pt-BR')}\n` +
      `⏰ *Horário:* ${horario}\n` +
      `⏱️ *Duração:* ${servico.tempo}\n\n` +
      `Confirma o agendamento?`
    )
    window.open(`https://wa.me/5571993372960?text=${message}`, '_blank')
  }

  const renderPaginaInicial = () => (
    <div className="space-y-8">
      {/* Carrossel de Salões em Destaque */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative h-full bg-gradient-to-r from-primary to-primary/80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative h-full flex items-center justify-center text-white p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {saloesDestaque[currentSlide]?.nome}
                  </h2>
                  <p className="text-xl mb-2 opacity-90">
                    {saloesDestaque[currentSlide]?.descricao}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{saloesDestaque[currentSlide]?.avaliacao}</span>
                    <span className="opacity-80">({saloesDestaque[currentSlide]?.totalAvaliacoes} avaliações)</span>
                  </div>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => {
                      setAgendamento(prev => ({ ...prev, salao: saloesDestaque[currentSlide] }))
                      setEtapaAtual('agendamento')
                    }}
                  >
                    Agendar Agora
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles do Carrossel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {saloesDestaque.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grade de Salões */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Todos os Salões Cadastrados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saloesDisponiveis.map((salao) => (
            <motion.div
              key={salao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Imagem do Salão */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center relative">
                {salao.destaque && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Destaque
                  </div>
                )}
                <Scissors className="w-16 h-16 text-primary" />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{salao.nome}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{salao.avaliacao}</span>
                  <span className="text-xs text-gray-500">({salao.totalAvaliacoes})</span>
                </div>

                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {salao.endereco}
                </p>

                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {salao.telefone}
                </p>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {salao.descricao}
                </p>

                {/* Informações rápidas */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Profissionais:</span>
                    <span className="font-semibold">{salao.profissionais.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Fila de espera:</span>
                    <span className="font-semibold text-primary">{salao.filaEspera.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Preço médio:</span>
                    <span className="font-semibold">R$ {Math.round(salao.servicos.reduce((acc, s) => acc + s.preco, 0) / salao.servicos.length)}</span>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/salao/${salao.id}`)
                    }}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setAgendamento(prev => ({ ...prev, salao }))
                      setEtapaAtual('agendamento')
                    }}
                    className="flex items-center gap-1"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEtapaAgendamento = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Agendamento - {agendamento.salao?.nome}</h2>
        <p className="text-gray-600">{agendamento.salao?.endereco}</p>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Informações do Salão</h3>
        <div className="text-sm space-y-1">
          <p><strong>Telefone:</strong> {agendamento.salao?.telefone}</p>
          <p><strong>Avaliação:</strong> ⭐ {agendamento.salao?.avaliacao} ({agendamento.salao?.totalAvaliacoes} avaliações)</p>
          <p><strong>Fila atual:</strong> {agendamento.salao?.filaEspera.length} pessoas aguardando</p>
        </div>
      </div>

      <Button 
        onClick={proximaEtapa}
        className="w-full py-6 text-lg"
        size="lg"
      >
        Escolher Profissional
      </Button>
    </div>
  )

  const renderEtapaProfissional = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Escolha o Profissional</h2>
      <div className="grid gap-4">
        {agendamento.salao?.profissionais.map((profissional) => (
          <motion.div
            key={profissional.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => {
              setAgendamento(prev => ({ ...prev, profissional }))
              proximaEtapa()
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{profissional.nome}</h3>
                <p className="text-sm text-muted-foreground">{profissional.especialidade}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderEtapaServico = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Escolha o Serviço</h2>
      <div className="grid gap-4">
        {agendamento.salao?.servicos.map((servico) => (
          <motion.div
            key={servico.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => {
              setAgendamento(prev => ({ ...prev, servico }))
              proximaEtapa()
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{servico.nome}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {servico.tempo}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">R$ {servico.preco}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderEtapaHorario = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Escolha Data e Horário</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Data</label>
          <input
            type="date"
            value={agendamento.data}
            onChange={(e) => setAgendamento(prev => ({ ...prev, data: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Horários Disponíveis</label>
          <div className="grid grid-cols-3 gap-3">
            {agendamento.salao?.horarios.map((horario) => (
              <button
                key={horario}
                onClick={() => {
                  setAgendamento(prev => ({ ...prev, horario }))
                  proximaEtapa()
                }}
                className="p-3 border rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                {horario}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderConfirmacao = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Confirmar Agendamento</h2>
      
      <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Salão:</span>
          <span>{agendamento.salao?.nome}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Profissional:</span>
          <span>{agendamento.profissional?.nome}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Serviço:</span>
          <span>{agendamento.servico?.nome}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Data:</span>
          <span>{new Date(agendamento.data).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Horário:</span>
          <span>{agendamento.horario}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Duração:</span>
          <span>{agendamento.servico?.tempo}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">R$ {agendamento.servico?.preco}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={finalizarAgendamento}
        className="w-full py-6 text-lg"
        size="lg"
      >
        Confirmar pelo WhatsApp
      </Button>
    </div>
  )

  const renderEtapaAtual = () => {
    switch (etapaAtual) {
      case 'inicio': return renderPaginaInicial()
      case 'agendamento': return renderEtapaAgendamento()
      case 'profissional': return renderEtapaProfissional()
      case 'servico': return renderEtapaServico()
      case 'horario': return renderEtapaHorario()
      case 'confirmacao': return renderConfirmacao()
      default: return renderPaginaInicial()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={voltarEtapa}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Agendamento</h1>
        </div>
      </header>

      {/* Progress Bar */}
      {etapaAtual !== 'inicio' && (
        <div className="bg-white border-b">
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Salão</span>
              <span>Profissional</span>
              <span>Serviço</span>
              <span>Horário</span>
              <span>Confirmar</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: etapaAtual === 'agendamento' ? '20%' : 
                         etapaAtual === 'profissional' ? '40%' :
                         etapaAtual === 'servico' ? '60%' :
                         etapaAtual === 'horario' ? '80%' : '100%'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4">
        {renderEtapaAtual()}
      </main>
    </div>
  )
}

export default AgendamentoPage
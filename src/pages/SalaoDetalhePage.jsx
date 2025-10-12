import { useState } from 'react'
import { ArrowLeft, Star, MapPin, Phone, Clock, User, Scissors, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

// Mock data dos salões (integrado com as informações detalhadas da HomePage)
const saloesDisponiveis = [
  {
    id: 1,
    nome: "Barbearia Elegance",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 98765-4321",
    avaliacao: 4.8,
    totalAvaliacoes: 127,
    imagem: "/src/assets/salon1.jpg",
    destaque: true,
    descricao: "Barbearia tradicional com mais de 15 anos de experiência. Especializada em cortes clássicos e modernos para o público masculino.",
    instagram: "@barbeariaelegance",
    priceRange: "R$ 25 - R$ 80",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 1, nome: "Carlos Silva - Barbeiro Master", especialidade: "Corte Masculino", preco: 35, avatar: "👨‍💼", status: "disponivel" },
      { id: 2, nome: "João Santos - Especialista em Barba", especialidade: "Barba", preco: 25, avatar: "👨‍🦲", status: "ocupado" }
    ],
    servicos: [
      { id: 1, nome: "Corte Social", preco: 35, tempo: "30min", popular: true, emoji: "✂️" },
      { id: 2, nome: "Barba Completa", preco: 25, tempo: "20min", popular: true, emoji: "🧔" },
      { id: 3, nome: "Pigmentação", preco: 80, tempo: "60min", popular: false, emoji: "🖌️" }
    ],
    especialidades: ["Corte Social", "Barba Completa", "Pigmentação"],
    horarios: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00"],
    filaEspera: [
      { id: 1, cliente: "Carlos Silva", servico: "Corte + Barba", profissional: "Carlos Silva", horario: "14:30", status: "confirmado" },
      { id: 2, cliente: "Roberto Lima", servico: "Corte Social", profissional: "Carlos Silva", horario: "15:00", status: "em-atendimento" },
      { id: 3, cliente: "Fernando Costa", servico: "Barba Completa", profissional: "João Santos", horario: "15:30", status: "aguardando" },
      { id: 4, cliente: "Miguel Santos", servico: "Pigmentação", profissional: "Pedro Oliveira", horario: "16:00", status: "confirmado" },
      { id: 5, cliente: "André Ribeiro", servico: "Corte + Barba", profissional: "Carlos Silva", horario: "16:30", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "09:00",
      fechamento: "20:00"
    }
  },
  {
    id: 2,
    nome: "Salão Beleza Pura",
    endereco: "Av. Paulista, 456 - Bela Vista",
    telefone: "(11) 97654-3210",
    avaliacao: 4.9,
    totalAvaliacoes: 203,
    imagem: "/src/assets/salon2.jpg",
    destaque: true,
    descricao: "Salão feminino completo com atendimento personalizado. Ambiente aconchegante e profissionais altamente qualificados.",
    instagram: "@salaobelezapura",
    priceRange: "R$ 30 - R$ 150",
    parking: false,
    accessibility: true,
    profissionais: [
      { id: 3, nome: "Ana Costa - Cabeleireira", especialidade: "Corte & Escova", preco: 45, avatar: "👩‍🦱", status: "disponivel" },
      { id: 4, nome: "Maria Silva - Designer de Unhas", especialidade: "Manicure Francesa", preco: 30, avatar: "💅", status: "disponivel" },
      { id: 5, nome: "Lucia Santos - Colorista", especialidade: "Tratamentos Capilares", preco: 80, avatar: "✨", status: "ocupado" }
    ],
    servicos: [
      { id: 4, nome: "Corte & Escova", preco: 45, tempo: "45min", popular: true, emoji: "✂️" },
      { id: 5, nome: "Manicure Francesa", preco: 30, tempo: "30min", popular: true, emoji: "💅" },
      { id: 6, nome: "Tratamentos Capilares", preco: 80, tempo: "60min", popular: false, emoji: "✨" }
    ],
    especialidades: ["Corte & Escova", "Manicure Francesa", "Tratamentos Capilares"],
    horarios: ["08:00", "08:30", "09:00", "09:30", "10:00", "13:00", "13:30", "14:00"],
    filaEspera: [
      { id: 4, cliente: "Julia Santos", servico: "Corte & Escova", profissional: "Ana Costa", horario: "09:00", status: "confirmado" },
      { id: 5, cliente: "Mariana Lima", servico: "Manicure Francesa", profissional: "Maria Silva", horario: "09:30", status: "confirmado" },
      { id: 6, cliente: "Patricia Costa", servico: "Tratamentos Capilares", profissional: "Lucia Santos", horario: "10:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "08:00",
      fechamento: "19:00"
    }
  },
  {
    id: 3,
    nome: "Studio Cabelo Premium",
    endereco: "Rua Augusta, 789 - Jardins",
    telefone: "(11) 96543-2109",
    avaliacao: 4.7,
    totalAvaliacoes: 89,
    imagem: "/src/assets/salon3.jpg",
    destaque: false,
    descricao: "Studio moderno focado em transformações capilares. Utilizamos produtos premium e técnicas avançadas.",
    instagram: "@studiocabelopremium",
    priceRange: "R$ 80 - R$ 300",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 6, nome: "Roberto Lima - Colorista Especialista", especialidade: "Coloração Artística", preco: 150, avatar: "🎨", status: "ocupado" },
      { id: 7, nome: "Fernanda Costa - Designer Capilar", especialidade: "Cortes Autorais", preco: 100, avatar: "✂️", status: "disponivel" }
    ],
    servicos: [
      { id: 7, nome: "Coloração Artística", preco: 150, tempo: "90min", popular: true, emoji: "🎨" },
      { id: 8, nome: "Cortes Autorais", preco: 100, tempo: "60min", popular: true, emoji: "✂️" },
      { id: 9, nome: "Reconstrução Capilar", preco: 200, tempo: "120min", popular: false, emoji: "✨" }
    ],
    especialidades: ["Coloração Artística", "Cortes Autorais", "Reconstrução Capilar"],
    horarios: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
    filaEspera: [
      { id: 7, cliente: "Amanda Silva", servico: "Coloração Artística", profissional: "Roberto Lima", horario: "14:00", status: "confirmado" },
      { id: 8, cliente: "Beatriz Santos", servico: "Cortes Autorais", profissional: "Fernanda Costa", horario: "15:30", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "09:00",
      fechamento: "20:00"
    }
  },
  {
    id: 4,
    nome: "Barbearia Clássica",
    endereco: "Rua do Comércio, 321 - Liberdade",
    telefone: "(11) 95432-1098",
    avaliacao: 4.6,
    totalAvaliacoes: 156,
    imagem: "/src/assets/salon1.jpg",
    destaque: false,
    descricao: "Barbearia clássica que preserva as tradições antigas. Ambiente nostálgico com serviços tradicionais.",
    instagram: "@barbeariaclassica",
    priceRange: "R$ 20 - R$ 60",
    parking: false,
    accessibility: false,
    profissionais: [
      { id: 8, nome: "Seu Antônio - Barbeiro Tradicional", especialidade: "Corte Navalhado", preco: 30, avatar: "👨‍🦳", status: "disponivel" },
      { id: 9, nome: "Pedro Oliveira - Especialista", especialidade: "Barba Tradicional", preco: 25, avatar: "🧔‍♂️", status: "disponivel" }
    ],
    servicos: [
      { id: 10, nome: "Corte Navalhado", preco: 30, tempo: "40min", popular: true, emoji: "🪒" },
      { id: 11, nome: "Barba Tradicional", preco: 25, tempo: "25min", popular: true, emoji: "🧔" },
      { id: 12, nome: "Relaxamento", preco: 60, tempo: "45min", popular: false, emoji: "💆‍♂️" }
    ],
    especialidades: ["Corte Navalhado", "Barba Tradicional", "Relaxamento"],
    horarios: ["08:00", "08:30", "09:00", "09:30", "10:00", "14:00", "14:30", "15:00"],
    filaEspera: [
      { id: 9, cliente: "Antônio Silva", servico: "Corte Navalhado", profissional: "Seu Antônio", horario: "09:00", status: "confirmado" },
      { id: 10, cliente: "José Santos", servico: "Barba Tradicional", profissional: "Pedro Oliveira", horario: "09:30", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "08:00",
      fechamento: "18:00"
    }
  },
  {
    id: 5,
    nome: "Salão Glamour",
    endereco: "Av. Brasil, 654 - Vila Madalena",
    telefone: "(11) 94321-0987",
    avaliacao: 4.8,
    totalAvaliacoes: 312,
    imagem: "/src/assets/salon2.jpg",
    destaque: true,
    descricao: "Salão moderno e descontraído na Vila Madalena. Especializado em looks ousados e tendências da moda.",
    instagram: "@salaoglamour",
    priceRange: "R$ 40 - R$ 200",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 10, nome: "Carla Mendes - Cabeleireira", especialidade: "Luzes Balayage", preco: 80, avatar: "💁‍♀️", status: "disponivel" },
      { id: 11, nome: "Julia Santos - Penteadista", especialidade: "Penteados para Festas", preco: 60, avatar: "👸", status: "disponivel" },
      { id: 12, nome: "Amanda Lima - Colorista", especialidade: "Cortes Modernos", preco: 70, avatar: "🎨", status: "ocupado" }
    ],
    servicos: [
      { id: 13, nome: "Luzes Balayage", preco: 80, tempo: "90min", popular: true, emoji: "✨" },
      { id: 14, nome: "Cortes Modernos", preco: 70, tempo: "50min", popular: true, emoji: "✂️" },
      { id: 15, nome: "Penteados para Festas", preco: 60, tempo: "60min", popular: false, emoji: "💄" }
    ],
    especialidades: ["Luzes Balayage", "Cortes Modernos", "Penteados para Festas"],
    horarios: ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00"],
    filaEspera: [
      { id: 11, cliente: "Mariana Costa", servico: "Luzes Balayage", profissional: "Carla Mendes", horario: "10:00", status: "confirmado" },
      { id: 12, cliente: "Beatriz Lima", servico: "Cortes Modernos", profissional: "Amanda Lima", horario: "11:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "09:00",
      fechamento: "19:00"
    }
  },
  {
    id: 6,
    nome: "Cabelo & Estilo",
    endereco: "Rua das Palmeiras, 987 - Moema",
    telefone: "(11) 93210-9876",
    avaliacao: 4.5,
    totalAvaliacoes: 78,
    imagem: "/src/assets/salon3.jpg",
    destaque: false,
    descricao: "Salão contemporâneo em Moema. Foco em técnicas modernas e atendimento personalizado.",
    instagram: "@cabeloestilomemo",
    priceRange: "R$ 50 - R$ 250",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 13, nome: "Marcos Reis - Cabeleireiro", especialidade: "Escova Progressiva", preco: 90, avatar: "👨‍🦱", status: "disponivel" },
      { id: 14, nome: "Patrícia Costa - Especialista em Alisamento", especialidade: "Mechas Californianas", preco: 120, avatar: "👩‍🦰", status: "ocupado" }
    ],
    servicos: [
      { id: 16, nome: "Escova Progressiva", preco: 90, tempo: "90min", popular: true, emoji: "💨" },
      { id: 17, nome: "Mechas Californianas", preco: 120, tempo: "120min", popular: true, emoji: "🌟" },
      { id: 18, nome: "Cortes Geométricos", preco: 80, tempo: "60min", popular: false, emoji: "📐" }
    ],
    especialidades: ["Escova Progressiva", "Mechas Californianas", "Cortes Geométricos"],
    horarios: ["10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"],
    filaEspera: [
      { id: 13, cliente: "Fernanda Silva", servico: "Escova Progressiva", profissional: "Marcos Reis", horario: "14:00", status: "confirmado" },
      { id: 14, cliente: "Carolina Santos", servico: "Mechas Californianas", profissional: "Patrícia Costa", horario: "15:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "10:00",
      fechamento: "20:00"
    }
  },
  {
    id: 7,
    nome: "Barbearia Moderna",
    endereco: "Rua da Consolação, 456 - Consolação",
    telefone: "(11) 92109-8765",
    avaliacao: 4.9,
    totalAvaliacoes: 267,
    imagem: "/src/assets/salon1.jpg",
    destaque: true,
    descricao: "Barbearia moderna com estilo urbano. Especializada em cortes contemporâneos e design de barba.",
    instagram: "@barbeariamoderna",
    priceRange: "R$ 35 - R$ 90",
    parking: false,
    accessibility: true,
    profissionais: [
      { id: 15, nome: "Diego Silva - Barbeiro Especialista", especialidade: "Fade Degradê", preco: 50, avatar: "👨‍🎤", status: "disponivel" },
      { id: 16, nome: "Rafael Santos - Especialista em Degradê", especialidade: "Barba Estilizada", preco: 40, avatar: "🕺", status: "disponivel" },
      { id: 17, nome: "Lucas Oliveira - Design", especialidade: "Design de Sobrancelha Masculina", preco: 35, avatar: "🎨", status: "ocupado" }
    ],
    servicos: [
      { id: 19, nome: "Fade Degradê", preco: 50, tempo: "45min", popular: true, emoji: "⚡" },
      { id: 20, nome: "Barba Estilizada", preco: 40, tempo: "30min", popular: true, emoji: "✨" },
      { id: 21, nome: "Design de Sobrancelha Masculina", preco: 35, tempo: "20min", popular: false, emoji: "👁️" }
    ],
    especialidades: ["Fade Degradê", "Barba Estilizada", "Design de Sobrancelha Masculina"],
    horarios: ["07:00", "07:30", "08:00", "08:30", "09:00", "13:00", "13:30", "14:00"],
    filaEspera: [
      { id: 15, cliente: "Gabriel Costa", servico: "Fade Degradê", profissional: "Diego Silva", horario: "08:00", status: "confirmado" },
      { id: 16, cliente: "Thiago Lima", servico: "Barba Estilizada", profissional: "Rafael Santos", horario: "08:30", status: "confirmado" },
      { id: 17, cliente: "Bruno Santos", servico: "Design de Sobrancelha", profissional: "Lucas Oliveira", horario: "09:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "07:00",
      fechamento: "19:00"
    }
  },
  {
    id: 8,
    nome: "Salão Encanto",
    endereco: "Av. Faria Lima, 123 - Itaim Bibi",
    telefone: "(11) 91098-7654",
    avaliacao: 4.7,
    totalAvaliacoes: 189,
    imagem: "/src/assets/salon2.jpg",
    destaque: false,
    descricao: "Salão sofisticado no coração empresarial de SP. Atendimento executive com agendamento prioritário.",
    instagram: "@salaoencanto",
    priceRange: "R$ 60 - R$ 350",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 18, nome: "Vanessa Lima - Colorista Master", especialidade: "Hidratação Profunda", preco: 120, avatar: "💆‍♀️", status: "disponivel" },
      { id: 19, nome: "Rodrigo Alves - Especialista Capilar", especialidade: "Progressiva Orgânica", preco: 150, avatar: "🧴", status: "ocupado" },
      { id: 20, nome: "Camila Santos - Tratamentos", especialidade: "Corte & Cor Premium", preco: 200, avatar: "✨", status: "disponivel" }
    ],
    servicos: [
      { id: 22, nome: "Hidratação Profunda", preco: 120, tempo: "90min", popular: true, emoji: "💧" },
      { id: 23, nome: "Progressiva Orgânica", preco: 150, tempo: "120min", popular: true, emoji: "🌿" },
      { id: 24, nome: "Corte & Cor Premium", preco: 200, tempo: "150min", popular: false, emoji: "💎" }
    ],
    especialidades: ["Hidratação Profunda", "Progressiva Orgânica", "Corte & Cor Premium"],
    horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    filaEspera: [
      { id: 18, cliente: "Isabela Costa", servico: "Hidratação Profunda", profissional: "Vanessa Lima", horario: "09:00", status: "confirmado" },
      { id: 19, cliente: "Renata Silva", servico: "Progressiva Orgânica", profissional: "Rodrigo Alves", horario: "10:00", status: "aguardando" },
      { id: 20, cliente: "Priscila Santos", servico: "Corte & Cor Premium", profissional: "Camila Santos", horario: "14:00", status: "confirmado" }
    ],
    horarioFuncionamento: {
      abertura: "08:00",
      fechamento: "20:00"
    }
  },
  {
    id: 9,
    nome: "Studio Excellence",
    endereco: "Rua Oscar Freire, 789 - Cerqueira César",
    telefone: "(11) 90987-6543",
    avaliacao: 4.8,
    totalAvaliacoes: 145,
    imagem: "/src/assets/salon3.jpg",
    destaque: true,
    descricao: "Studio de alta qualidade na Oscar Freire. Atendimento VIP com produtos importados e técnicas exclusivas.",
    instagram: "@studioexcellence",
    priceRange: "R$ 100 - R$ 500",
    parking: true,
    accessibility: true,
    profissionais: [
      { id: 21, nome: "Alessandro Martins - Diretor Criativo", especialidade: "Corte Executivo", preco: 250, avatar: "👑", status: "disponivel" },
      { id: 22, nome: "Bianca Ferreira - Especialista em Cor", especialidade: "Coloração com Olaplex", preco: 300, avatar: "🎨", status: "ocupado" },
      { id: 23, nome: "Thiago Costa - Cabeleireiro Master", especialidade: "Tratamento Botox Capilar", preco: 200, avatar: "💉", status: "disponivel" }
    ],
    servicos: [
      { id: 25, nome: "Corte Executivo", preco: 250, tempo: "60min", popular: true, emoji: "💼" },
      { id: 26, nome: "Coloração com Olaplex", preco: 300, tempo: "180min", popular: true, emoji: "🧪" },
      { id: 27, nome: "Tratamento Botox Capilar", preco: 200, tempo: "120min", popular: false, emoji: "💉" }
    ],
    especialidades: ["Corte Executivo", "Coloração com Olaplex", "Tratamento Botox Capilar"],
    horarios: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
    filaEspera: [
      { id: 21, cliente: "Adriana Costa", servico: "Corte Executivo", profissional: "Alessandro Martins", horario: "10:30", status: "confirmado" },
      { id: 22, cliente: "Daniela Silva", servico: "Coloração com Olaplex", profissional: "Bianca Ferreira", horario: "14:00", status: "aguardando" }
    ],
    horarioFuncionamento: {
      abertura: "09:00",
      fechamento: "21:00"
    }
  }
]

function SalaoDetalhePage() {
  const navigate = useNavigate()
  const { salaoId } = useParams()
  const [abaSelecionada, setAbaSelecionada] = useState('servicos') // servicos, espera, profissionais

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

  // Funções para gerenciar a fila de espera
  const iniciarAtendimento = (clienteId) => {
    // Atualizar status do cliente para "em-atendimento"
    const filaAtualizada = salao.filaEspera.map(item => 
      item.id === clienteId 
        ? { ...item, status: 'em-atendimento' }
        : item
    )
    
    // Aqui você pode implementar a persistência no banco de dados
    console.log('Iniciando atendimento para cliente:', clienteId)
    
    // Para simulação, vamos atualizar o estado local
    // Em um sistema real, isso seria uma chamada para a API
    salao.filaEspera = filaAtualizada
    
    // Forçar re-render
    setAbaSelecionada('espera')
  }

  const finalizarServico = (clienteId) => {
    // Marcar serviço como finalizado e mover cliente para o final da fila ou remover
    const filaAtualizada = salao.filaEspera.map(item => 
      item.id === clienteId 
        ? { ...item, status: 'finalizado' }
        : item
    )
    
    // Aqui você pode implementar a persistência no banco de dados
    console.log('Finalizando serviço para cliente:', clienteId)
    
    // Para simulação, vamos atualizar o estado local
    salao.filaEspera = filaAtualizada
    
    // Após 2 segundos, remover o cliente finalizado da fila
    setTimeout(() => {
      const filaSemFinalizado = salao.filaEspera.filter(item => item.id !== clienteId)
      salao.filaEspera = filaSemFinalizado
      setAbaSelecionada('espera') // Forçar re-render
    }, 2000)
    
    // Forçar re-render imediato
    setAbaSelecionada('espera')
  }

  // Função para verificar integração com banco de dados
  const verificarIntegracaoBD = () => {
    console.log('=== VERIFICAÇÃO DE INTEGRAÇÃO COM BANCO DE DADOS ===')
    console.log('1. Salões cadastrados no localStorage:', JSON.parse(localStorage.getItem('saloesCadastrados') || '[]'))
    console.log('2. Dados do salão atual:', salao)
    console.log('3. Fila de espera atual:', salao?.filaEspera)
    console.log('4. Status da conexão: Usando localStorage (simulação)')
    console.log('Para implementar BD real, substitua localStorage por chamadas de API')
    
    alert(`
    ✅ VERIFICAÇÃO CONCLUÍDA
    
    📊 Status da Integração:
    • Salões Cadastrados: ${JSON.parse(localStorage.getItem('saloesCadastrados') || '[]').length} salões
    • Sistema: Funcionando com localStorage
    • Fila de Espera: ${salao?.filaEspera?.length || 0} clientes
    
    🔧 Para implementar banco de dados real:
    1. Configurar backend (Node.js + Express + MongoDB/PostgreSQL)
    2. Substituir localStorage por chamadas de API
    3. Implementar autenticação de usuários
    4. Adicionar sincronização em tempo real
    `)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={verificarIntegracaoBD}
            className="text-xs"
          >
            🔍 Verificar BD
          </Button>
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
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{salao.priceRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{salao.instagram}</span>
                </div>
              </div>

              {/* Facilidades */}
              <div className="flex gap-4 mb-6">
                {salao.parking && (
                  <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    🅿️ Estacionamento
                  </div>
                )}
                {salao.accessibility && (
                  <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    ♿ Acessível
                  </div>
                )}
              </div>

              {/* Especialidades */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Especialidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {salao.especialidades.map((especialidade, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {especialidade}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={iniciarAgendamento}
                  className="flex-1 py-3"
                  size="lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Horário
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(`https://instagram.com/${salao.instagram.replace('@', '')}`, '_blank')}
                  className="px-4"
                >
                  📷
                </Button>
              </div>
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
                onClick={() => setAbaSelecionada('servicos')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  abaSelecionada === 'servicos'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ✂️ Serviços Oferecidos ({salao.servicos.length})
              </button>
              <button
                onClick={() => setAbaSelecionada('espera')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  abaSelecionada === 'espera'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🕐 Fila de Espera ({salao.filaEspera.length})
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
            {abaSelecionada === 'servicos' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Serviços Oferecidos</h3>
                  <Button 
                    onClick={() => alert('Funcionalidade de adicionar novo serviço em desenvolvimento')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    + Novo Serviço
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salao.servicos.map((servico) => (
                    <div key={servico.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {/* Imagem do Serviço */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-6xl">
                          {servico.emoji || '💼'}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{servico.nome}</h4>
                          {servico.popular && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              🔥 Popular
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">R$ {servico.preco}</span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {servico.tempo}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={iniciarAgendamento}
                          >
                            Agendar Este Serviço
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="px-3"
                            onClick={() => alert('Funcionalidade de editar serviço em desenvolvimento')}
                          >
                            ✏️
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {abaSelecionada === 'espera' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Fila de Espera - {new Date().toLocaleDateString('pt-BR')}
                  </h3>
                  {salao.filaEspera.length > 0 && (
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      Total: {salao.filaEspera.length} clientes | 
                      Aguardando: {salao.filaEspera.filter(item => item.status === 'aguardando').length} | 
                      Confirmados: {salao.filaEspera.filter(item => item.status === 'confirmado').length} | 
                      Em Atendimento: {salao.filaEspera.filter(item => item.status === 'em-atendimento').length}
                    </div>
                  )}
                </div>
                
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
                        <div className="text-right space-y-2">
                          <p className="font-semibold text-primary">{item.horario}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'confirmado' 
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'em-atendimento'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'finalizado'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status === 'confirmado' ? '✅ Confirmado' : 
                             item.status === 'em-atendimento' ? '🔄 Em Atendimento' :
                             item.status === 'finalizado' ? '✔️ Finalizado' :
                             '⏳ Aguardando'}
                          </span>
                          
                          {item.status === 'confirmado' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => iniciarAtendimento(item.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                              >
                                Iniciar Atendimento
                              </button>
                            </div>
                          )}
                          
                          {item.status === 'em-atendimento' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => finalizarServico(item.id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                              >
                                ✅ Finalizar Serviço
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {abaSelecionada === 'profissionais' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Nossa Equipe</h3>
                  <Button 
                    onClick={() => alert('Funcionalidade de adicionar novo profissional em desenvolvimento')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    + Adicionar
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {salao.profissionais.map((profissional) => (
                    <div key={profissional.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {/* Foto do Profissional */}
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-6xl">
                          {profissional.avatar}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
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
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500">A partir de</span>
                          <span className="text-lg font-bold text-primary">R$ {profissional.preco}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={iniciarAgendamento}
                            disabled={profissional.status === 'ocupado'}
                          >
                            {profissional.status === 'disponivel' ? 'Agendar com Este Profissional' : 'Indisponível'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="px-3"
                            onClick={() => alert('Funcionalidade de editar profissional em desenvolvimento')}
                          >
                            ✏️
                          </Button>
                        </div>
                      </div>
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
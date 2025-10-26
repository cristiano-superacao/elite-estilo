import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, Save, Eye, Settings, Users, Calendar, BarChart3, Camera, MapPin, Phone, Mail, Clock, Star, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function ConfiguracaoSalaoPage() {
  const navigate = useNavigate()
  const [abaSelecionada, setAbaSelecionada] = useState('geral') // geral, fotos, servicos, horarios, equipe
  const [salaoData, setSalaoData] = useState({
    nome: 'Meu Salão',
    endereco: '',
    telefone: '',
    email: '',
    descricao: '',
    instagram: '',
    facebook: '',
    horarioFuncionamento: {
      segunda: { abertura: '09:00', fechamento: '18:00', fechado: false },
      terca: { abertura: '09:00', fechamento: '18:00', fechado: false },
      quarta: { abertura: '09:00', fechamento: '18:00', fechado: false },
      quinta: { abertura: '09:00', fechamento: '18:00', fechado: false },
      sexta: { abertura: '09:00', fechamento: '18:00', fechado: false },
      sabado: { abertura: '09:00', fechamento: '16:00', fechado: false },
      domingo: { abertura: '09:00', fechamento: '16:00', fechado: true }
    }
  })

  const [fotos, setFotos] = useState([
    { id: 1, url: '/src/assets/salon1.jpg', titulo: 'Fachada', principal: true },
    { id: 2, url: '/src/assets/salon2.jpg', titulo: 'Interior', principal: false },
    { id: 3, url: '/src/assets/salon3.jpg', titulo: 'Área de Atendimento', principal: false }
  ])

  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Corte Masculino', preco: 30.00, tempo: '30min', ativo: true, descricao: 'Corte personalizado' },
    { id: 2, nome: 'Barba', preco: 25.00, tempo: '20min', ativo: true, descricao: 'Aparar e modelar barba' },
    { id: 3, nome: 'Corte + Barba', preco: 50.00, tempo: '45min', ativo: true, descricao: 'Combo completo' }
  ])

  const [equipe, setEquipe] = useState([
    { id: 1, nome: 'Carlos Silva', especialidade: 'Barbeiro Master', foto: null, ativo: true, horario: '09:00-18:00' },
    { id: 2, nome: 'Ana Santos', especialidade: 'Cabeleireira', foto: null, ativo: true, horario: '09:00-18:00' }
  ])

  // Verificar autenticação
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn')
    if (!userLoggedIn) {
      navigate('/login')
      return
    }
    
    // Carregar dados do salão se existirem
    const salaoNome = localStorage.getItem('salaoNome')
    const userEmail = localStorage.getItem('userEmail')
    
    if (salaoNome || userEmail) {
      setSalaoData(prev => ({
        ...prev,
        nome: salaoNome || prev.nome,
        email: userEmail || prev.email
      }))
    }
  }, [navigate])

  const salvarConfiguracoes = () => {
    // Salvar todas as configurações no localStorage
    const configCompleta = {
      salao: salaoData,
      fotos: fotos,
      servicos: servicos,
      equipe: equipe,
      ultimaAtualizacao: new Date().toISOString()
    }
    
    localStorage.setItem('configuracaoSalao', JSON.stringify(configCompleta))
    localStorage.setItem('salaoNome', salaoData.nome)
    
    alert('✅ Configurações salvas com sucesso!')
  }

  const adicionarFoto = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const novaFoto = {
          id: Date.now(),
          url: URL.createObjectURL(file),
          titulo: 'Nova Foto',
          principal: fotos.length === 0
        }
        setFotos([...fotos, novaFoto])
      }
    }
    input.click()
  }

  const renderGeralTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Informações Gerais</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nome do Salão *</label>
          <input
            type="text"
            value={salaoData.nome}
            onChange={(e) => setSalaoData(prev => ({ ...prev, nome: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Nome do seu salão"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
          <input
            type="tel"
            value={salaoData.telefone}
            onChange={(e) => setSalaoData(prev => ({ ...prev, telefone: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="(71) 99999-9999"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Endereço Completo *</label>
          <input
            type="text"
            value={salaoData.endereco}
            onChange={(e) => setSalaoData(prev => ({ ...prev, endereco: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">E-mail</label>
          <input
            type="email"
            value={salaoData.email}
            onChange={(e) => setSalaoData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="contato@salao.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Instagram</label>
          <input
            type="text"
            value={salaoData.instagram}
            onChange={(e) => setSalaoData(prev => ({ ...prev, instagram: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="@meusalao"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Descrição do Salão</label>
          <textarea
            value={salaoData.descricao}
            onChange={(e) => setSalaoData(prev => ({ ...prev, descricao: e.target.value }))}
            className="w-full p-3 border rounded-lg h-24"
            placeholder="Descreva seu salão, especialidades e diferenciais..."
          />
        </div>
      </div>
    </div>
  )

  const renderFotosTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Galeria de Fotos</h3>
        <Button onClick={adicionarFoto}>
          <Camera className="w-4 h-4 mr-2" />
          Adicionar Foto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fotos.map((foto) => (
          <div key={foto.id} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={foto.url}
                alt={foto.titulo}
                className="w-full h-full object-cover"
              />
              {foto.principal && (
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Principal
                </div>
              )}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={foto.titulo}
                onChange={(e) => {
                  setFotos(fotos.map(f => 
                    f.id === foto.id ? { ...f, titulo: e.target.value } : f
                  ))
                }}
                className="w-full p-2 border rounded text-sm"
                placeholder="Título da foto"
              />
            </div>
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant={foto.principal ? "default" : "outline"}
                onClick={() => {
                  setFotos(fotos.map(f => ({
                    ...f,
                    principal: f.id === foto.id
                  })))
                }}
              >
                Principal
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-500"
                onClick={() => {
                  setFotos(fotos.filter(f => f.id !== foto.id))
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderServicosTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Serviços e Preços</h3>
        <Button onClick={() => {
          const novoServico = {
            id: Date.now(),
            nome: '',
            preco: 0,
            tempo: '',
            ativo: true,
            descricao: ''
          }
          setServicos([...servicos, novoServico])
        }}>
          Adicionar Serviço
        </Button>
      </div>
      
      <div className="space-y-4">
        {servicos.map((servico) => (
          <div key={servico.id} className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Serviço</label>
                <input
                  type="text"
                  value={servico.nome}
                  onChange={(e) => {
                    setServicos(servicos.map(s => 
                      s.id === servico.id ? { ...s, nome: e.target.value } : s
                    ))
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Ex: Corte Masculino"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={servico.preco}
                  onChange={(e) => {
                    setServicos(servicos.map(s => 
                      s.id === servico.id ? { ...s, preco: parseFloat(e.target.value) || 0 } : s
                    ))
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="30.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tempo</label>
                <input
                  type="text"
                  value={servico.tempo}
                  onChange={(e) => {
                    setServicos(servicos.map(s => 
                      s.id === servico.id ? { ...s, tempo: e.target.value } : s
                    ))
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="30min"
                />
              </div>
              
              <div className="flex items-end gap-2">
                <Button
                  size="sm"
                  variant={servico.ativo ? "default" : "outline"}
                  onClick={() => {
                    setServicos(servicos.map(s => 
                      s.id === servico.id ? { ...s, ativo: !s.ativo } : s
                    ))
                  }}
                >
                  {servico.ativo ? 'Ativo' : 'Inativo'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => {
                    setServicos(servicos.filter(s => s.id !== servico.id))
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                value={servico.descricao}
                onChange={(e) => {
                  setServicos(servicos.map(s => 
                    s.id === servico.id ? { ...s, descricao: e.target.value } : s
                  ))
                }}
                className="w-full p-2 border rounded text-sm"
                placeholder="Descrição do serviço..."
                rows="2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHorariosTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Horários de Funcionamento</h3>
      
      <div className="space-y-4">
        {Object.entries(salaoData.horarioFuncionamento).map(([dia, horario]) => (
          <div key={dia} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-24">
              <span className="font-medium capitalize">{dia === 'terca' ? 'Terça' : dia === 'quarta' ? 'Quarta' : dia === 'quinta' ? 'Quinta' : dia === 'sexta' ? 'Sexta' : dia === 'sabado' ? 'Sábado' : dia}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!horario.fechado}
                onChange={(e) => {
                  setSalaoData(prev => ({
                    ...prev,
                    horarioFuncionamento: {
                      ...prev.horarioFuncionamento,
                      [dia]: { ...horario, fechado: !e.target.checked }
                    }
                  }))
                }}
                className="w-4 h-4"
              />
              <span className="text-sm">Aberto</span>
            </div>
            
            {!horario.fechado && (
              <>
                <input
                  type="time"
                  value={horario.abertura}
                  onChange={(e) => {
                    setSalaoData(prev => ({
                      ...prev,
                      horarioFuncionamento: {
                        ...prev.horarioFuncionamento,
                        [dia]: { ...horario, abertura: e.target.value }
                      }
                    }))
                  }}
                  className="p-2 border rounded"
                />
                <span>às</span>
                <input
                  type="time"
                  value={horario.fechamento}
                  onChange={(e) => {
                    setSalaoData(prev => ({
                      ...prev,
                      horarioFuncionamento: {
                        ...prev.horarioFuncionamento,
                        [dia]: { ...horario, fechamento: e.target.value }
                      }
                    }))
                  }}
                  className="p-2 border rounded"
                />
              </>
            )}
            
            {horario.fechado && (
              <span className="text-gray-500">Fechado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderEquipeTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Equipe de Profissionais</h3>
        <Button onClick={() => {
          const novoProfissional = {
            id: Date.now(),
            nome: '',
            especialidade: '',
            foto: null,
            ativo: true,
            horario: '09:00-18:00'
          }
          setEquipe([...equipe, novoProfissional])
        }}>
          Adicionar Profissional
        </Button>
      </div>
      
      <div className="space-y-4">
        {equipe.map((profissional) => (
          <div key={profissional.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {profissional.foto ? (
                  <img src={profissional.foto} alt={profissional.nome} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-8 h-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={profissional.nome}
                    onChange={(e) => {
                      setEquipe(equipe.map(p => 
                        p.id === profissional.id ? { ...p, nome: e.target.value } : p
                      ))
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="João Silva"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Especialidade</label>
                  <input
                    type="text"
                    value={profissional.especialidade}
                    onChange={(e) => {
                      setEquipe(equipe.map(p => 
                        p.id === profissional.id ? { ...p, especialidade: e.target.value } : p
                      ))
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Barbeiro Master"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Horário</label>
                  <input
                    type="text"
                    value={profissional.horario}
                    onChange={(e) => {
                      setEquipe(equipe.map(p => 
                        p.id === profissional.id ? { ...p, horario: e.target.value } : p
                      ))
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="09:00-18:00"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = (e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const fotoUrl = URL.createObjectURL(file)
                        setEquipe(equipe.map(p => 
                          p.id === profissional.id ? { ...p, foto: fotoUrl } : p
                        ))
                      }
                    }
                    input.click()
                  }}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant={profissional.ativo ? "default" : "outline"}
                  onClick={() => {
                    setEquipe(equipe.map(p => 
                      p.id === profissional.id ? { ...p, ativo: !p.ativo } : p
                    ))
                  }}
                >
                  {profissional.ativo ? 'Ativo' : 'Inativo'}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => {
                    setEquipe(equipe.filter(p => p.id !== profissional.id))
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'fotos', label: 'Fotos', icon: Camera },
    { id: 'servicos', label: 'Serviços', icon: BarChart3 },
    { id: 'horarios', label: 'Horários', icon: Clock },
    { id: 'equipe', label: 'Equipe', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard-salao')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Configurar Salão</h1>
                <p className="text-gray-600">{salaoData.nome}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button onClick={salvarConfiguracoes}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAbaSelecionada(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm ${
                      abaSelecionada === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {abaSelecionada === 'geral' && renderGeralTab()}
            {abaSelecionada === 'fotos' && renderFotosTab()}
            {abaSelecionada === 'servicos' && renderServicosTab()}
            {abaSelecionada === 'horarios' && renderHorariosTab()}
            {abaSelecionada === 'equipe' && renderEquipeTab()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracaoSalaoPage

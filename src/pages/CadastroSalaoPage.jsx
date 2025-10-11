import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, MapPin, Phone, Mail, Clock, Plus, X, User, Scissors, Star } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function CadastroSalaoPage() {
  const navigate = useNavigate()
  const [etapaAtual, setEtapaAtual] = useState('dados') // dados, servicos, profissionais, preview
  const [dadosSalao, setDadosSalao] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    horarioFuncionamento: {
      abertura: '',
      fechamento: ''
    },
    descricao: '',
    imagem: null
  })

  // Verificar se há dados de login armazenados
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const salaoNome = localStorage.getItem('salaoNome')
    
    if (userEmail) {
      setDadosSalao(prev => ({
        ...prev,
        email: userEmail,
        nome: salaoNome || ''
      }))
    }
  }, [])

  const [servicos, setServicos] = useState([
    { id: 1, nome: '', preco: '', tempo: '' }
  ])

  const [profissionais, setProfissionais] = useState([
    { id: 1, nome: '', especialidade: '', experiencia: '' }
  ])

  const proximaEtapa = () => {
    const etapas = ['dados', 'servicos', 'profissionais', 'preview']
    const indiceAtual = etapas.indexOf(etapaAtual)
    if (indiceAtual < etapas.length - 1) {
      setEtapaAtual(etapas[indiceAtual + 1])
    }
  }

  const voltarEtapa = () => {
    const etapas = ['dados', 'servicos', 'profissionais', 'preview']
    const indiceAtual = etapas.indexOf(etapaAtual)
    if (indiceAtual > 0) {
      setEtapaAtual(etapas[indiceAtual - 1])
    } else {
      navigate('/')
    }
  }

  const adicionarServico = () => {
    const novoId = Math.max(...servicos.map(s => s.id)) + 1
    setServicos([...servicos, { id: novoId, nome: '', preco: '', tempo: '' }])
  }

  const removerServico = (id) => {
    if (servicos.length > 1) {
      setServicos(servicos.filter(s => s.id !== id))
    }
  }

  const atualizarServico = (id, campo, valor) => {
    setServicos(servicos.map(s => 
      s.id === id ? { ...s, [campo]: valor } : s
    ))
  }

  const adicionarProfissional = () => {
    const novoId = Math.max(...profissionais.map(p => p.id)) + 1
    setProfissionais([...profissionais, { id: novoId, nome: '', especialidade: '', experiencia: '' }])
  }

  const removerProfissional = (id) => {
    if (profissionais.length > 1) {
      setProfissionais(profissionais.filter(p => p.id !== id))
    }
  }

  const atualizarProfissional = (id, campo, valor) => {
    setProfissionais(profissionais.map(p => 
      p.id === id ? { ...p, [campo]: valor } : p
    ))
  }

  const finalizarCadastro = () => {
    const dados = {
      salao: dadosSalao,
      servicos: servicos.filter(s => s.nome && s.preco),
      profissionais: profissionais.filter(p => p.nome && p.especialidade)
    }

    const message = encodeURIComponent(
      `🏪 *CADASTRO DE SALÃO - Elite & Estilo*\n\n` +
      `📋 *Dados do Salão:*\n` +
      `• Nome: ${dados.salao.nome}\n` +
      `• Endereço: ${dados.salao.endereco}\n` +
      `• Telefone: ${dados.salao.telefone}\n` +
      `• Email: ${dados.salao.email}\n` +
      `• Funcionamento: ${dados.salao.horarioFuncionamento.abertura} às ${dados.salao.horarioFuncionamento.fechamento}\n\n` +
      `✂️ *Serviços Oferecidos:*\n` +
      dados.servicos.map(s => `• ${s.nome} - R$ ${s.preco} (${s.tempo})`).join('\n') + '\n\n' +
      `👥 *Profissionais:*\n` +
      dados.profissionais.map(p => `• ${p.nome} - ${p.especialidade}`).join('\n') + '\n\n' +
      `Gostaria de finalizar o cadastro e receber as informações para configurar minha página no Elite & Estilo!`
    )

    window.open(`https://wa.me/5571993372960?text=${message}`, '_blank')
  }

  const renderDados = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Dados do Salão</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome do Salão *</label>
          <input
            type="text"
            value={dadosSalao.nome}
            onChange={(e) => setDadosSalao(prev => ({ ...prev, nome: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Ex: Barbearia Elite"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Endereço Completo *</label>
          <input
            type="text"
            value={dadosSalao.endereco}
            onChange={(e) => setDadosSalao(prev => ({ ...prev, endereco: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
            <input
              type="tel"
              value={dadosSalao.telefone}
              onChange={(e) => setDadosSalao(prev => ({ ...prev, telefone: e.target.value }))}
              className="w-full p-3 border rounded-lg"
              placeholder="(71) 99999-9999"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">E-mail</label>
            <input
              type="email"
              value={dadosSalao.email}
              onChange={(e) => setDadosSalao(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-3 border rounded-lg"
              placeholder="contato@salao.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Horário de Abertura</label>
            <input
              type="time"
              value={dadosSalao.horarioFuncionamento.abertura}
              onChange={(e) => setDadosSalao(prev => ({ 
                ...prev, 
                horarioFuncionamento: { ...prev.horarioFuncionamento, abertura: e.target.value }
              }))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Horário de Fechamento</label>
            <input
              type="time"
              value={dadosSalao.horarioFuncionamento.fechamento}
              onChange={(e) => setDadosSalao(prev => ({ 
                ...prev, 
                horarioFuncionamento: { ...prev.horarioFuncionamento, fechamento: e.target.value }
              }))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição do Salão</label>
          <textarea
            value={dadosSalao.descricao}
            onChange={(e) => setDadosSalao(prev => ({ ...prev, descricao: e.target.value }))}
            className="w-full p-3 border rounded-lg h-24"
            placeholder="Conte um pouco sobre seu salão, especialidades, diferenciais..."
          />
        </div>
      </div>

      <Button 
        onClick={proximaEtapa}
        className="w-full py-6 text-lg"
        size="lg"
        disabled={!dadosSalao.nome || !dadosSalao.endereco || !dadosSalao.telefone}
      >
        Próximo: Serviços
      </Button>
    </div>
  )

  const renderServicos = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Serviços Oferecidos</h2>
      
      <div className="space-y-4">
        {servicos.map((servico, index) => (
          <motion.div
            key={servico.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Serviço {index + 1}</h3>
              {servicos.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removerServico(servico.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Serviço</label>
                <input
                  type="text"
                  value={servico.nome}
                  onChange={(e) => atualizarServico(servico.id, 'nome', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ex: Corte Masculino"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preço (R$)</label>
                <input
                  type="number"
                  value={servico.preco}
                  onChange={(e) => atualizarServico(servico.id, 'preco', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="25.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tempo Estimado</label>
                <input
                  type="text"
                  value={servico.tempo}
                  onChange={(e) => atualizarServico(servico.id, 'tempo', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="30min"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={adicionarServico}
        className="w-full py-4 border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Mais Serviços
      </Button>

      <Button 
        onClick={proximaEtapa}
        className="w-full py-6 text-lg"
        size="lg"
        disabled={!servicos.some(s => s.nome && s.preco)}
      >
        Próximo: Profissionais
      </Button>
    </div>
  )

  const renderProfissionais = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Profissionais</h2>
      
      <div className="space-y-4">
        {profissionais.map((profissional, index) => (
          <motion.div
            key={profissional.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Profissional {index + 1}</h3>
              {profissionais.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removerProfissional(profissional.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={profissional.nome}
                  onChange={(e) => atualizarProfissional(profissional.id, 'nome', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="João Silva"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Especialidade</label>
                <input
                  type="text"
                  value={profissional.especialidade}
                  onChange={(e) => atualizarProfissional(profissional.id, 'especialidade', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Cortes Masculinos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Experiência</label>
                <input
                  type="text"
                  value={profissional.experiencia}
                  onChange={(e) => atualizarProfissional(profissional.id, 'experiencia', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="5 anos"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={adicionarProfissional}
        className="w-full py-4 border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Mais Profissionais
      </Button>

      <Button 
        onClick={proximaEtapa}
        className="w-full py-6 text-lg"
        size="lg"
        disabled={!profissionais.some(p => p.nome && p.especialidade)}
      >
        Revisar Cadastro
      </Button>
    </div>
  )

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Revisar Cadastro</h2>
      
      <div className="bg-secondary/30 rounded-lg p-6 space-y-6">
        {/* Dados do Salão */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Dados do Salão
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Nome:</strong> {dadosSalao.nome}</p>
            <p><strong>Endereço:</strong> {dadosSalao.endereco}</p>
            <p><strong>Telefone:</strong> {dadosSalao.telefone}</p>
            {dadosSalao.email && <p><strong>E-mail:</strong> {dadosSalao.email}</p>}
            <p><strong>Funcionamento:</strong> {dadosSalao.horarioFuncionamento.abertura} às {dadosSalao.horarioFuncionamento.fechamento}</p>
            {dadosSalao.descricao && <p><strong>Descrição:</strong> {dadosSalao.descricao}</p>}
          </div>
        </div>

        {/* Serviços */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Serviços ({servicos.filter(s => s.nome && s.preco).length})
          </h3>
          <div className="space-y-2">
            {servicos.filter(s => s.nome && s.preco).map((servico) => (
              <div key={servico.id} className="flex justify-between items-center text-sm border-b pb-2">
                <span>{servico.nome}</span>
                <span className="font-medium">R$ {servico.preco} ({servico.tempo})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profissionais */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profissionais ({profissionais.filter(p => p.nome && p.especialidade).length})
          </h3>
          <div className="space-y-2">
            {profissionais.filter(p => p.nome && p.especialidade).map((profissional) => (
              <div key={profissional.id} className="text-sm border-b pb-2">
                <p><strong>{profissional.nome}</strong></p>
                <p className="text-muted-foreground">{profissional.especialidade}</p>
                {profissional.experiencia && (
                  <p className="text-muted-foreground">{profissional.experiencia} de experiência</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Próximos passos:</strong> Após enviar o cadastro, nossa equipe entrará em contato para configurar sua página, definir planos e ativar seu salão na plataforma.
            </p>
          </div>
        </div>
      </div>

      <Button 
        onClick={finalizarCadastro}
        className="w-full py-6 text-lg"
        size="lg"
      >
        Finalizar Cadastro via WhatsApp
      </Button>
    </div>
  )

  const renderEtapaAtual = () => {
    switch (etapaAtual) {
      case 'dados': return renderDados()
      case 'servicos': return renderServicos()
      case 'profissionais': return renderProfissionais()
      case 'preview': return renderPreview()
      default: return renderDados()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={voltarEtapa}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Cadastrar Meu Salão</h1>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Dados</span>
            <span>Serviços</span>
            <span>Profissionais</span>
            <span>Revisar</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: etapaAtual === 'dados' ? '25%' : 
                       etapaAtual === 'servicos' ? '50%' :
                       etapaAtual === 'profissionais' ? '75%' : '100%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4">
        {renderEtapaAtual()}
      </main>
    </div>
  )
}

export default CadastroSalaoPage
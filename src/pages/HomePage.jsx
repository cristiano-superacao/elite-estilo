import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Tag, Calendar, ArrowRight, Sparkles, Users, Trophy, Shield, Zap, Search, X, Phone } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx'
import { motion, AnimatePresence } from 'framer-motion'
// import { salonsDatabase, searchSalons } from '../data/salons.js'
import { salon1, salon2, salon3 } from '../assets/images.js'

export default function HomePage() {
  // Utilitário para formatar mensagem do WhatsApp
  function getWhatsappUrl(salon, service, date, hour, clientName, clientPhone, clientEmail) {
    const msg = `🗓️ *NOVO AGENDAMENTO - Elite & Estilo*%0A%0A📋 *Detalhes do Agendamento:*%0A• Cliente: ${clientName || ''}%0A• Telefone: ${clientPhone || ''}%0A• Email: ${clientEmail || ''}%0A• Serviço: ${service}%0A• Data: ${date}%0A• Horário: ${hour}%0A%0A🏪 *Salão:* ${salon.name}%0A📍 *Endereço:* ${salon.address}`;
    return `https://wa.me/${salon.whatsapp}?text=${msg}`;
  }

  // Função de validação do formulário
  function validateForm() {
    const errors = {};
    
    if (!clientName.trim()) {
      errors.name = "Nome é obrigatório";
    }
    
    if (!clientPhone.trim()) {
      errors.phone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(clientPhone) && !/^\d{10,11}$/.test(clientPhone.replace(/\D/g, ''))) {
      errors.phone = "Telefone inválido";
    }
    
    if (!clientEmail.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errors.email = "Email inválido";
    }
    
    if (!selectedService) {
      errors.service = "Selecione um serviço";
    }
    
    if (!selectedDate) {
      errors.date = "Selecione uma data";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(selectedDate + 'T00:00:00');
      if (selected < today) {
        errors.date = "Não é possível agendar em datas passadas";
      }
    }
    
    if (!selectedHour) {
      errors.hour = "Selecione um horário";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Formatar telefone enquanto digita
  function formatPhone(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      if (cleaned.length <= 2) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
      if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
    return value;
  }

  const carouselImages = [
    {
      src: salon1,
      title: 'Transforme seu Visual',
      subtitle: 'Encontre os melhores salões e barbearias da sua região',
      cta: 'Explorar Salões'
    },
    {
      src: salon2,
      title: 'Profissionais Qualificados',
      subtitle: 'Agende seus serviços com facilidade e praticidade',
      cta: 'Agendar Agora'
    },
    {
      src: salon3,
      title: 'Experiência Única',
      subtitle: 'Atendimento de qualidade e ambiente acolhedor',
      cta: 'Conhecer Planos'
    }
  ];

  const [promotions, setPromotions] = useState([]);

const stats = [
  { icon: Users, value: '1,500+', label: 'Clientes Satisfeitos' },
  { icon: Trophy, value: '50+', label: 'Salões Parceiros' },
  { icon: Star, value: '4.9', label: 'Avaliação Média' },
  { icon: Shield, value: '100%', label: 'Segurança' }
]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [search, setSearch] = useState("");
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPromotions, setIsLoadingPromotions] = useState(true);
  const [submitError, setSubmitError] = useState("");

  // Atualiza lista ao pesquisar
  useEffect(() => {
    if (search.trim() === "") {
      fetch('/.netlify/functions/salons-function/salons')
        .then(res => res.json())
        .then(data => setFilteredSalons(data))
        .catch(() => setFilteredSalons([]));
    } else {
      fetch(`/.netlify/functions/salons-function/salons/search?q=${encodeURIComponent(search)}`)
        .then(res => res.json())
        .then(data => setFilteredSalons(data))
        .catch(() => setFilteredSalons([]));
    }
  }, [search]);

  // Carregar promoções
  useEffect(() => {
    fetch('/.netlify/functions/salons-function/promotions')
      .then(res => res.json())
      .then(data => {
        // Se não houver promoções no backend, usar dados estáticos
        if (data.length === 0) {
          setPromotions([
            {
              id: 1,
              salon_name: 'Barbearia Elegance',
              title: 'Combo Corte + Barba',
              discount: 25,
              original_price: 80,
              discounted_price: 60,
              description: 'Corte masculino moderno + modelagem de barba completa',
              valid_until: '2025-01-31',
              image: salon1,
              popular: true
            },
            {
              id: 2,
              salon_name: 'Salão Beleza Pura',
              title: 'Escova + Hidratação',
              discount: 25,
              original_price: 100,
              discounted_price: 75,
              description: 'Escova modeladora + tratamento hidratante profundo',
              valid_until: '2025-02-28',
              image: salon2,
              popular: false
            },
            {
              id: 3,
              salon_name: 'Studio Hair Premium',
              title: 'Pacote Completo',
              discount: 25,
              original_price: 120,
              discounted_price: 90,
              description: 'Corte + coloração + tratamento capilar especial',
              valid_until: '2025-02-15',
              image: salon3,
              popular: false
            }
          ]);
        } else {
          setPromotions(data);
        }
      })
      .catch(() => {
        // Em caso de erro, usar dados estáticos
        setPromotions([
          {
            id: 1,
            salon_name: 'Barbearia Elegance',
            title: 'Combo Corte + Barba',
            discount: 25,
            original_price: 80,
            discounted_price: 60,
            description: 'Corte masculino moderno + modelagem de barba completa',
            valid_until: '2025-01-31',
            image: salon1,
            popular: true
          },
          {
            id: 2,
            salon_name: 'Salão Beleza Pura',
            title: 'Escova + Hidratação',
            discount: 25,
            original_price: 100,
            discounted_price: 75,
            description: 'Escova modeladora + tratamento hidratante profundo',
            valid_until: '2025-02-28',
            image: salon2,
            popular: false
          },
          {
            id: 3,
            salon_name: 'Studio Hair Premium',
            title: 'Pacote Completo',
            discount: 25,
            original_price: 120,
            discounted_price: 90,
            description: 'Corte + coloração + tratamento capilar especial',
            valid_until: '2025-02-15',
            image: salon3,
            popular: false
          }
        ]);
      })
      .finally(() => {
        setIsLoadingPromotions(false);
      });
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[90vh] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentSlide].src}
              alt={carouselImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Experiência Premium</span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    {carouselImages[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed"
                  >
                    {carouselImages[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all group">
                      {carouselImages[currentSlide].cta}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm">
                      Saiba Mais
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Salões Cadastrados */}
      <section id="saloes" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Parceiros Premium</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Salões em Destaque
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Descubra os melhores profissionais da sua região com avaliações reais e serviços de qualidade
            </p>
            {/* Campo de pesquisa */}
            <div className="flex justify-center mb-4">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 text-lg"
                  placeholder="Pesquisar salões, serviços, cidade..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalons.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 text-lg py-12">Nenhum salão encontrado.</div>
            ) : (
              filteredSalons.map((salon, index) => (
                <motion.div
                  key={salon.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
                >
                  <div className="relative">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${salon.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {salon.badge}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {salon.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700">{salon.rating}</span>
                        <span className="text-xs text-slate-500">({salon.reviews})</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">{salon.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm">{salon.hours}</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-medium text-slate-700 mb-3">Serviços:</p>
                      <div className="flex flex-wrap gap-2">
                        {salon.services.map((service, serviceIndex) => (
                          <span
                            key={serviceIndex}
                            className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl font-semibold group"
                      onClick={() => {
                        setSelectedSalon(salon);
                        setSelectedService("");
                        setSelectedDate("");
                        setSelectedHour("");
                        setClientName("");
                        setClientPhone("");
                        setClientEmail("");
                        setClientNotes("");
                        setFormErrors({});
                        setSubmitError("");
                        setShowModal(true);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Horário
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
      {/* Modal de agendamento */}
      {showModal && selectedSalon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              className="absolute top-4 right-4 text-slate-400 hover:text-primary transition-colors" 
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Agendar Serviço</h2>
              <p className="text-slate-600">{selectedSalon.name} • {selectedSalon.address}</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Nome completo *</label>
                  <input 
                    type="text" 
                    className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    placeholder="Seu nome"
                    value={clientName} 
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (formErrors.name) setFormErrors({...formErrors, name: null});
                    }}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Telefone/WhatsApp *</label>
                  <input 
                    type="tel" 
                    className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    placeholder="(11) 98765-4321"
                    value={clientPhone} 
                    onChange={(e) => {
                      setClientPhone(formatPhone(e.target.value));
                      if (formErrors.phone) setFormErrors({...formErrors, phone: null});
                    }}
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Email *</label>
                <input 
                  type="email" 
                  className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  placeholder="seu@email.com"
                  value={clientEmail} 
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                    if (formErrors.email) setFormErrors({...formErrors, email: null});
                  }}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Serviço *</label>
                <select 
                  className={`w-full border ${formErrors.service ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white`}
                  value={selectedService} 
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    if (formErrors.service) setFormErrors({...formErrors, service: null});
                  }}
                >
                  <option value="">Selecione um serviço...</option>
                  {selectedSalon.services.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service} {selectedSalon.prices && selectedSalon.prices[service] ? `- R$ ${selectedSalon.prices[service]}` : ''}
                    </option>
                  ))}
                </select>
                {formErrors.service && <p className="text-red-500 text-sm mt-1">{formErrors.service}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Data *</label>
                  <input 
                    type="date" 
                    className={`w-full border ${formErrors.date ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate} 
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (formErrors.date) setFormErrors({...formErrors, date: null});
                    }}
                  />
                  {formErrors.date && <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Horário *</label>
                  <input 
                    type="time" 
                    className={`w-full border ${formErrors.hour ? 'border-red-500' : 'border-slate-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    value={selectedHour} 
                    onChange={(e) => {
                      setSelectedHour(e.target.value);
                      if (formErrors.hour) setFormErrors({...formErrors, hour: null});
                    }}
                  />
                  {formErrors.hour && <p className="text-red-500 text-sm mt-1">{formErrors.hour}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Observações (opcional)</label>
                <textarea 
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  rows="3"
                  placeholder="Alguma informação adicional?"
                  value={clientNotes} 
                  onChange={(e) => setClientNotes(e.target.value)}
                />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all text-white shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                  onClick={async () => {
                    if (validateForm() && !isSubmitting) {
                      setIsSubmitting(true);
                      setSubmitError("");
                      try {
                        await fetch('/.netlify/functions/salons-function/appointments', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            salon_id: selectedSalon.id,
                            client_name: clientName,
                            client_phone: clientPhone,
                            client_email: clientEmail,
                            service: selectedService,
                            date: selectedDate,
                            hour: selectedHour,
                            notes: clientNotes
                          })
                        });
                        window.open(getWhatsappUrl(selectedSalon, selectedService, selectedDate, selectedHour, clientName, clientPhone, clientEmail), '_blank');
                        setShowModal(false);
                      } catch (error) {
                        console.error('Erro ao criar agendamento:', error);
                        setSubmitError('Ocorreu um erro ao criar o agendamento. Por favor, tente novamente.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner className="w-5 h-5" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" /> Confirmar via WhatsApp
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  disabled={isSubmitting}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                    isSubmitting 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                  onClick={() => {
                    if (!isSubmitting) setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>

              <p className="text-sm text-slate-500 text-center mt-4">* Campos obrigatórios</p>
            </form>
          </motion.div>
        </div>
      )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Promoções */}
      <section id="promocoes" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-orange-500 font-medium uppercase tracking-wider text-sm">Ofertas Limitadas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Promoções Especiais
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Aproveite as melhores ofertas dos nossos parceiros com descontos exclusivos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingPromotions ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-slate-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-10 bg-slate-200 rounded w-full mt-6"></div>
                  </div>
                </div>
              ))
            ) : promotions.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 text-lg py-12">
                Nenhuma promoção disponível no momento.
              </div>
            ) : (
              promotions.map((promo, index) => {
                const promoImage = promo.image || promo.salon_image || salon1;
                const salonName = promo.salon_name || promo.salon || 'Salão';
                const validUntil = promo.valid_until 
                  ? new Date(promo.valid_until).toLocaleDateString('pt-BR') 
                  : promo.validUntil || '';
                
                return (
                  <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
                  >
                    <div className="relative">
                      <img
                        src={promoImage}
                        alt={promo.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                        -{promo.discount}%
                      </div>
                      {promo.popular && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          POPULAR
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-bold text-lg drop-shadow-lg">{salonName}</h4>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed">{promo.description}</p>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-slate-400 line-through text-lg font-medium">
                          R$ {promo.original_price || promo.originalPrice}
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          R$ {promo.discounted_price || promo.discountedPrice}
                        </span>
                      </div>

                      {validUntil && (
                        <div className="flex items-center gap-2 text-slate-600 mb-6">
                          <Tag className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Válido até {validUntil}</span>
                        </div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group">
                        Aproveitar Oferta
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-black/5"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium uppercase tracking-wider">Comece Agora</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Pronto para Transformar Seu Negócio?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
              Junte-se a mais de 1.500 clientes satisfeitos e revolucione a gestão do seu salão
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all group">
                Começar Teste Grátis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm">
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
  // ...
}
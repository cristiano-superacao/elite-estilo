import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Tag, Calendar, ArrowRight, Sparkles, Users, Trophy, Shield, Zap } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { salon1, salon2, salon3 } from '../assets/images.js'

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
]

const salons = [
  {
    id: 1,
    name: 'Barbearia Elegance',
    image: salon1,
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo',
    rating: 4.8,
    reviews: 127,
    phone: '(11) 98765-4321',
    hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h',
    services: ['Corte Masculino', 'Barba', 'Coloração'],
    badge: 'Top Rated',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    name: 'Salão Beleza Pura',
    image: salon2,
    address: 'Av. Paulista, 456 - Bela Vista',
    city: 'São Paulo',
    rating: 4.9,
    reviews: 203,
    phone: '(11) 97654-3210',
    hours: 'Seg-Sex: 8h-19h | Sáb: 8h-17h',
    services: ['Corte Feminino', 'Manicure', 'Escova'],
    badge: 'Premium',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    name: 'Studio Hair Premium',
    image: salon3,
    address: 'Rua Augusta, 789 - Consolação',
    city: 'São Paulo',
    rating: 4.7,
    reviews: 89,
    phone: '(11) 96543-2109',
    hours: 'Seg-Sex: 10h-21h | Sáb: 9h-18h',
    services: ['Corte Unissex', 'Tratamentos', 'Coloração'],
    badge: 'Trending',
    color: 'from-emerald-500 to-teal-600'
  }
]

const promotions = [
  {
    id: 1,
    salon: 'Barbearia Elegance',
    title: 'Combo Corte + Barba',
    discount: 25,
    originalPrice: 80,
    discountedPrice: 60,
    description: 'Corte masculino moderno + modelagem de barba completa',
    validUntil: '31/01/2025',
    image: salon1,
    popular: true
  },
  {
    id: 2,
    salon: 'Salão Beleza Pura',
    title: 'Escova + Hidratação',
    discount: 25,
    originalPrice: 100,
    discountedPrice: 75,
    description: 'Escova modeladora + tratamento hidratante profundo',
    validUntil: '28/02/2025',
    image: salon2,
    popular: false
  },
  {
    id: 3,
    salon: 'Studio Hair Premium',
    title: 'Pacote Completo',
    discount: 25,
    originalPrice: 120,
    discountedPrice: 90,
    description: 'Corte + coloração + tratamento capilar especial',
    validUntil: '15/02/2025',
    image: salon3,
    popular: false
  }
]

const stats = [
  { icon: Users, value: '1,500+', label: 'Clientes Satisfeitos' },
  { icon: Trophy, value: '50+', label: 'Salões Parceiros' },
  { icon: Star, value: '4.9', label: 'Avaliação Média' },
  { icon: Shield, value: '100%', label: 'Segurança' }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

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
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubra os melhores profissionais da sua região com avaliações reais e serviços de qualidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon, index) => (
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

                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl font-semibold group">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Horário
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
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
            {promotions.map((promo, index) => (
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
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    -{promo.discount}%
                  </div>
                  {promo.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">{promo.salon}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{promo.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-slate-400 line-through text-lg font-medium">
                      R$ {promo.originalPrice}
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      R$ {promo.discountedPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 mb-6">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Válido até {promo.validUntil}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-semibold group">
                    Aproveitar Oferta
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
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
  )
}
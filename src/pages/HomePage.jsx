import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Tag, Calendar } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { salon1, salon2, salon3 } from '../assets/images.js'

const carouselImages = [
  {
    src: salon1,
    title: 'Transforme seu Visual',
    subtitle: 'Encontre os melhores salões e barbearias da sua região'
  },
  {
    src: salon2,
    title: 'Profissionais Qualificados',
    subtitle: 'Agende seus serviços com facilidade e praticidade'
  },
  {
    src: salon3,
    title: 'Experiência Única',
    subtitle: 'Atendimento de qualidade e ambiente acolhedor'
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
    services: ['Corte Masculino', 'Barba', 'Coloração']
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
    services: ['Corte Feminino', 'Manicure', 'Escova']
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
    hours: 'Seg-Sex: 9h-21h | Sáb: 9h-19h',
    services: ['Corte Unissex', 'Química', 'Tratamentos']
  }
]

const promotions = [
  {
    id: 1,
    salon: 'Barbearia Elegance',
    title: 'Combo Corte + Barba',
    discount: 25,
    originalPrice: 60,
    discountedPrice: 45,
    description: 'Corte masculino moderno + modelagem de barba completa',
    validUntil: '31/01/2025',
    image: salon1
  },
  {
    id: 2,
    salon: 'Salão Beleza Pura',
    title: 'Escova + Hidratação',
    discount: 25,
    originalPrice: 80,
    discountedPrice: 60,
    description: 'Escova modeladora + hidratação profunda dos cabelos',
    validUntil: '28/02/2025',
    image: salon2
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
    image: salon3
  }
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
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentSlide].src}
              alt={carouselImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
                >
                  {carouselImages[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl mb-8"
                >
                  {carouselImages[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button size="lg" className="mr-4">
                    Encontrar Salões
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-black">
                    Saber Mais
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Salões Cadastrados */}
      <section id="saloes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Salões em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Descubra os melhores profissionais da sua região
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
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{salon.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{salon.rating}</span>
                      <span className="text-gray-500 text-sm">({salon.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{salon.hours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Serviços:</p>
                    <div className="flex flex-wrap gap-1">
                      {salon.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Horário
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promoções */}
      <section id="promocoes" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Promoções Especiais
            </h2>
            <p className="text-xl text-gray-600">
              Aproveite as melhores ofertas dos nossos parceiros
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
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{promo.discount}%
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold">{promo.salon}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{promo.description}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-500 line-through text-lg">
                      R$ {promo.originalPrice}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      R$ {promo.discountedPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">Válido até {promo.validUntil}</span>
                  </div>

                  <Button className="w-full">
                    Aproveitar Oferta
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl mb-8">
              Junte-se a centenas de salões que já usam nossa plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Cadastrar Meu Salão
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Tag, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import salon1 from '../assets/salon1.jpg'
import salon2 from '../assets/salon2.jpg'
import salon3 from '../assets/salon3.jpg'

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
    address: 'Rua Augusta, 789 - Jardins',
    city: 'São Paulo',
    rating: 4.7,
    reviews: 89,
    phone: '(11) 96543-2109',
    hours: 'Seg-Sáb: 9h-20h',
    services: ['Corte', 'Coloração', 'Tratamentos']
  },
  {
    id: 4,
    name: 'Barbearia Classic',
    image: salon1,
    address: 'Rua do Comércio, 321 - Liberdade',
    city: 'São Paulo',
    rating: 4.6,
    reviews: 156,
    phone: '(11) 95432-1098',
    hours: 'Seg-Sex: 8h-18h | Sáb: 8h-16h',
    services: ['Corte Tradicional', 'Barba', 'Bigode']
  },
  {
    id: 5,
    name: 'Salão Glamour',
    image: salon2,
    address: 'Av. Brasil, 654 - Vila Madalena',
    city: 'São Paulo',
    rating: 4.8,
    reviews: 312,
    phone: '(11) 94321-0987',
    hours: 'Seg-Sex: 9h-19h | Sáb: 9h-17h',
    services: ['Corte Feminino', 'Pintura', 'Penteados']
  },
  {
    id: 6,
    name: 'Hair & Style',
    image: salon3,
    address: 'Rua das Palmeiras, 987 - Moema',
    city: 'São Paulo',
    rating: 4.5,
    reviews: 78,
    phone: '(11) 93210-9876',
    hours: 'Seg-Sáb: 10h-20h',
    services: ['Corte Moderno', 'Luzes', 'Alisamento']
  },
  {
    id: 7,
    name: 'Barbearia Moderna',
    image: salon1,
    address: 'Rua da Consolação, 456 - Consolação',
    city: 'São Paulo',
    rating: 4.9,
    reviews: 267,
    phone: '(11) 92109-8765',
    hours: 'Seg-Sex: 7h-19h | Sáb: 8h-17h',
    services: ['Corte Fade', 'Barba Desenhada', 'Sobrancelha']
  },
  {
    id: 8,
    name: 'Salão Encanto',
    image: salon2,
    address: 'Av. Faria Lima, 123 - Itaim Bibi',
    city: 'São Paulo',
    rating: 4.7,
    reviews: 189,
    phone: '(11) 91098-7654',
    hours: 'Seg-Sex: 8h-20h | Sáb: 8h-18h',
    services: ['Corte & Cor', 'Hidratação', 'Progressiva']
  },
  {
    id: 9,
    name: 'Studio Excellence',
    image: salon3,
    address: 'Rua Oscar Freire, 789 - Cerqueira César',
    city: 'São Paulo',
    rating: 4.8,
    reviews: 145,
    phone: '(11) 90987-6543',
    hours: 'Seg-Sáb: 9h-21h',
    services: ['Corte Executivo', 'Coloração Premium', 'Tratamento Capilar']
  }
]

const promotions = [
  {
    id: 1,
    salon: 'Barbearia Elegance',
    title: 'Corte + Barba',
    originalPrice: 80,
    discountPrice: 60,
    discount: 25,
    description: 'Combo especial de corte masculino + barba completa',
    validUntil: '31/12/2025'
  },
  {
    id: 2,
    salon: 'Salão Beleza Pura',
    title: 'Escova + Hidratação',
    originalPrice: 120,
    discountPrice: 90,
    discount: 25,
    description: 'Escova progressiva + hidratação profunda',
    validUntil: '15/12/2025'
  },
  {
    id: 3,
    salon: 'Studio Hair Premium',
    title: 'Pacote Completo',
    originalPrice: 200,
    discountPrice: 150,
    discount: 25,
    description: 'Corte + Coloração + Tratamento capilar',
    validUntil: '20/12/2025'
  }
]

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

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
    <div className="w-full">
      {/* Carrossel */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
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
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  {carouselImages[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl mb-8"
                >
                  {carouselImages[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6"
                    onClick={() => navigate('/login')}
                  >
                    Entrar
                  </Button>
                </motion.div>
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
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Salões Cadastrados */}
      <section id="saloes" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Salões Cadastrados</h2>
          <p className="text-lg text-muted-foreground">
            Conheça os melhores estabelecimentos da sua região
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{salon.rating}</span>
                  <span className="text-sm text-muted-foreground">({salon.reviews})</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{salon.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <span>{salon.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Serviços:</p>
                  <div className="flex flex-wrap gap-2">
                    {salon.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => {
                    const message = encodeURIComponent(`Olá! Gostaria de agendar um horário no ${salon.name}`);
                    window.open(`https://wa.me/5571993372960?text=${message}`, '_blank');
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Horário
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promoções */}
      <section id="promocoes" className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Promoções Especiais</h2>
            <p className="text-lg text-muted-foreground">
              Aproveite as melhores ofertas dos nossos parceiros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{promo.salon}</span>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{promo.discount}%
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">{promo.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{promo.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-primary">
                      R$ {promo.discountPrice}
                    </div>
                    <div className="text-lg text-muted-foreground line-through">
                      R$ {promo.originalPrice}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Tag className="w-4 h-4" />
                    <span>Válido até {promo.validUntil}</span>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre a promoção: ${promo.title} no ${promo.salon}`);
                      window.open(`https://wa.me/5571993372960?text=${message}`, '_blank');
                    }}
                  >
                    Aproveitar Oferta
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se aos melhores salões e barbearias que já usam o Elite & Estilo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/cadastro-salao')}
            >
              Cadastrar Meu Salão
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20"
              onClick={() => {
                const element = document.getElementById('saloes');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Saber Mais
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage


import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { salon1, salon2, salon3 } from '../assets/images.js'

/**
 * HeroCarousel Component
 * 
 * Features:
 * - 3 animated slides with smooth transitions
 * - Autoplay (5 seconds per slide)
 * - Navigation controls (prev/next buttons)
 * - Pagination indicators
 * - Fully responsive design
 * - Fade effect between slides
 * - Touch/swipe enabled
 */
export default function HeroCarousel() {
  const swiperRef = useRef(null)

  const slides = [
    {
      id: 1,
      image: salon1,
      title: 'Transforme seu Visual',
      subtitle: 'Encontre os melhores salões e barbearias da sua região',
      cta: 'Explorar Salões',
      gradient: 'from-purple-900/70 to-purple-600/50'
    },
    {
      id: 2,
      image: salon2,
      title: 'Profissionais Qualificados',
      subtitle: 'Agende seus serviços com facilidade e praticidade',
      cta: 'Agendar Agora',
      gradient: 'from-blue-900/70 to-blue-600/50'
    },
    {
      id: 3,
      image: salon3,
      title: 'Experiência Única',
      subtitle: 'Atendimento de qualidade e ambiente acolhedor',
      cta: 'Conhecer Planos',
      gradient: 'from-pink-900/70 to-pink-600/50'
    }
  ]

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-8'
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <motion.h1
                    key={`title-${index}`}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    key={`subtitle-${index}`}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-white/90 drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.button
                    key={`button-${index}`}
                    variants={buttonVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false }}
                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {slide.cta}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      {/* Pagination Dots Container */}
      <style jsx>{`
        :global(.swiper-pagination) {
          bottom: 2rem !important;
        }
        
        :global(.swiper-pagination-bullet) {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          :global(.swiper-pagination) {
            bottom: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}

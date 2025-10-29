import { useState, useEffect } from 'react'
import { Search, Star, MapPin, Clock, X, Phone, Calendar, ArrowRight, Filter, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { salonsDatabase, searchSalons } from '../data/salons.js'

export default function SalonsPage() {
  const [search, setSearch] = useState("")
  const [filteredSalons, setFilteredSalons] = useState(salonsDatabase)
  const [showModal, setShowModal] = useState(false)
  const [selectedSalon, setSelectedSalon] = useState(null)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedHour, setSelectedHour] = useState("")
  const [clientName, setClientName] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [cityFilter, setCityFilter] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")

  // Extract unique cities and services for filters
  const cities = [...new Set(salonsDatabase.map(salon => salon.city))]
  const allServices = [...new Set(salonsDatabase.flatMap(salon => salon.services))]

  // Apply filters
  useEffect(() => {
    let results = searchSalons(search, salonsDatabase)

    // Apply rating filter
    if (ratingFilter > 0) {
      results = results.filter(salon => salon.rating >= ratingFilter)
    }

    // Apply city filter
    if (cityFilter) {
      results = results.filter(salon => salon.city === cityFilter)
    }

    // Apply service filter
    if (serviceFilter) {
      results = results.filter(salon => salon.services.includes(serviceFilter))
    }

    setFilteredSalons(results)
  }, [search, ratingFilter, cityFilter, serviceFilter])

  // Utility function to format WhatsApp message
  function getWhatsappUrl(salon, service, date, hour, clientName) {
    const msg = `Olá, gostaria de agendar um serviço no salão ${salon.name}!\n\n*Cliente:* ${clientName || ''}\n*Serviço:* ${service}\n*Data:* ${date}\n*Horário:* ${hour}`
    return `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  // Helper function to get today's date in YYYY-MM-DD format
  function getTodayDateString() {
    return new Date().toISOString().split('T')[0]
  }

  // Clear all filters
  const clearFilters = () => {
    setSearch("")
    setRatingFilter(0)
    setCityFilter("")
    setServiceFilter("")
    setShowFilters(false)
  }

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white py-20 mb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Catálogo de Salões
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Encontre os melhores salões e barbearias da sua região com avaliações reais e serviços de qualidade
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="container mx-auto px-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 text-lg"
                placeholder="Pesquisar salões, serviços, cidade..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2 px-6"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
              {(ratingFilter > 0 || cityFilter || serviceFilter) && (
                <span className="bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {[ratingFilter > 0, cityFilter, serviceFilter].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-200 pt-6 mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Avaliação Mínima
                    </label>
                    <select
                      value={ratingFilter}
                      onChange={e => setRatingFilter(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value={0}>Todas</option>
                      <option value={4.5}>4.5+ estrelas</option>
                      <option value={4.0}>4.0+ estrelas</option>
                      <option value={3.5}>3.5+ estrelas</option>
                    </select>
                  </div>

                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Cidade
                    </label>
                    <select
                      value={cityFilter}
                      onChange={e => setCityFilter(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Todas as cidades</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Service Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Serviço
                    </label>
                    <select
                      value={serviceFilter}
                      onChange={e => setServiceFilter(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Todos os serviços</option>
                      {allServices.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(ratingFilter > 0 || cityFilter || serviceFilter) && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="text-slate-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-600">
            {filteredSalons.length} {filteredSalons.length === 1 ? 'salão encontrado' : 'salões encontrados'}
          </div>
        </div>
      </section>

      {/* Salons Grid */}
      <section className="container mx-auto px-6">
        {filteredSalons.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Nenhum salão encontrado
            </h3>
            <p className="text-slate-600 mb-6">
              Tente ajustar seus filtros ou fazer uma nova pesquisa
            </p>
            <Button onClick={clearFilters} variant="outline">
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalons.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{salon.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{salon.phone}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-slate-700 mb-3">Serviços:</p>
                    <div className="flex flex-wrap gap-2">
                      {salon.services.slice(0, 4).map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                          {service}
                        </span>
                      ))}
                      {salon.services.length > 4 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          +{salon.services.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl font-semibold group"
                    onClick={() => {
                      setSelectedSalon(salon)
                      setSelectedService("")
                      setSelectedDate("")
                      setSelectedHour("")
                      setClientName("")
                      setShowModal(true)
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Horário
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && selectedSalon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-primary transition-colors"
                onClick={() => setShowModal(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-2 text-slate-800">
                Agendar em {selectedSalon.name}
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Preencha os dados abaixo para confirmar seu agendamento
              </p>

              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-slate-700 font-medium mb-2 text-sm">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Digite seu nome completo"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2 text-sm">
                    Serviço *
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Selecione um serviço...</option>
                    {selectedSalon.services.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                        {selectedSalon.prices[service] && ` - R$ ${selectedSalon.prices[service]}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2 text-sm">
                    Data *
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={getTodayDateString()}
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2 text-sm">
                    Horário *
                  </label>
                  <input
                    type="time"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={selectedHour}
                    onChange={e => setSelectedHour(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  {(() => {
                    const isFormValid = selectedService && selectedDate && selectedHour && clientName
                    return (
                      <Button
                        type="button"
                        className={`w-full ${isFormValid
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        disabled={!isFormValid}
                        onClick={() => {
                          if (isFormValid) {
                            window.open(
                              getWhatsappUrl(selectedSalon, selectedService, selectedDate, selectedHour, clientName),
                              '_blank'
                            )
                            setShowModal(false)
                          }
                        }}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Confirmar pelo WhatsApp
                      </Button>
                    )
                  })()}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

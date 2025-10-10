import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X, Scissors, Calendar, Star, MapPin, Phone, Mail, Instagram, Whatsapp } from 'lucide-react'
import { Button } from './components/ui/button.jsx'
import HomePage from './pages/HomePage'
import PlansPage from './pages/PlansPage'
import './index.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header/Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-slate-800 hover:text-primary transition-colors">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white">
                  <Scissors className="w-6 h-6" />
                </div>
                <span className="font-inter font-bold tracking-tight">Elite & Estilo</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Início
                </Link>
                <Link to="/planos" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Planos
                </Link>
                <a href="#saloes" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Salões
                </a>
                <a href="#promocoes" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Promoções
                </a>
                <Button className="ml-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                  Agendar Agora
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-slate-600 hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-white/20 pt-6">
                <Link
                  to="/"
                  className="text-slate-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  to="/planos"
                  className="text-slate-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planos
                </Link>
                <a
                  href="#saloes"
                  className="text-slate-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Salões
                </a>
                <a
                  href="#promocoes"
                  className="text-slate-600 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Promoções
                </a>
                <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium">
                  Agendar Agora
                </Button>
              </div>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planos" element={<PlansPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-16 mt-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo e Descrição */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 text-2xl font-bold mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-purple-600">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <span className="font-inter font-bold tracking-tight">Elite & Estilo</span>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Sistema de gestão completo para barbearias e salões de beleza. 
                  Conectando profissionais e clientes de forma simples e eficiente.
                </p>
              </div>

              {/* Links Rápidos */}
              <div>
                <h3 className="font-bold text-lg mb-6 text-white">Links Rápidos</h3>
                <ul className="space-y-3 text-slate-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
                  <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                  <li><a href="#saloes" className="hover:text-white transition-colors">Salões</a></li>
                  <li><a href="#promocoes" className="hover:text-white transition-colors">Promoções</a></li>
                </ul>
              </div>

              {/* Contato */}
              <div>
                <h3 className="font-bold text-lg mb-6 text-white">Contato</h3>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center gap-3 hover:text-white transition-colors">
                    <Whatsapp className="w-4 h-4" />
                    <span>(71) 99337-2960</span>
                  </li>
                  <li className="flex items-center gap-3 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>contato@elitestilo.com</span>
                  </li>
                  <li className="flex items-center gap-3 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                    <span>@elitestilo</span>
                  </li>
                  <li className="flex items-center gap-3 hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span>Salvador, BA</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
              <p>&copy; 2025 Elite & Estilo. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

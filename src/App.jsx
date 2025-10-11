import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X, Scissors, Calendar, Star, MapPin, MessageCircle, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import HomePage from './pages/HomePage.jsx'
import PlansPage from './pages/PlansPage.jsx'
import AgendamentoPage from './pages/AgendamentoPage.jsx'
import CadastroSalaoPage from './pages/CadastroSalaoPage.jsx'
import DashboardSalaoPage from './pages/DashboardSalaoPage.jsx'
import SalaoDetalhePage from './pages/SalaoDetalhePage.jsx'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Header/Navigation */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Scissors className="w-8 h-8" />
                <span>Elite & Estilo</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  Início
                </Link>
                <Link to="/planos" className="text-foreground hover:text-primary transition-colors">
                  Planos
                </Link>
                <a href="#saloes" className="text-foreground hover:text-primary transition-colors">
                  Salões
                </a>
                <a href="#promocoes" className="text-foreground hover:text-primary transition-colors">
                  Promoções
                </a>
                <Button 
                  className="ml-4"
                  onClick={() => window.location.href = '/agendamento'}
                >
                  Agendar Agora
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  to="/planos"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planos
                </Link>
                <a
                  href="#saloes"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Salões
                </a>
                <a
                  href="#promocoes"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Promoções
                </a>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/agendamento';
                  }}
                >
                  Agendar Agora
                </Button>
              </div>
            )}
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planos" element={<PlansPage />} />
          <Route path="/agendamento" element={<AgendamentoPage />} />
          <Route path="/cadastro-salao" element={<CadastroSalaoPage />} />
          <Route path="/dashboard-salao" element={<DashboardSalaoPage />} />
          <Route path="/salao/:salaoId" element={<SalaoDetalhePage />} />
        </Routes>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo e Descrição */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Scissors className="w-8 h-8" />
                  <span>Elite & Estilo</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Sistema de gestão completo para barbearias e salões de beleza. 
                  Conectando profissionais e clientes de forma simples e eficiente.
                </p>
              </div>

              {/* Links Rápidos */}
              <div>
                <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
                  <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                  <li><a href="#saloes" className="hover:text-white transition-colors">Salões</a></li>
                  <li><a href="#promocoes" className="hover:text-white transition-colors">Promoções</a></li>
                </ul>
              </div>

              {/* Contato */}
              <div>
                <h3 className="font-bold text-lg mb-4">Contato</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>(71) 9 9337-2960</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <span>@elite&estilo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Salvador, BA</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Elite & Estilo. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App


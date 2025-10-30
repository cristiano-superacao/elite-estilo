import { Check, X, Star, Zap, Crown, HelpCircle, Users, Calendar, BarChart3, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { motion } from 'framer-motion'

const plans = [
  {
    id: 1,
    name: 'Teste Gratuito',
    icon: Star,
    price: 0,
    duration: '90 dias',
    description: 'Experimente todas as funcionalidades sem compromisso',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Até 3 profissionais', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Suporte por e-mail', included: true },
      { text: 'Relatórios avançados', included: false },
      { text: 'WhatsApp Business', included: false },
      { text: 'Prioridade no suporte', included: false }
    ],
    highlight: false,
    buttonText: 'Começar Teste Grátis',
    badge: 'Ideal para começar'
  },
  {
    id: 2,
    name: 'Plano Mensal',
    icon: Zap,
    price: 50,
    duration: 'por mês',
    description: 'Flexibilidade para gerenciar seu negócio mês a mês',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Profissionais ilimitados', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'WhatsApp Business', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Sem fidelidade', included: true }
    ],
    highlight: false,
    buttonText: 'Assinar Mensal',
    badge: 'Mais flexível'
  },
  {
    id: 3,
    name: 'Plano Semestral',
    icon: Crown,
    price: 255,
    duration: '6 meses',
    originalPrice: 300,
    discount: 15,
    description: 'Economia de 15% com pagamento semestral',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Profissionais ilimitados', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'WhatsApp Business', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Consultoria personalizada', included: true }
    ],
    highlight: true,
    buttonText: 'Assinar Semestral',
    badge: 'Mais Popular'
  },
  {
    id: 4,
    name: 'Plano Anual',
    icon: Crown,
    price: 480,
    duration: '12 meses',
    originalPrice: 600,
    discount: 20,
    description: 'Maior economia com pagamento anual',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Profissionais ilimitados', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'WhatsApp Business', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Consultoria personalizada', included: true },
      { text: 'Treinamento gratuito', included: true }
    ],
    highlight: false,
    buttonText: 'Assinar Anual',
    badge: 'Melhor custo-benefício'
  }
]

const mainFeatures = [
  {
    icon: Calendar,
    title: 'Agendamento Online',
    description: 'Sistema completo de agendamentos com confirmação automática e lembretes'
  },
  {
    icon: Users,
    title: 'Gestão de Clientes',
    description: 'Cadastro completo de clientes com histórico de serviços e preferências'
  },
  {
    icon: BarChart3,
    title: 'Relatórios Detalhados',
    description: 'Análise completa do seu negócio com gráficos e métricas importantes'
  },
  {
    icon: MessageCircle,
    title: 'Comunicação Integrada',
    description: 'Chat interno e integração com WhatsApp Business para melhor atendimento'
  }
]

const faqs = [
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. No plano mensal, o cancelamento é imediato. Nos planos semestrais e anuais, você continua usando até o final do período já pago.'
  },
  {
    question: 'Como funciona o teste gratuito?',
    answer: 'O teste gratuito de 90 dias inclui acesso a todas as funcionalidades básicas, permitindo que você avalie se nossa plataforma atende às suas necessidades antes de assinar um plano pago.'
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de cobrança.'
  },
  {
    question: 'Há limite de agendamentos?',
    answer: 'Não, todos os nossos planos incluem agendamentos ilimitados. Você pode receber quantos agendamentos seus clientes fizerem.'
  },
  {
    question: 'Como funciona o suporte técnico?',
    answer: 'Oferecemos suporte por e-mail para todos os planos. Assinantes dos planos pagos têm acesso ao suporte prioritário com tempo de resposta mais rápido.'
  },
  {
    question: 'Os dados ficam seguros?',
    answer: 'Sim, utilizamos criptografia de ponta e seguimos as melhores práticas de segurança. Todos os dados são armazenados em servidores seguros e fazemos backup automático.'
  }
]

export default function PlansPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Escolha o Plano Ideal
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre o plano perfeito para o seu salão ou barbearia. 
            Começe com 90 dias grátis e veja como podemos transformar seu negócio.
          </p>
        </motion.div>
      </section>

      {/* Plans Grid */}
      <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg p-5 sm:p-6 ${
                  plan.highlight ? 'ring-2 ring-primary lg:scale-105' : ''
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold text-white whitespace-nowrap ${
                    plan.highlight ? 'bg-primary' : 'bg-gray-600'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-3 sm:mb-4 mt-2">
                  <div className={`p-2.5 sm:p-3 rounded-full ${
                    plan.highlight ? 'bg-primary/10' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      plan.highlight ? 'text-primary' : 'text-gray-600'
                    }`} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="text-center mb-4">
                  {plan.originalPrice && (
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span className="line-through">R$ {plan.originalPrice}</span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                        -{plan.discount}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-center flex-wrap">
                    <span className="text-3xl sm:text-4xl font-bold">R$ {plan.price}</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/{plan.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center mb-5 sm:mb-6 text-xs sm:text-sm">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2.5 sm:gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm ${
                        feature.included ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button 
                  className={`w-full text-sm sm:text-base ${
                    plan.highlight ? 'bg-primary hover:bg-primary/90' : ''
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Main Features */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Recursos Principais
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Tudo que você precisa para gerenciar seu negócio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Tire suas dúvidas sobre nossos planos
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4 sm:mb-6 bg-white rounded-lg shadow-md"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">
              Fale com um de nossos especialistas e descubra como podemos ajudar seu negócio
            </p>
            <Button size="lg" variant="secondary" className="text-sm sm:text-base">
              Falar com Especialista
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

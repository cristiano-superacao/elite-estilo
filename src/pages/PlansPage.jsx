import { Check, X, Star, Zap, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
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
    originalPrice: 300,
    duration: '6 meses',
    discount: 15,
    description: 'Economize 15% com o plano semestral',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Profissionais ilimitados', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'WhatsApp Business', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Treinamento online', included: true }
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
    originalPrice: 600,
    duration: '12 meses',
    discount: 20,
    description: 'Máxima economia com o plano anual',
    features: [
      { text: 'Cadastro de salão', included: true },
      { text: 'Profissionais ilimitados', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Chat com clientes', included: true },
      { text: 'Dashboard completo', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'WhatsApp Business', included: true },
      { text: 'Suporte VIP 24/7', included: true },
      { text: 'Treinamento personalizado', included: true },
      { text: 'Consultoria mensal', included: true }
    ],
    highlight: false,
    buttonText: 'Assinar Anual',
    badge: 'Melhor custo-benefício'
  }
]

const features = [
  {
    title: 'Gestão Completa',
    description: 'Controle total sobre agendamentos, profissionais e serviços do seu salão'
  },
  {
    title: 'Chat em Tempo Real',
    description: 'Comunique-se diretamente com seus clientes através do chat integrado'
  },
  {
    title: 'Dashboard Intuitivo',
    description: 'Visualize métricas e relatórios de faturamento de forma clara e objetiva'
  },
  {
    title: 'WhatsApp Business',
    description: 'Envie lembretes e confirmações automáticas via WhatsApp'
  },
  {
    title: 'Sem Fidelidade',
    description: 'Cancele quando quiser, sem taxas ou multas de cancelamento'
  },
  {
    title: 'Suporte Dedicado',
    description: 'Equipe pronta para ajudar você a crescer seu negócio'
  }
]

function PlansPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Escolha o Plano Ideal para Seu Negócio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Comece com 90 dias grátis e veja como o Beleza Connect pode transformar seu salão
          </motion.p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl scale-105'
                    : 'bg-card shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    plan.highlight ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    plan.highlight ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {plan.discount && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-lg line-through opacity-60`}>
                          R$ {plan.originalPrice}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          plan.highlight ? 'bg-white/20' : 'bg-red-500 text-white'
                        }`}>
                          -{plan.discount}%
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">R$ {plan.price}</span>
                      <span className={`text-sm ${plan.highlight ? 'opacity-80' : 'text-muted-foreground'}`}>
                        /{plan.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mb-6 ${plan.highlight ? 'opacity-90' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.highlight ? 'text-white' : 'text-green-500'
                          }`} />
                        ) : (
                          <X className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.highlight ? 'text-white/40' : 'text-muted-foreground'
                          }`} />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? '' 
                            : plan.highlight ? 'opacity-40' : 'text-muted-foreground'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button
                    className={`w-full ${
                      plan.highlight
                        ? 'bg-white text-primary hover:bg-white/90'
                        : ''
                    }`}
                    size="lg"
                    onClick={() => {
                      const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o ${plan.name} - ${plan.buttonText}`);
                      window.open(`https://wa.me/5571993372960?text=${message}`, '_blank');
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que Você Precisa para Crescer
            </h2>
            <p className="text-lg text-muted-foreground">
              Recursos poderosos para gerenciar e expandir seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Como funciona o teste gratuito?</h3>
              <p className="text-muted-foreground">
                Você tem acesso completo à plataforma por 90 dias, sem precisar cadastrar cartão de crédito. 
                Após o período, você pode escolher o plano que melhor se adapta ao seu negócio.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-muted-foreground">
                Sim! Não há fidelidade em nenhum dos nossos planos. Você pode cancelar quando quiser, 
                sem taxas ou multas de cancelamento.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Como funciona o pagamento?</h3>
              <p className="text-muted-foreground">
                Aceitamos pagamentos via cartão de crédito, débito e PIX. O pagamento é processado de forma 
                segura através do Mercado Pago e Stripe.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Posso mudar de plano depois?</h3>
              <p className="text-muted-foreground">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                Os valores são ajustados proporcionalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-6"
            onClick={() => {
              const message = encodeURIComponent(`Olá! Gostaria de falar com um especialista sobre os planos do Elite & Estilo`);
              window.open(`https://wa.me/5571993372960?text=${message}`, '_blank');
            }}
          >
            Falar com um Especialista
          </Button>
        </div>
      </section>
    </div>
  )
}

export default PlansPage


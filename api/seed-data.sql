-- Script de População de Dados de Exemplo
-- Execute este script após criar as tabelas com db.sql

-- Limpar dados existentes (cuidado em produção!)
TRUNCATE TABLE appointments CASCADE;
TRUNCATE TABLE plans CASCADE;
TRUNCATE TABLE salons CASCADE;

-- Resetar sequences
ALTER SEQUENCE salons_id_seq RESTART WITH 1;
ALTER SEQUENCE plans_id_seq RESTART WITH 1;
ALTER SEQUENCE appointments_id_seq RESTART WITH 1;

-- Inserir salões de exemplo
INSERT INTO salons (name, image, address, city, rating, reviews, phone, whatsapp, hours, services, prices, specialties, badge, color, description, amenities, owner) VALUES
  (
    'Barbearia Elite Premium',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    'Rua das Flores, 123 - Centro',
    'Salvador',
    4.8,
    127,
    '(71) 3333-4444',
    '(71) 99999-8888',
    'Seg-Sex: 9h-20h | Sáb: 9h-18h',
    ARRAY['Corte', 'Barba', 'Sobrancelha', 'Pigmentação'],
    '{"Corte": "R$ 45,00", "Barba": "R$ 35,00", "Sobrancelha": "R$ 25,00", "Pigmentação": "R$ 80,00"}'::jsonb,
    ARRAY['Corte Moderno', 'Barba Tradicional', 'Fade Profissional'],
    'Premium',
    'purple',
    'Barbearia de alto padrão com ambiente moderno e profissionais altamente qualificados. Oferecemos os melhores serviços de barbearia na região.',
    ARRAY['Wi-Fi Grátis', 'Estacionamento', 'Ar-Condicionado', 'TV', 'Bebidas Cortesia'],
    'João Silva'
  ),
  (
    'Salão Beleza Total',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    'Av. Principal, 456 - Barra',
    'Salvador',
    4.5,
    89,
    '(71) 2222-3333',
    '(71) 98888-7777',
    'Seg-Sáb: 8h-19h',
    ARRAY['Corte', 'Coloração', 'Manicure', 'Pedicure', 'Escova'],
    '{"Corte": "R$ 60,00", "Coloração": "R$ 150,00", "Manicure": "R$ 40,00", "Pedicure": "R$ 50,00", "Escova": "R$ 45,00"}'::jsonb,
    ARRAY['Coloração Profissional', 'Tratamentos Capilares', 'Design de Unhas'],
    'Destaque',
    'pink',
    'Salão completo para cuidados com cabelo e unhas. Ambiente aconchegante com profissionais experientes.',
    ARRAY['Wi-Fi Grátis', 'Café Cortesia', 'Produtos Profissionais', 'Ar-Condicionado'],
    'Maria Santos'
  ),
  (
    'Studio Hair & Beauty',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800',
    'Rua do Comércio, 789 - Pituba',
    'Salvador',
    4.9,
    203,
    '(71) 4444-5555',
    '(71) 97777-6666',
    'Seg-Sáb: 9h-21h | Dom: 10h-16h',
    ARRAY['Corte', 'Coloração', 'Alisamento', 'Hidratação', 'Manicure', 'Pedicure', 'Maquiagem'],
    '{"Corte": "R$ 80,00", "Coloração": "R$ 200,00", "Alisamento": "R$ 300,00", "Hidratação": "R$ 120,00"}'::jsonb,
    ARRAY['Alisamento Premium', 'Coloração Balayage', 'Maquiagem Profissional'],
    'VIP',
    'gold',
    'Studio premium de beleza com os melhores profissionais da região. Atendimento personalizado e produtos de alta qualidade.',
    ARRAY['Wi-Fi Grátis', 'Estacionamento Valet', 'Lounge VIP', 'Champagne', 'Produtos Importados'],
    'Carlos Oliveira'
  ),
  (
    'Barbearia Clássica',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    'Av. Sete, 321 - Campo Grande',
    'Salvador',
    4.3,
    56,
    '(71) 5555-6666',
    '(71) 96666-5555',
    'Ter-Sáb: 10h-20h',
    ARRAY['Corte', 'Barba', 'Sobrancelha', 'Platinado'],
    '{"Corte": "R$ 40,00", "Barba": "R$ 30,00", "Sobrancelha": "R$ 20,00"}'::jsonb,
    ARRAY['Corte Clássico', 'Barba Tradicional'],
    'Tradicional',
    'brown',
    'Barbearia tradicional com mais de 20 anos de experiência. Atendimento familiar e ambiente acolhedor.',
    ARRAY['Ar-Condicionado', 'TV', 'Café'],
    'Pedro Costa'
  ),
  (
    'Espaço Feminino',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    'Shopping Boulevard, Loja 205',
    'Salvador',
    4.7,
    145,
    '(71) 6666-7777',
    '(71) 95555-4444',
    'Seg-Sáb: 10h-22h | Dom: 12h-20h',
    ARRAY['Corte', 'Escova', 'Penteado', 'Manicure', 'Pedicure', 'Depilação', 'Design de Sobrancelhas'],
    '{"Corte": "R$ 70,00", "Escova": "R$ 50,00", "Manicure": "R$ 45,00", "Depilação": "R$ 60,00"}'::jsonb,
    ARRAY['Penteados para Festas', 'Nail Art', 'Design de Sobrancelhas'],
    'Destaque',
    'rose',
    'Salão especializado em beleza feminina. Localização privilegiada no shopping com amplo horário de funcionamento.',
    ARRAY['Wi-Fi', 'Ar-Condicionado', 'Produtos Premium', 'Estacionamento Shopping'],
    'Ana Paula'
  );

-- Inserir planos de exemplo
INSERT INTO plans (name, price, duration, description, features, highlight, button_text, badge) VALUES
  (
    'Teste Gratuito',
    0.00,
    '90 dias',
    'Experimente todas as funcionalidades sem compromisso',
    '[
      {"text": "Cadastro de salão", "included": true},
      {"text": "Até 3 profissionais", "included": true},
      {"text": "Agendamentos ilimitados", "included": true},
      {"text": "Chat com clientes", "included": true},
      {"text": "Dashboard básico", "included": true},
      {"text": "Suporte por e-mail", "included": true},
      {"text": "Relatórios avançados", "included": false},
      {"text": "WhatsApp Business", "included": false},
      {"text": "Prioridade no suporte", "included": false}
    ]'::jsonb,
    false,
    'Começar Teste Grátis',
    'Ideal para começar'
  ),
  (
    'Plano Mensal',
    50.00,
    'por mês',
    'Flexibilidade para gerenciar seu negócio mês a mês',
    '[
      {"text": "Cadastro de salão", "included": true},
      {"text": "Profissionais ilimitados", "included": true},
      {"text": "Agendamentos ilimitados", "included": true},
      {"text": "Chat com clientes", "included": true},
      {"text": "Dashboard completo", "included": true},
      {"text": "Relatórios avançados", "included": true},
      {"text": "WhatsApp Business", "included": true},
      {"text": "Suporte prioritário", "included": true},
      {"text": "Sem fidelidade", "included": true}
    ]'::jsonb,
    false,
    'Assinar Mensal',
    'Mais flexível'
  ),
  (
    'Plano Semestral',
    240.00,
    '6 meses',
    'Economia de 20% com pagamento semestral',
    '[
      {"text": "Todos os recursos do Mensal", "included": true},
      {"text": "20% de desconto (R$ 40/mês)", "included": true},
      {"text": "Suporte VIP", "included": true},
      {"text": "Consultoria mensal grátis", "included": true},
      {"text": "Prioridade absoluta", "included": true},
      {"text": "Relatórios personalizados", "included": true}
    ]'::jsonb,
    true,
    'Assinar Semestral',
    'Mais Vendido'
  ),
  (
    'Plano Anual',
    420.00,
    '12 meses',
    'Melhor custo-benefício com 30% de economia',
    '[
      {"text": "Todos os recursos do Mensal", "included": true},
      {"text": "30% de desconto (R$ 35/mês)", "included": true},
      {"text": "Suporte Premium 24/7", "included": true},
      {"text": "Treinamento completo", "included": true},
      {"text": "Personalização avançada", "included": true},
      {"text": "Integração com Instagram", "included": true},
      {"text": "App mobile exclusivo", "included": true},
      {"text": "Gestor de vendas", "included": true}
    ]'::jsonb,
    false,
    'Assinar Anual',
    'Melhor Valor'
  );

-- Inserir agendamentos de exemplo
INSERT INTO appointments (salon_id, client_name, client_email, client_phone, service, date, hour, status, notes) VALUES
  (1, 'Carlos Mendes', 'carlos@email.com', '(71) 98765-4321', 'Corte + Barba', '2025-02-15', '14:30', 'pending', 'Prefere corte degradê'),
  (1, 'Roberto Silva', 'roberto@email.com', '(71) 97654-3210', 'Corte', '2025-02-15', '15:30', 'confirmed', NULL),
  (2, 'Juliana Costa', 'juliana@email.com', '(71) 96543-2109', 'Coloração + Corte', '2025-02-16', '10:00', 'pending', 'Quer loiro platinado'),
  (3, 'Fernanda Lima', 'fernanda@email.com', '(71) 95432-1098', 'Hidratação + Escova', '2025-02-16', '14:00', 'pending', NULL),
  (1, 'Marcos Paulo', 'marcos@email.com', '(71) 94321-0987', 'Barba', '2025-02-17', '16:00', 'pending', NULL),
  (4, 'André Santos', 'andre@email.com', '(71) 93210-9876', 'Corte', '2025-02-17', '11:00', 'cancelled', 'Cancelado pelo cliente'),
  (5, 'Patricia Souza', 'patricia@email.com', '(71) 92109-8765', 'Manicure + Pedicure', '2025-02-18', '15:00', 'pending', NULL),
  (2, 'Camila Rodrigues', 'camila@email.com', '(71) 91098-7654', 'Escova', '2025-02-18', '17:00', 'completed', NULL);

-- Verificar dados inseridos
SELECT 'Salões cadastrados:', COUNT(*) FROM salons;
SELECT 'Planos cadastrados:', COUNT(*) FROM plans;
SELECT 'Agendamentos cadastrados:', COUNT(*) FROM appointments;

-- Exibir resumo
SELECT 
  'Total de salões' as tipo, 
  COUNT(*)::text as quantidade 
FROM salons
UNION ALL
SELECT 
  'Total de planos' as tipo, 
  COUNT(*)::text as quantidade 
FROM plans
UNION ALL
SELECT 
  'Total de agendamentos' as tipo, 
  COUNT(*)::text as quantidade 
FROM appointments
UNION ALL
SELECT 
  'Agendamentos pendentes' as tipo, 
  COUNT(*)::text as quantidade 
FROM appointments 
WHERE status = 'pending';

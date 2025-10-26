-- Elite & Estilo - SQL Schema para Neon PostgreSQL
-- Execute este script no console do Neon ou no SQL Editor

-- Criar tabela de salões
CREATE TABLE IF NOT EXISTS saloes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    descricao TEXT,
    fotos TEXT[], -- Array de URLs das fotos
    horario_funcionamento JSONB, -- JSON com horários
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de serviços
CREATE TABLE IF NOT EXISTS servicos (
    id SERIAL PRIMARY KEY,
    salao_id INTEGER REFERENCES saloes(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao INTEGER, -- duração em minutos
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
    id SERIAL PRIMARY KEY,
    salao_id INTEGER REFERENCES saloes(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(255),
    foto_url TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    salao_id INTEGER REFERENCES saloes(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    data_nascimento DATE,
    foto_url TEXT,
    tipo VARCHAR(20) DEFAULT 'Regular', -- VIP, Regular, Novo
    total_gastos DECIMAL(10,2) DEFAULT 0,
    total_visitas INTEGER DEFAULT 0,
    ultima_visita TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    salao_id INTEGER REFERENCES saloes(id) ON DELETE CASCADE,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    servico_id INTEGER REFERENCES servicos(id) ON DELETE CASCADE,
    funcionario_id INTEGER REFERENCES funcionarios(id) ON DELETE SET NULL,
    data_agendamento TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'agendado', -- agendado, confirmado, concluido, cancelado
    observacoes TEXT,
    valor DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_saloes_email ON saloes(email);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos(data_agendamento);
CREATE INDEX IF NOT EXISTS idx_agendamentos_salao ON agendamentos(salao_id);
CREATE INDEX IF NOT EXISTS idx_clientes_salao ON clientes(salao_id);
CREATE INDEX IF NOT EXISTS idx_servicos_salao ON servicos(salao_id);
CREATE INDEX IF NOT EXISTS idx_funcionarios_salao ON funcionarios(salao_id);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para tabela saloes
CREATE TRIGGER update_saloes_updated_at BEFORE UPDATE ON saloes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo (opcional)
INSERT INTO saloes (nome, email, telefone, endereco, descricao, fotos, horario_funcionamento) VALUES
('Barbearia Elite', 'elite@example.com', '(71) 99999-0001', 'Rua das Flores, 123', 'Barbearia tradicional com mais de 20 anos de experiência', 
 ARRAY['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
 '{"segunda": {"abertura": "08:00", "fechamento": "18:00"}, "terca": {"abertura": "08:00", "fechamento": "18:00"}}'::jsonb)
ON CONFLICT (email) DO NOTHING;

INSERT INTO saloes (nome, email, telefone, endereco, descricao, fotos, horario_funcionamento) VALUES
('Salão Estilo', 'estilo@example.com', '(71) 99999-0002', 'Av. Principal, 456', 'Salão moderno especializado em cortes femininos e masculinos',
 ARRAY['https://example.com/foto3.jpg'],
 '{"segunda": {"abertura": "09:00", "fechamento": "19:00"}, "terca": {"abertura": "09:00", "fechamento": "19:00"}}'::jsonb)
ON CONFLICT (email) DO NOTHING;

-- Inserir serviços de exemplo
INSERT INTO servicos (salao_id, nome, descricao, preco, duracao) VALUES
(1, 'Corte Masculino', 'Corte tradicional masculino', 25.00, 30),
(1, 'Barba', 'Aparar e modelar barba', 20.00, 20),
(1, 'Corte + Barba', 'Combo completo', 40.00, 45),
(2, 'Corte Feminino', 'Corte moderno feminino', 35.00, 45),
(2, 'Escova', 'Escova modeladora', 25.00, 30)
ON CONFLICT DO NOTHING;

-- Verificar se tudo foi criado corretamente
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
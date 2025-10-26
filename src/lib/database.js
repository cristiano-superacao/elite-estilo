import { neon } from '@neondatabase/serverless';

// Configuração da conexão com Neon Database
const sql = neon(process.env.DATABASE_URL || '');

// Função para inicializar o banco de dados
export async function initDatabase() {
  try {
    // Criar tabela de salões
    await sql`
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
      )
    `;

    // Criar tabela de serviços
    await sql`
      CREATE TABLE IF NOT EXISTS servicos (
        id SERIAL PRIMARY KEY,
        salao_id INTEGER REFERENCES saloes(id) ON DELETE CASCADE,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        preco DECIMAL(10,2) NOT NULL,
        duracao INTEGER, -- duração em minutos
        ativo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Criar tabela de funcionários
    await sql`
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
      )
    `;

    // Criar tabela de clientes
    await sql`
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
      )
    `;

    // Criar tabela de agendamentos
    await sql`
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
      )
    `;

    // Criar índices para melhor performance
    await sql`CREATE INDEX IF NOT EXISTS idx_saloes_email ON saloes(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos(data_agendamento)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_clientes_salao ON clientes(salao_id)`;
    
    console.log('Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Funções CRUD para Salões
export async function createSalao(salaoData) {
  try {
    const result = await sql`
      INSERT INTO saloes (nome, email, telefone, endereco, descricao, fotos, horario_funcionamento)
      VALUES (${salaoData.nome}, ${salaoData.email}, ${salaoData.telefone}, 
              ${salaoData.endereco}, ${salaoData.descricao}, 
              ${JSON.stringify(salaoData.fotos || [])}, 
              ${JSON.stringify(salaoData.horario_funcionamento || {})})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating salao:', error);
    throw error;
  }
}

export async function getSaloes() {
  try {
    const result = await sql`SELECT * FROM saloes ORDER BY created_at DESC`;
    return result;
  } catch (error) {
    console.error('Error fetching saloes:', error);
    throw error;
  }
}

export async function getSalaoById(id) {
  try {
    const result = await sql`SELECT * FROM saloes WHERE id = ${id}`;
    return result[0];
  } catch (error) {
    console.error('Error fetching salao:', error);
    throw error;
  }
}

export async function updateSalao(id, salaoData) {
  try {
    const result = await sql`
      UPDATE saloes 
      SET nome = ${salaoData.nome}, 
          telefone = ${salaoData.telefone},
          endereco = ${salaoData.endereco},
          descricao = ${salaoData.descricao},
          fotos = ${JSON.stringify(salaoData.fotos || [])},
          horario_funcionamento = ${JSON.stringify(salaoData.horario_funcionamento || {})},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating salao:', error);
    throw error;
  }
}

// Funções CRUD para Serviços
export async function createServico(servicoData) {
  try {
    const result = await sql`
      INSERT INTO servicos (salao_id, nome, descricao, preco, duracao)
      VALUES (${servicoData.salao_id}, ${servicoData.nome}, ${servicoData.descricao}, 
              ${servicoData.preco}, ${servicoData.duracao})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating servico:', error);
    throw error;
  }
}

export async function getServicosBySalao(salaoId) {
  try {
    const result = await sql`
      SELECT * FROM servicos 
      WHERE salao_id = ${salaoId} AND ativo = true 
      ORDER BY nome
    `;
    return result;
  } catch (error) {
    console.error('Error fetching servicos:', error);
    throw error;
  }
}

// Funções CRUD para Clientes
export async function createCliente(clienteData) {
  try {
    const result = await sql`
      INSERT INTO clientes (salao_id, nome, telefone, email, data_nascimento, tipo)
      VALUES (${clienteData.salao_id}, ${clienteData.nome}, ${clienteData.telefone},
              ${clienteData.email}, ${clienteData.data_nascimento}, ${clienteData.tipo || 'Novo'})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating cliente:', error);
    throw error;
  }
}

export async function getClientesBySalao(salaoId) {
  try {
    const result = await sql`
      SELECT *, 
             CASE 
               WHEN total_gastos > 1000 THEN 'VIP'
               WHEN total_visitas > 5 THEN 'Regular'
               ELSE 'Novo'
             END as tipo_calculado
      FROM clientes 
      WHERE salao_id = ${salaoId}
      ORDER BY total_gastos DESC, total_visitas DESC
    `;
    return result;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }
}

// Funções CRUD para Agendamentos
export async function createAgendamento(agendamentoData) {
  try {
    const result = await sql`
      INSERT INTO agendamentos (salao_id, cliente_id, servico_id, funcionario_id, 
                               data_agendamento, observacoes, valor)
      VALUES (${agendamentoData.salao_id}, ${agendamentoData.cliente_id}, 
              ${agendamentoData.servico_id}, ${agendamentoData.funcionario_id},
              ${agendamentoData.data_agendamento}, ${agendamentoData.observacoes},
              ${agendamentoData.valor})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating agendamento:', error);
    throw error;
  }
}

export async function getAgendamentosBySalao(salaoId, data = null) {
  try {
    let query = sql`
      SELECT a.*, c.nome as cliente_nome, c.telefone as cliente_telefone,
             s.nome as servico_nome, f.nome as funcionario_nome
      FROM agendamentos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN servicos s ON a.servico_id = s.id  
      LEFT JOIN funcionarios f ON a.funcionario_id = f.id
      WHERE a.salao_id = ${salaoId}
    `;
    
    if (data) {
      query = sql`
        SELECT a.*, c.nome as cliente_nome, c.telefone as cliente_telefone,
               s.nome as servico_nome, f.nome as funcionario_nome
        FROM agendamentos a
        LEFT JOIN clientes c ON a.cliente_id = c.id
        LEFT JOIN servicos s ON a.servico_id = s.id  
        LEFT JOIN funcionarios f ON a.funcionario_id = f.id
        WHERE a.salao_id = ${salaoId} 
        AND DATE(a.data_agendamento) = ${data}
        ORDER BY a.data_agendamento
      `;
    } else {
      query = sql`
        SELECT a.*, c.nome as cliente_nome, c.telefone as cliente_telefone,
               s.nome as servico_nome, f.nome as funcionario_nome
        FROM agendamentos a
        LEFT JOIN clientes c ON a.cliente_id = c.id
        LEFT JOIN servicos s ON a.servico_id = s.id  
        LEFT JOIN funcionarios f ON a.funcionario_id = f.id
        WHERE a.salao_id = ${salaoId}
        ORDER BY a.data_agendamento DESC
      `;
    }
    
    const result = await query;
    return result;
  } catch (error) {
    console.error('Error fetching agendamentos:', error);
    throw error;
  }
}

// Função para migrar dados do localStorage
export async function migrateFromLocalStorage() {
  try {
    // Esta função será chamada no frontend para migrar dados existentes
    console.log('Migration function available for frontend use');
  } catch (error) {
    console.error('Error in migration:', error);
    throw error;
  }
}
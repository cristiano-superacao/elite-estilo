import { useState, useEffect } from 'react';
import {
  initDatabase,
  createSalao,
  getSaloes,
  getSalaoById,
  updateSalao,
  createServico,
  getServicosBySalao,
  createCliente,
  getClientesBySalao,
  createAgendamento,
  getAgendamentosBySalao
} from '../lib/database';

export function useDatabase() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      setIsLoading(true);
      const success = await initDatabase();
      setIsConnected(success);
      if (!success) {
        setError('Falha ao conectar com o banco de dados');
      }
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Funções de Salão
  const salaoOperations = {
    create: async (salaoData) => {
      try {
        return await createSalao(salaoData);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    getAll: async () => {
      try {
        return await getSaloes();
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    getById: async (id) => {
      try {
        return await getSalaoById(id);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    update: async (id, salaoData) => {
      try {
        return await updateSalao(id, salaoData);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  // Funções de Serviço
  const servicoOperations = {
    create: async (servicoData) => {
      try {
        return await createServico(servicoData);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    getBySalao: async (salaoId) => {
      try {
        return await getServicosBySalao(salaoId);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  // Funções de Cliente
  const clienteOperations = {
    create: async (clienteData) => {
      try {
        return await createCliente(clienteData);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    getBySalao: async (salaoId) => {
      try {
        return await getClientesBySalao(salaoId);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  // Funções de Agendamento
  const agendamentoOperations = {
    create: async (agendamentoData) => {
      try {
        return await createAgendamento(agendamentoData);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    getBySalao: async (salaoId, data = null) => {
      try {
        return await getAgendamentosBySalao(salaoId, data);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  // Função para migrar dados do localStorage para o banco
  const migrateLocalStorageData = async () => {
    try {
      setIsLoading(true);
      
      // Migrar salões
      const saloesLocais = JSON.parse(localStorage.getItem('saloes') || '[]');
      const saloesMigrados = [];
      
      for (const salao of saloesLocais) {
        try {
          const salaoMigrado = await createSalao({
            nome: salao.nome,
            email: salao.email,
            telefone: salao.telefone,
            endereco: salao.endereco,
            descricao: salao.descricao,
            fotos: salao.fotos || [],
            horario_funcionamento: salao.horarioFuncionamento || {}
          });
          saloesMigrados.push(salaoMigrado);
        } catch (err) {
          console.warn(`Erro ao migrar salão ${salao.nome}:`, err);
        }
      }

      // Migrar clientes (se existirem)
      const clientesLocais = JSON.parse(localStorage.getItem('clientes') || '[]');
      for (const cliente of clientesLocais) {
        try {
          // Encontrar salão correspondente
          const salaoCorrespondente = saloesMigrados.find(s => s.email === cliente.salaoEmail);
          if (salaoCorrespondente) {
            await createCliente({
              salao_id: salaoCorrespondente.id,
              nome: cliente.nome,
              telefone: cliente.telefone,
              email: cliente.email,
              tipo: cliente.tipo || 'Novo'
            });
          }
        } catch (err) {
          console.warn(`Erro ao migrar cliente ${cliente.nome}:`, err);
        }
      }

      console.log(`Migração concluída: ${saloesMigrados.length} salões migrados`);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isConnected,
    isLoading,
    error,
    salao: salaoOperations,
    servico: servicoOperations,
    cliente: clienteOperations,
    agendamento: agendamentoOperations,
    migrateLocalStorageData,
    initializeDatabase
  };
}
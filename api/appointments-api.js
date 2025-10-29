// API de Agendamentos - Criar, consultar e cancelar
import pool from './db.js';

export const appointmentRoutes = (app) => {
  // POST /api/appointments - Criar novo agendamento
  app.post('/api/appointments', async (req, res) => {
    try {
      const { 
        salon_id, 
        client_name, 
        client_email, 
        client_phone, 
        service, 
        date, 
        hour,
        notes 
      } = req.body;

      // Validação básica
      if (!salon_id || !client_name || !service || !date || !hour) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios faltando',
          required: ['salon_id', 'client_name', 'service', 'date', 'hour']
        });
      }

      // Verificar se o salão existe
      const salonCheck = await pool.query('SELECT id FROM salons WHERE id = $1', [salon_id]);
      if (salonCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Salão não encontrado' });
      }

      // Verificar disponibilidade (não permitir agendamentos duplicados no mesmo horário)
      const availabilityCheck = await pool.query(
        'SELECT id FROM appointments WHERE salon_id = $1 AND date = $2 AND hour = $3 AND status != $4',
        [salon_id, date, hour, 'cancelled']
      );

      if (availabilityCheck.rows.length > 0) {
        return res.status(409).json({ 
          error: 'Horário não disponível',
          message: 'Já existe um agendamento para este horário'
        });
      }

      // Criar agendamento
      const result = await pool.query(
        `INSERT INTO appointments 
         (salon_id, client_name, client_email, client_phone, service, date, hour, notes, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
        [salon_id, client_name, client_email, client_phone, service, date, hour, notes, 'pending']
      );

      res.status(201).json({
        message: 'Agendamento criado com sucesso',
        data: result.rows[0]
      });
    } catch (err) {
      console.error('Error creating appointment:', err);
      res.status(500).json({ error: 'Erro ao criar agendamento', message: err.message });
    }
  });

  // GET /api/appointments - Consultar agendamentos
  app.get('/api/appointments', async (req, res) => {
    try {
      const { salon_id, client_email, status, date, page = 1, limit = 20 } = req.query;
      
      let query = `
        SELECT a.*, s.name as salon_name, s.address as salon_address 
        FROM appointments a
        LEFT JOIN salons s ON a.salon_id = s.id
        WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;

      // Filtro por salão
      if (salon_id) {
        query += ` AND a.salon_id = $${paramIndex}`;
        params.push(salon_id);
        paramIndex++;
      }

      // Filtro por email do cliente
      if (client_email) {
        query += ` AND a.client_email = $${paramIndex}`;
        params.push(client_email);
        paramIndex++;
      }

      // Filtro por status
      if (status) {
        query += ` AND a.status = $${paramIndex}`;
        params.push(status);
        paramIndex++;
      }

      // Filtro por data
      if (date) {
        query += ` AND a.date = $${paramIndex}`;
        params.push(date);
        paramIndex++;
      }

      // Ordenar por data e hora
      query += ' ORDER BY a.date DESC, a.hour DESC';

      // Paginação
      const offset = (page - 1) * limit;
      query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      // Contar total
      let countQuery = 'SELECT COUNT(*) FROM appointments WHERE 1=1';
      const countParams = [];
      let countIndex = 1;

      if (salon_id) {
        countQuery += ` AND salon_id = $${countIndex}`;
        countParams.push(salon_id);
        countIndex++;
      }
      if (client_email) {
        countQuery += ` AND client_email = $${countIndex}`;
        countParams.push(client_email);
        countIndex++;
      }
      if (status) {
        countQuery += ` AND status = $${countIndex}`;
        countParams.push(status);
        countIndex++;
      }
      if (date) {
        countQuery += ` AND date = $${countIndex}`;
        countParams.push(date);
      }

      const countResult = await pool.query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count);

      res.json({
        data: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Erro ao buscar agendamentos', message: err.message });
    }
  });

  // GET /api/appointments/:id - Detalhes de um agendamento específico
  app.get('/api/appointments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT a.*, s.name as salon_name, s.address as salon_address, s.phone as salon_phone
         FROM appointments a
         LEFT JOIN salons s ON a.salon_id = s.id
         WHERE a.id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching appointment:', err);
      res.status(500).json({ error: 'Erro ao buscar agendamento', message: err.message });
    }
  });

  // DELETE /api/appointments/:id - Cancelar agendamento
  app.delete('/api/appointments/:id', async (req, res) => {
    try {
      const { id } = req.params;

      // Verificar se o agendamento existe
      const checkResult = await pool.query(
        'SELECT * FROM appointments WHERE id = $1',
        [id]
      );

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }

      const appointment = checkResult.rows[0];

      // Verificar se já está cancelado
      if (appointment.status === 'cancelled') {
        return res.status(400).json({ 
          error: 'Agendamento já está cancelado' 
        });
      }

      // Atualizar status para cancelado ao invés de deletar
      const result = await pool.query(
        `UPDATE appointments 
         SET status = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *`,
        ['cancelled', id]
      );

      res.json({
        message: 'Agendamento cancelado com sucesso',
        data: result.rows[0]
      });
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      res.status(500).json({ error: 'Erro ao cancelar agendamento', message: err.message });
    }
  });
};

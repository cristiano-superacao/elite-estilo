// API de Planos - Lista e detalhes
import pool from './db.js';

export const planRoutes = (app) => {
  // GET /api/plans - Lista todos os planos
  app.get('/api/plans', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM plans ORDER BY price ASC'
      );

      res.json({
        data: result.rows,
        total: result.rows.length
      });
    } catch (err) {
      console.error('Error fetching plans:', err);
      res.status(500).json({ error: 'Erro ao buscar planos', message: err.message });
    }
  });

  // GET /api/plans/:id - Detalhes de um plano específico
  app.get('/api/plans/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM plans WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Plano não encontrado' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching plan:', err);
      res.status(500).json({ error: 'Erro ao buscar plano', message: err.message });
    }
  });
};

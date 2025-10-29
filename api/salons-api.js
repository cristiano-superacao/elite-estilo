// API de Salões - Catálogo com busca, filtros e paginação
import pool from './db.js';

export const salonRoutes = (app) => {
  // GET /api/salons/search - Busca com múltiplos critérios (deve vir antes de /api/salons/:id)
  app.get('/api/salons/search', async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório' });
      }

      const result = await pool.query(
        `SELECT * FROM salons 
         WHERE name ILIKE $1 
         OR city ILIKE $1 
         OR $2 = ANY(services)
         OR description ILIKE $1
         ORDER BY rating DESC`,
        [`%${q}%`, q]
      );

      res.json({
        query: q,
        results: result.rows.length,
        data: result.rows
      });
    } catch (err) {
      console.error('Error searching salons:', err);
      res.status(500).json({ error: 'Erro na busca', message: err.message });
    }
  });

  // GET /api/salons - Lista todos os salões com paginação
  app.get('/api/salons', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Filtros opcionais
      const { city, service, rating, sort } = req.query;
      
      let query = 'SELECT * FROM salons WHERE 1=1';
      const params = [];
      let paramIndex = 1;

      // Filtro por cidade
      if (city) {
        query += ` AND city ILIKE $${paramIndex}`;
        params.push(`%${city}%`);
        paramIndex++;
      }

      // Filtro por serviço
      if (service) {
        query += ` AND $${paramIndex} = ANY(services)`;
        params.push(service);
        paramIndex++;
      }

      // Filtro por avaliação mínima
      if (rating) {
        query += ` AND rating >= $${paramIndex}`;
        params.push(parseFloat(rating));
        paramIndex++;
      }

      // Ordenação
      if (sort === 'rating') {
        query += ' ORDER BY rating DESC';
      } else if (sort === 'reviews') {
        query += ' ORDER BY reviews DESC';
      } else if (sort === 'name') {
        query += ' ORDER BY name ASC';
      } else {
        query += ' ORDER BY id DESC';
      }

      // Adicionar paginação
      query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      // Contar total para paginação
      let countQuery = 'SELECT COUNT(*) FROM salons WHERE 1=1';
      const countParams = [];
      let countParamIndex = 1;

      if (city) {
        countQuery += ` AND city ILIKE $${countParamIndex}`;
        countParams.push(`%${city}%`);
        countParamIndex++;
      }
      if (service) {
        countQuery += ` AND $${countParamIndex} = ANY(services)`;
        countParams.push(service);
        countParamIndex++;
      }
      if (rating) {
        countQuery += ` AND rating >= $${countParamIndex}`;
        countParams.push(parseFloat(rating));
      }

      const countResult = await pool.query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count);

      res.json({
        data: result.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      console.error('Error fetching salons:', err);
      res.status(500).json({ error: 'Erro ao buscar salões', message: err.message });
    }
  });

  // GET /api/salons/:id - Detalhes de um salão específico
  app.get('/api/salons/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM salons WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Salão não encontrado' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching salon:', err);
      res.status(500).json({ error: 'Erro ao buscar salão', message: err.message });
    }
  });
};

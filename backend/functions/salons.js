// API Node.js para Netlify Functions
import express from 'express';
import pool from './db.js';
const app = express();
app.use(express.json());

// Listar salões
app.get('/salons', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM salons');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar salão por nome/cidade/serviço
app.get('/salons/search', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM salons WHERE name ILIKE $1 OR city ILIKE $1 OR $1 = ANY(services)`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agendar serviço
app.post('/appointments', async (req, res) => {
  const { salon_id, client_name, service, date, hour } = req.body;
  try {
    await pool.query(
      'INSERT INTO appointments (salon_id, client_name, service, date, hour) VALUES ($1, $2, $3, $4, $5)',
      [salon_id, client_name, service, date, hour]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;

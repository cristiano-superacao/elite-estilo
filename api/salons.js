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
  const { salon_id, client_name, client_phone, client_email, service, date, hour, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO appointments (salon_id, client_name, client_phone, client_email, service, date, hour, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [salon_id, client_name, client_phone, client_email, service, date, hour, notes]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar promoções ativas
app.get('/promotions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, s.name as salon_name, s.image as salon_image, s.whatsapp as salon_whatsapp
      FROM promotions p
      JOIN salons s ON p.salon_id = s.id
      WHERE p.active = true AND (p.valid_until IS NULL OR p.valid_until >= CURRENT_DATE)
      ORDER BY p.popular DESC, p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;

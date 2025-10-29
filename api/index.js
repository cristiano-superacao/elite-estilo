// API Principal - Consolidação de todas as rotas
import express from 'express';
import { salonRoutes } from './salons-api.js';
import { planRoutes } from './plans-api.js';
import { appointmentRoutes } from './appointments-api.js';

const app = express();

// Middleware para parse de JSON
app.use(express.json());

// CORS para desenvolvimento
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Elite & Estilo API'
  });
});

// Registrar rotas
salonRoutes(app);
planRoutes(app);
appointmentRoutes(app);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message 
  });
});

export default app;

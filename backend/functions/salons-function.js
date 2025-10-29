// Netlify Function wrapper para Express
import app from './salons.js';
import serverless from 'serverless-http';

export const handler = serverless(app);
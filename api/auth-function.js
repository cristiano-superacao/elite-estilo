// Netlify Function wrapper for authentication API
import serverless from 'serverless-http';
import authApp from './auth.js';

export const handler = serverless(authApp);

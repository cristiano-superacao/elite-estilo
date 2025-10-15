// src/lib/db.js
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: import.meta.env.VITE_NEON_DATABASE_URL || process.env.NEON_DATABASE_URL,
});

export default pool;
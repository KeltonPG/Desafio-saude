// backend/db/pool.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

;
dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// --- Adições de Boas Práticas e Depuração ---

pool.on('connect', () => {
  console.log('PostgreSQL: Conexão estabelecida com sucesso!');
});


pool.on('error', (err) => {
  console.error('PostgreSQL: Erro inesperado no pool do banco de dados:', err);
  
});


export default pool;
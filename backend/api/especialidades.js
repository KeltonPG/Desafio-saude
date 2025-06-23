// backend/api/especialidades.js
import pool from '../db/pool.js';

export default async function handler(req, res) {
  try {
    // ESTA QUERY DEVE SER 'FROM especialidades'
    const { rows } = await pool.query('SELECT id, nome FROM especialidades ORDER BY nome');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error); // O console.error deve ser específico para especialidades
    res.status(500).json({ erro: error.message });
  }
}
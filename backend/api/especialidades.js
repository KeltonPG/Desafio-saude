import pool from '../db/pool.js';

export default async function handler(req, res) {
  try {
    const { rows } = await pool.query('SELECT id, nome FROM servicos ORDER BY nome');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    res.status(500).json({ erro: error.message });
  }
}

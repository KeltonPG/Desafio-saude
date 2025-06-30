// backend/api/tipos.js
import pool from '../db/pool.js';

export default async function handler(req, res) {
  try {
    // ESTA QUERY DEVE SER 'FROM categorias'
    const { rows } = await pool.query('SELECT id, nome FROM categorias ORDER BY nome');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar tipos de unidade:', error); // O console.error deve ser específico para tipos/categorias
    res.status(500).json({ erro: error.message });
  }
}
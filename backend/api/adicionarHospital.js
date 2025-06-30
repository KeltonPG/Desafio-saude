// backend/api/adicionarHospital.js
import pool from '../db/pool.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  const { nome, endereco, telefone, servicos, google_maps_url } = req.body;
  const administrador_id = req.admin?.id;

  if (!nome || !endereco || !administrador_id) {
    return res.status(400).json({ erro: 'Dados obrigatórios faltando' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO estabelecimentos (nome, endereco, telefone, servicos, google_maps_url, administrador_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nome, endereco, telefone, servicos, google_maps_url, administrador_id]
    );
    return res.status(201).json({ mensagem: 'Hospital cadastrado com sucesso', hospital: rows[0] });
  } catch (error) {
    console.error('Erro ao adicionar hospital:', error);
    return res.status(500).json({ erro: 'Erro ao cadastrar hospital' });
  }
}

// backend/api/login.js
import pool from '../db/pool.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  const { usuario, senha } = req.body;
  if (!usuario || !senha) return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });

  try {
    const { rows } = await pool.query(
      'SELECT id, nome, email, senha_hash FROM administradores WHERE nome = $1 OR email = $1 LIMIT 1',
      [usuario]
    );
    if (rows.length === 0) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });

    const admin = rows[0];
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    if (senhaHash !== admin.senha_hash) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });

    // Gera o token JWT com o id do admin
    const token = jwt.sign(
      { id: admin.id, nome: admin.nome, email: admin.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: { id: admin.id, nome: admin.nome, email: admin.email },
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

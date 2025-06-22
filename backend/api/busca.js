import pool from '../db/pool.js';

export default async function handler(req, res) {
  const { lat, lng, raio = 5000, tipo, especialidade } = req.query;

  try {
    let query = `
      SELECT 
        u.nome,
        u.endereco,
        u.telefone,
        ST_X(u.coordenadas) as lng,
        ST_Y(u.coordenadas) as lat,
        ST_Distance(u.coordenadas::GEOGRAPHY, ST_MakePoint($1, $2)::GEOGRAPHY) as distancia
      FROM unidades_saude u
    `;

    const params = [lng, lat, raio];
    let conditions = [];

    // Adiciona JOIN se houver especialidade
    if (especialidade) {
      query += ` JOIN unidade_servico us ON u.id = us.unidade_id`;
    }

    // Condição principal (geográfica)
    conditions.push(`ST_DWithin(u.coordenadas::GEOGRAPHY, ST_MakePoint($1, $2)::GEOGRAPHY, $3)`);

    // Adiciona filtros opcionais
    if (tipo) {
      conditions.push(`u.tipo_id = $${params.length + 1}`);
      params.push(tipo);
    }
    if (especialidade) {
      conditions.push(`us.servico_id = $${params.length + 1}`);
      params.push(especialidade);
    }

    // Combina condições e finaliza query
    query += ` WHERE ${conditions.join(' AND ')}`;
    query += ` ORDER BY distancia LIMIT 20`;

    const { rows } = await pool.query(query, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({ erro: 'Falha na busca' });
  }
}

// backend/api/busca.js
import pool from '../db/pool.js';

export default async function handler(req, res) {
  const { lat, lng, raio = 5000, tipo, especialidade } = req.query;

  // Validação inicial e conversão para números
  if (!lat || !lng) {
    return res.status(400).json({ erro: 'Latitude e longitude são obrigatórias para a busca geográfica.' });
  }

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  const parsedRaio = parseInt(raio, 10);

  if (isNaN(parsedLat) || isNaN(parsedLng) || isNaN(parsedRaio)) {
    return res.status(400).json({ erro: 'Latitude, longitude e raio devem ser números válidos.' });
  }

  try {
    let query = `
      SELECT
        e.id,
        e.nome,
        e.endereco,
        e.telefone,
        e.latitude,  -- Seleciona as colunas de latitude e longitude
        e.longitude,
        ST_Distance(
            ST_MakePoint(e.longitude, e.latitude)::GEOGRAPHY,  -- Cria ponto geográfico do estabelecimento
            ST_MakePoint($1, $2)::GEOGRAPHY                   -- Cria ponto geográfico da busca
        ) as distancia
      FROM estabelecimentos e
    `;

    // Parâmetros para a query. Começa com lng, lat, raio para a condição de distância.
    const params = [parsedLng, parsedLat, parsedRaio];
    let conditions = [];
    let paramIndex = params.length + 1; // Próximo índice de parâmetro disponível

    // Adiciona JOIN para CATEGORIAS (antigo tipo_unidade)
    if (tipo) {
      query += ` JOIN categorias c ON e.categoria_id = c.id`;
      conditions.push(`c.id = $${paramIndex}`); // Assumindo que o frontend envia o ID da categoria
      params.push(tipo);
      paramIndex++;
    }

    // Adiciona JOIN para ESPECIALIDADES (tabela intermediária e tabela especialidades)
    if (especialidade) {
      query += `
        JOIN estabelecimentos_especialidades ee ON e.id = ee.estabelecimento_id
        JOIN especialidades s ON ee.especialidade_id = s.id
      `;
      conditions.push(`s.id = $${paramIndex}`); // Assumindo que o frontend envia o ID da especialidade
      params.push(especialidade);
      paramIndex++;
    }

    // Condição principal (geográfica)
    // ST_DWithin também precisa criar os pontos on the fly
    conditions.push(`ST_DWithin(
        ST_MakePoint(e.longitude, e.latitude)::GEOGRAPHY,
        ST_MakePoint($1, $2)::GEOGRAPHY,
        $3
    )`);

    // Combina condições e finaliza query
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ` ORDER BY distancia LIMIT 20`;

    const { rows } = await pool.query(query, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({ erro: 'Falha na busca' });
  }
}
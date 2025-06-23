import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { endereco } = req.query;
  if (!endereco) return res.status(400).json({ erro: 'Endereço obrigatório' });

  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ erro: errorData.error_message || 'Erro na API do Google' });
    }

    const data = await response.json();
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      res.status(200).json({ lat: location.lat, lng: location.lng });
    } else {
      res.status(500).json({ erro: data.error_message || 'Endereço não encontrado' });
    }

  } catch (error) {
    console.error('Erro na geolocalização:', error);
    res.status(500).json({ erro: 'Falha interna no servidor' });
  }
}

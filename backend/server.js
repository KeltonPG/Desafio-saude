// backend/server.js
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do .env da pasta backend

import express from 'express';
import cors from 'cors';

// Importa as funções da API. Ajuste os caminhos se necessário.
// Certifique-se de que cada arquivo .js em api/ exporta uma função default
// que aceita (req, res).
import buscaHandler from './api/busca.js';
import especialidadesHandler from './api/especialidades.js';
import geocodificarHandler from './api/geocodificar.js';
import tiposHandler from './api/tipos.js';

const app = express();
const PORT = process.env.PORT || 3001; // Use a porta definida no .env ou 3001

// Middlewares
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de URL-encoded

// Definir as rotas da API
// As funções em api/*.js provavelmente assumem o req e res diretamente.
// Se eles retornam uma função, pode ser (req, res) => handler(req, res).
// Se eles são a própria função, é só handler.
app.get('/api/busca', buscaHandler);
app.get('/api/especialidades', especialidadesHandler);
app.get('/api/geocodificar', geocodificarHandler);
app.get('/api/tipos', tiposHandler);

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Servidor backend da Saúde Próxima está ativo!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
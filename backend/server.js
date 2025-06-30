// backend/server.js
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do .env da pasta backend

import express from 'express';
import cors from 'cors';

import buscaHandler from './api/busca.js';
import especialidadesHandler from './api/especialidades.js';
import geocodificarHandler from './api/geocodificar.js';
import tiposHandler from './api/tipos.js';
import loginHandler from './api/login.js';
import { autenticarAdmin } from './api/authMiddleware.js';
import adicionarHospitalHandler from './api/adicionarHospital.js';



const app = express();
const PORT = process.env.PORT || 3001; // Use a porta definida no .env ou 3001

// Middlewares
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de URL-encoded

app.post('/api/login', loginHandler);

app.post('/api/hospitais', autenticarAdmin, adicionarHospitalHandler);


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
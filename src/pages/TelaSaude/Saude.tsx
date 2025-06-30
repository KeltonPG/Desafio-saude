import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cabecalho } from '../../components/Cabecalho/Cabecalho';
import './TelaSaude.scss';

import mapaPin2 from '../../assets/mapa-pin2.png';
import vacina from '../../assets/vacina.svg';
import doutora from '../../assets/doutora.svg';
import exame from '../../assets/emergencia.svg';
import emergencia from '../../assets/emergencia.svg';
import vacinaAplicada from '../../assets/vacina_aplicada.png';
import check from '../../assets/check.svg';
import Jogo from '../../assets/jogo.png';


export default function HomePage() {
  const navigate = useNavigate();
  const noticias = [
    {
      titulo: 'Avanço na cobertura vacinal infantil',
      texto: 'O estado aumentou a cobertura vacinal em 12 das 16 vacinas do PNI. Confira as unidades com doses disponíveis.',
      imagem: vacinaAplicada,
      link: null,
    },
    {
      titulo: 'Experimente o nosso jogo e aprenda brincando',
      texto: 'Este jogo foi desenvolvido para conscientizar, de forma divertida, sobre a importância de marcar e não faltar às consultas médicas. Comparecer às consultas ajuda no diagnóstico precoce, no acompanhamento da saúde e na melhoria do atendimento para todos',
      imagem: Jogo,
      link: 'https://joao104.github.io/jogo-rota-de-vida/',
    },
  ];

  const [noticiaAtual, setNoticiaAtual] = useState(0);
  const proximaNoticia = () => setNoticiaAtual((noticiaAtual + 1) % noticias.length);
  const noticiaAnterior = () => setNoticiaAtual((noticiaAtual - 1 + noticias.length) % noticias.length);

  return (
    <div className="homepage-container">
      <Cabecalho mostrarLogo mostrarMenu mostrarBotaoVoltar={false} />

      {/* HERO */}
      <section className="hero">
        <div className="textos">
          <h1>ClíniPerto</h1>
          <p>Encontre hospitais, clínicas e serviços de saúde próximos de você.</p>
          <button
            onClick={() => {
              navigate('/busca');
            }}
          >
            Buscar agora
          </button>
        </div>
        <img src={mapaPin2} alt="Mapa com marcador" className="mapa-img" />
      </section>

      {/* COMO FUNCIONA */}
      <section className="como-funciona">
        <div className="passo-card">
          <span>
            <img src={check} alt="Check" />
          </span>
          <p>Digite seu endereço ou use sua localização</p>
        </div>
        <div className="passo-card">
          <span>
          <img src={check} alt="Check" />
          </span>
          <p>Selecione especialidade ou tipo de unidade</p>
        </div>
        <div className="passo-card">
          <span>
          <img src={check} alt="Check" />
          </span>
          <p>Veja as unidades mais próximas</p>
        </div>
      </section>

      {/* SERVIÇOS POPULARES */}
      <section className="servicos-populares">
        <h2>Serviços Populares</h2>
        <div className="cards">
          <div className="card">
            <img src={vacina} alt="Imunização" />
            <p>Imunização</p>
            <Link to="/busca" className="btn-unidades">Ver unidades</Link>
          </div>
          <div className="card">
            <img src={doutora} alt="Consultas" />
            <p>Consultas</p>
            <Link to="/busca" className="btn-unidades">Ver unidades</Link>
          </div>
          <div className="card">
            <img src={exame} alt="Exames" />
            <p>Exames</p>
            <Link to="/busca" className="btn-unidades">Ver unidades</Link>
          </div>
          <div className="card">
            <img src={emergencia} alt="Urgência" />
            <p>Urgência</p>
            <Link to="/busca" className="btn-unidades">Ver unidades</Link>
          </div>
        </div>
      </section>

      {/* CARROSSEL DE NOTÍCIAS */}
      <section className="noticias">
        <h2>Últimas Notícias</h2>
        <div className="carrossel">
          <div className="seta-container esquerda">
            <button className="seta" onClick={noticiaAnterior}>&lt;</button>
          </div>
          <div className="noticia-carrossel">
            {noticias[noticiaAtual].link ? (
              <a href={noticias[noticiaAtual].link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={noticias[noticiaAtual].imagem} alt={noticias[noticiaAtual].titulo} />
              </a>
            ) : (
              <img src={noticias[noticiaAtual].imagem} alt={noticias[noticiaAtual].titulo} />
            )}
            <div className="texto">
              <h3>{noticias[noticiaAtual].titulo}</h3>
              <p>{noticias[noticiaAtual].texto}</p>
              
            </div>
          </div>
          <div className="seta-container direita">
            <button className="seta" onClick={proximaNoticia}>&gt;</button>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="rodape">
        <div className="logo">© 2025 Grupo de Desenvolvimento • Plataforma de Apoio à Saúde</div>
        <div className="links">
          <a href="/sobre">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
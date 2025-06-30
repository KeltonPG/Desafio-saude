import { useRef } from 'react';
import { Cabecalho } from '../../components/Cabecalho/Cabecalho';
import './Equipe.scss';

// ---------------------- Tipos auxiliares ----------------------
type Trilha = 'Front-End' | 'Back-End' | 'UX' | 'Jogos' | 'Dados';

interface Membro {
  id: string;
  nome: string;
  trilha: Trilha;
  funcao: string;
  avatar: string;
  links: {
    tipo: 'linkedin' | 'github' | 'email' | 'phone';
    url: string;
  }[];
}

// ---------------------- Dados dummy ---------------------------
const membros: Membro[] = [
  { id: '1', nome: 'Alanna Sophia', trilha: 'Front-End', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [{ tipo: 'email', url: 'mailto:alannasophia2730@gmail.com' }] },
  { id: '2', nome: 'Geovanna Costa', trilha: 'Front-End', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [{ tipo: 'email', url: 'mailto:geogabby18@gmail.com' }] },
  { id: '3', nome: 'Felipe Gomes', trilha: 'Back-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/felipe-gomes-559334204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { tipo: 'github', url: 'https://github.com/Felgosito' }
  ] },
  { id: '4', nome: 'Hévila Nunes', trilha: 'Dados', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'email', url: 'mailto:hlinharesnunes@gmail.com' },
    { tipo: 'phone', url: 'tel:+5598991028551' },
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/hévila-maria-linhares-nunes-979388346' }
  ] },
  { id: '5', nome: 'Janilson Lopes', trilha: 'Dados', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:janilsonbraga60@gmail.com' }
  ] },
  { id: '6', nome: 'Hirislayne Batista', trilha: 'Dados', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/hirislayne-batista/' },
    { tipo: 'phone', url: 'tel:+5598986006343' }
  ] },
  { id: '7', nome: 'Isabel Sousa', trilha: 'Dados', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'email', url: 'mailto:Isabelcsousa345@gmail.com' },
    { tipo: 'phone', url: 'tel:+5598992291048' }
  ] },
  { id: '8', nome: 'Kelton Kauã', trilha: 'Front-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [] },
  { id: '9', nome: 'Yan', trilha: 'UX', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [] },
  { id: '10', nome: 'João', trilha: 'Jogos', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [] },
  { id: '11', nome: 'Mateus Dutra Vale', trilha: 'Back-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:mateus.dutra.vale.dv@gmail.com' }
  ] },
];

// Função auxiliar para escolher avatar fake
function getFakeAvatar(nome: string) {
  const nomesFemininos = ['Carolina', 'Gabriela', 'Geovanna', 'Alanna', 'Hirislayne', 'Isabel', 'Hévila'];
  return nomesFemininos.some(n => nome.toLowerCase().includes(n.toLowerCase()))
    ? '/src/assets/contatos/avatar-female.svg'
    : '/src/assets/contatos/avatar-male.svg';
}

export default function Equipe() {
  // refs para scroll horizontal por trilha
  const containerRefs: Record<Trilha, React.RefObject<HTMLDivElement | null>> = {
    'Front-End': useRef<HTMLDivElement>(null),
    'Back-End': useRef<HTMLDivElement>(null),
    'UX': useRef<HTMLDivElement>(null),
    'Jogos': useRef<HTMLDivElement>(null),
    'Dados': useRef<HTMLDivElement>(null),
  };

  const trilhas: Trilha[] = Array.from(new Set(membros.map((m) => m.trilha))) as Trilha[];

  const scroll = (trilha: Trilha, dir: 'left' | 'right') => {
    const el = containerRefs[trilha].current;
    if (!el) return;
    const scrollAmt = 250;
    el.scrollBy({ left: dir === 'left' ? -scrollAmt : scrollAmt, behavior: 'smooth' });
  };

  return (
    <div className="equipe-wrapper">
      <Cabecalho mostrarLogo mostrarMenu mostrarBotaoVoltar={true} mostrarBotaoBusca={false}  />

      <main className="equipe-main">
        <h1>Equipe do projeto</h1>
        <p className="intro">
          Abaixo estão os membros que colaboraram para a resolução do problema proposto através deste projeto.
        </p>

        {trilhas.map((trilha) => (
          <section key={trilha} className="trilha-bloco">
            <div className="trilha-topo">
              <h2>{trilha}</h2>
              <div className="controles">
                <button onClick={() => scroll(trilha, 'left')}>&lt;</button>
                <button onClick={() => scroll(trilha, 'right')}>&gt;</button>
              </div>
            </div>

            <div className="cards-container" ref={containerRefs[trilha]}>
              {membros
                .filter((m) => m.trilha === trilha)
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((m) => (
                  <div key={m.id} className="card-equipe">
                    <img src={getFakeAvatar(m.nome)} alt="avatar" />
                    <h3>{m.nome}</h3>
                    <div className="icones">
                      {m.links.map((l, idx) => (
                        <a key={idx} href={l.url} target="_blank" rel="noreferrer" className={l.tipo} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* CTA rápido */}
        <section className="contato-cta">
          <h2>Entre em contato</h2>
          <p>
            Envie um e‑mail para <a href="mailto:contato@cliniperto.com">contato@cliniperto.com</a> ou fale com a gente
            pelo <a href="https://www.linkedin.com">LinkedIn</a>.
          </p>
        </section>

        {/* Formulário de contato */}
        <form className="contato-form">
          <input type="text" name="nome" placeholder="Nome" required />
          <input type="text" name="contato" placeholder="Contato" required />
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
}

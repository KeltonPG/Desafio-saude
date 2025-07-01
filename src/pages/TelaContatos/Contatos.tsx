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

// ---------------------- Dados ---------------------------
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
  { id: '8', nome: 'Kelton Kauã', trilha: 'Front-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'github', url: 'https://github.com/KeltonPG' },
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/kelton-santos-86b196367/' }
  ] },
  { id: '9', nome: 'Verônica Generosa Silva dos Santos Magalhães', trilha: 'Front-End', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [{ tipo: 'email', url: 'mailto:veronica.generosa13@gmail.com' }] },
  { id: '10', nome: 'Yan', trilha: 'UX', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:yanlorenzo96@gmail.com' }
  ] },
  { id: '11', nome: 'João Marcos Souza Costa', trilha: 'Jogos', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:joaomarcoscoasta@gmail.com' },
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/joao-marcos-souza-2834b3325/' }
  ] },
  { id: '12', nome: 'Mateus Dutra Vale', trilha: 'Back-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:mateus.dutra.vale.dv@gmail.com' }
  ] },
  { id: '13', nome: 'Gabriela Queiroz', trilha: 'Back-End', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'email', url: 'mailto:gabiqrz25@gmail.com' },
    { tipo: 'github', url: 'https://github.com/gabrielaqueirxz' },
    { tipo: 'linkedin', url: 'https://br.linkedin.com/in/gabriela-queiroz-b7a123216' }
  ] },
  { id: '14', nome: 'Stephanie Soares De Sousa', trilha: 'UX', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'linkedin', url: 'https://www.linkedin.com/in/stephanie-sousa-77908921b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { tipo: 'email', url: 'mailto:stephaniesousaks@gmail.com' },
    { tipo: 'phone', url: 'tel:+5598983288754' },
    { tipo: 'github', url: 'https://www.canva.com/design/DAGrL-YwOE4/AfIvhm6N2lwZhz4ZpMVJNw/edit?utm_content=DAGrL-YwOE4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' }
  ] },
  { id: '15', nome: 'Rayanne da Cunha Moraes', trilha: 'UX', funcao: '', avatar: '/assets/contatos/avatar-female.svg', links: [
    { tipo: 'phone', url: 'tel:+5598984541651' }
  ] },
  { id: '16', nome: 'Gilvan Nascimento', trilha: 'Back-End', funcao: '', avatar: '/assets/contatos/avatar-male.svg', links: [
    { tipo: 'email', url: 'mailto:Gilvann974@hotmail.com' }
  ] },
];

function getFakeAvatar(nome: string) {
  const nomesFemininos = ['Carolina', 'Gabriela', 'Geovanna', 'Alanna', 'Hirislayne', 'Isabel', 'Hévila', 'Verônica', 'Stephanie', 'Rayanne'];
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
      </main>
    </div>
  );
}

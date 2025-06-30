import { useNavigate } from 'react-router-dom';
import './Cabecalho.scss';
import iconeHospital from '../../assets/hospital.svg';
import iconeVoltar from '../../assets/voltar.svg';
import iconeBusca from '../../assets/busca.svg';

type CabecalhoProps = {
  mostrarLogo?: boolean;
  mostrarMenu?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoBusca?: boolean;
};

export function Cabecalho({
  mostrarLogo = true,
  mostrarMenu = true,
  mostrarBotaoVoltar = false,
  mostrarBotaoBusca = true,
}: CabecalhoProps) {
  const navigate = useNavigate();
  const modoVoltar = mostrarBotaoVoltar;

  const handleVoltar = () => {
    navigate(-1);
  };

  const irParaHome = () => {
    navigate('/');
  };

  const handleBusca = () => {
    navigate('/busca');
  };

  return (
    <header className={`cabecalho ${modoVoltar ? 'modo-voltar' : ''}`}>
      <div className="lado-esquerdo">
        {modoVoltar ? (
          <button onClick={handleVoltar} className="botao-voltar">
            <img src={iconeVoltar} alt="Voltar" className="icone-voltar" />
          </button>
        ) : (
          mostrarLogo && (
            <button onClick={irParaHome} className="botao-logo">
              <img src={iconeHospital} alt="Hospital" className="icone-hospital" />
            </button>
          )
        )}
      </div>

      <div className="lado-direito">
        {mostrarMenu && !modoVoltar && (
          <nav className="menu">
            <a href="/">Dashboard</a>
            <a href="/sobre">Sobre Nós</a>
          </nav>
        )}

        {mostrarBotaoBusca && (
          <button onClick={handleBusca} className="botao-busca">
            <img src={iconeBusca} alt="Busca" className="icone-busca" />
          </button>
        )}
      </div>

      {modoVoltar && mostrarLogo && (
        <div className="lado-direito">
          <button onClick={irParaHome} className="botao-logo">
            <img src={iconeHospital} alt="Hospital" className="icone-hospital" />
          </button>
        </div>
      )}
    </header>
  );
}

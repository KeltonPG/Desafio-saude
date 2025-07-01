import { useNavigate } from 'react-router-dom';
import './Cabecalho.scss';
import iconeHospital from '../../assets/hospital.svg';
import iconeVoltar from '../../assets/voltar.svg';

type CabecalhoProps = {
  mostrarLogo?: boolean;
  mostrarMenu?: boolean;
  mostrarBotaoVoltar?: boolean;
};

export function Cabecalho({
  mostrarLogo = true,
  mostrarMenu = true,
  mostrarBotaoVoltar = false,
}: CabecalhoProps) {
  const navigate = useNavigate();
  const modoVoltar = mostrarBotaoVoltar;

  const handleVoltar = () => {
    navigate(-1);
  };

  const irParaHome = () => {
    navigate('/');
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

      {mostrarMenu && !modoVoltar && (
        <nav className="menu">
          <a href="/sobre">Sobre Nós</a>
          <a href="/login">Login (ADM)</a>
          <a href="/cadastre">Cadastre-se</a>
        </nav>
      )}

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

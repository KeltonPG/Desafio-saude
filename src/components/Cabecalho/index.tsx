import './Cabecalho.scss'
import iconeHospital from '../../assets/hospital.svg'
import iconeVoltar from '../../assets/voltar.svg' // ícone de voltar

type CabecalhoProps = {
  mostrarLogo?: boolean
  mostrarMenu?: boolean
  mostrarBotaoVoltar?: boolean
}

export function Cabecalho({
  mostrarLogo = true,
  mostrarMenu = true,
  mostrarBotaoVoltar = false,
}: CabecalhoProps) {
  return (
    <header className="cabecalho">
      <div className="logo">
        {mostrarLogo && <img src={iconeHospital} alt="Hospital" />}
        {mostrarBotaoVoltar && (
          <a href="/">
            <img src={iconeVoltar} alt="Voltar" style={{ width: '32px', height: '32px' }} />
          </a>
        )}
      </div>

      {mostrarMenu && (
        <nav className="menu">
          <a href="#sobre">Sobre Nós</a>
          <a href="/login">Login (ADM)</a>
        </nav>
      )}
    </header>
  )
}

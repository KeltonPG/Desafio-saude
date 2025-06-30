import { Cabecalho } from '../../components/Cabecalho/Cabecalho'
import './TelaLogin.scss'
import { useNavigate } from 'react-router-dom'

export default function TelaLogin() {
  const navigate = useNavigate();

  const entrar = () => {
    navigate("/config-hospitais");
  }

  return (
    <div className="pagina-login">
       <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={true} mostrarBotaoBusca={false}/> 


      <main>
        <div className="caixa-login">
          <h1>Login</h1>
          <input type="text" placeholder="Nome de usuário" />
          <input type="password" placeholder="Senha" />
          <div className="acoes">
            <a href="#">Esqueci minha senha</a>
            <button className="botao-entrar" onClick={entrar}>
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

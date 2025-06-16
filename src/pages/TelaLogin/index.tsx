import { Cabecalho } from '../../components/Cabecalho'
import './TelaLogin.scss'

export default function TelaLogin() {
  return (
    <div className="pagina-login">
      <Cabecalho mostrarLogo={false} mostrarMenu={false} mostrarBotaoVoltar={true} />

      <main>
  <div className="caixa-login">
    <h1>Login</h1>
    <input type="text" placeholder="Nome de usuário" />
    <input type="password" placeholder="Senha" />
    <div className="acoes">
      <a href="#">Esqueci minha senha</a>
      <button className="botao-entrar">Entrar</button>
    </div>
  </div>
</main>

    </div>
  )
}

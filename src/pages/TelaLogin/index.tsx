import { Cabecalho } from '../../components/Cabecalho/Cabecalho';
import './TelaLogin.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Importar useState

export default function TelaLogin() {
  const navigate = useNavigate();

  // Mudar de 'username' e 'password' para 'usuario' e 'senha'
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const entrar = async () => {
    setError(''); // Limpa qualquer erro anterior

    try {
      const response = await fetch('/api/login', { // Ajuste a URL se seu backend não estiver em localhost:3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviar 'usuario' e 'senha' para o backend
        body: JSON.stringify({ usuario, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        navigate("/config-hospitais"); // Redireciona para a página de configuração após o login
      } else {
        const errorData = await response.json();
        // O backend agora retorna 'erro' e não 'message'
        setError(errorData.erro || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <div className="pagina-login">
      <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={true} mostrarBotaoBusca={false}/> 
      <main>
        <div className="caixa-login">
          <h1>Login</h1>
          {error && <p className="mensagem-erro">{error}</p>} {/* Exibe a mensagem de erro */}
          <input
            type="text"
            placeholder="Nome de usuário"
            value={usuario} // Usar 'usuario'
            onChange={(e) => setUsuario(e.target.value)} // Atualizar 'usuario'
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha} // Usar 'senha'
            onChange={(e) => setSenha(e.target.value)} // Atualizar 'senha'
          />
          <div className="acoes">
            <a href="#">Esqueci minha senha</a>
            <button className="botao-entrar" onClick={entrar}>
              Entrar
            </button>
          </div>
          <div className="cadastre-se">
            <a href="/cadastro">Cadastre-se</a>
          </div>
        </div>
      </main>
    </div>
  );
}
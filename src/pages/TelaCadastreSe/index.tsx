import { Cabecalho } from '../../components/Cabecalho/Cabecalho';
import './TelaCadastreSe.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TelaCadastreSe() {
    const navigate = useNavigate();

        const [usuario, setUsuario] = useState('');
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [error, setError] = useState('');

        const cadastrar = async () => {
            setError('');

            try {
                const response = await fetch('/api/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'aplication/json',
                    },
                     body: JSON.stringify({ usuario, email, senha }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token); 
                    navigate("/config-hospitais");
                } else {
                    const errorData = await response.json();
                    setError(errorData.erro || 'Credenciais inválidas. Tente novamente.');
                }
            }
            catch (err) {
                 console.error('Erro ao fazer login:', err);
                 setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
            }
        };

        return (
            <div className='pagina-cadastro'>
                <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={true} mostrarBotaoBusca={false}/> 
                <main>
                    <div className="caixa-cadastro">
                        <h1>Cadastre-Se</h1>
                        {error && <p className="mensagem-erro">{error}</p>} 
                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)} 
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email} // Usar 'email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                 type="password"
                                placeholder="Senha"
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                            />
                               <div className='acoes'>
                                    <button className="botao-cadastrar" onClick={cadastrar}>
                                        Cadastrar
                                    </button>
                                </div>
                    </div>
                </main>
            </div>
        );
}
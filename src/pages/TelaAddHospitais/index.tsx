import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cabecalho } from '../../components/Cabecalho';
import './TelaAddHospitais.scss';

export default function TelaAddHospitais() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servicos, setServicos] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    const novoHospital = {
      id: Date.now().toString(),
      nome,
      endereco,
      telefone,
      servicos: servicos.split(',').map(s => s.trim()),
      googleMapsUrl,
    };

    console.log('Hospital salvo:', novoHospital);

    alert('Hospital adicionado com sucesso!');
    navigate('/config-hospitais');
  };

  return (
    <div className="pagina-add-hospitais">
      <Cabecalho mostrarLogo={true} mostrarMenu={false} mostrarBotaoVoltar={true}
/>

      <main>
        <h2 className="titulo">Gerenciamento de Hospitais</h2>
        <h3 className="subtitulo">Adicionar Hospital</h3>

        <form onSubmit={handleSalvar} className="formulario">
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />

          <label>Endereço:</label>
          <input 
            type="text" 
            value={endereco} 
            onChange={(e) => setEndereco(e.target.value)} 
            required 
          />

          <label>Telefone:</label>
          <input 
            type="text" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
            required 
          />

          <label>Serviços (separe por vírgula):</label>
          <input 
            type="text" 
            value={servicos} 
            onChange={(e) => setServicos(e.target.value)} 
            required 
          />

          <label>Google Maps URL:</label>
          <input 
            type="text" 
            value={googleMapsUrl} 
            onChange={(e) => setGoogleMapsUrl(e.target.value)} 
            required 
          />

          <div className="botoes">
            <button type="button" onClick={() => navigate('/config-hospitais')} className="cancelar">
              Cancelar
            </button>
            <button type="submit" className="salvar">
              Salvar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

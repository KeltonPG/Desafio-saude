import { useState } from 'react';
import { Cabecalho } from '../../components/Cabecalho'
import './BuscaUnidades.scss';

export function BuscaUnidades() {
  // --- estados --------------------------------------------------------------
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [distancia, setDistancia] = useState('');

  // --- handlers -------------------------------------------------------------
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.table({
      endereco,
      tipo,
      especialidade,
      distancia,
    });

    // TODO: quando a rota /busca estiver OK:
    // buscarUnidades({ endereco, tipo, especialidade, distancia });
  }

  // --- render ---------------------------------------------------------------
  return (
    <div className="busca-container">
      <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={true} mostrarBotaoBusca={false}/>

      <main className="busca-main">
        <img
          src="/src/assets/mapa-pin.png"
          alt="Pino de mapa"
          className="pin-img"
        />

        <h1 className="titulo-principal">Buscar Especialidade ou Hospital</h1>

        <form className="form-busca" onSubmit={handleSubmit}>
          <label>
            Endereço
            <input
              type="text"
              placeholder="Digite o endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </label>

          <label>
            Tipo de estabelecimento
            <input
              type="text"
              placeholder="Ex.: Clínica, Hospital..."
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </label>

          <label>
            Especialidade
            <input
              type="text"
              placeholder="Ex.: Cardiologia"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
          </label>

          <label>
            Distância máxima (km)
            <input
              type="number"
              placeholder="Ex.: 5"
              min={0}
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
            />
          </label>

          <button type="submit" className="botao-buscar">
            Buscar unidades
          </button>
        </form>
      </main>
    </div>
  );
}

export default BuscaUnidades;

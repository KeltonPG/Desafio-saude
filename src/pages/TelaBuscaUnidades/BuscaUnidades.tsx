import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Cabecalho } from '../../components/Cabecalho';
import './BuscaUnidades.scss';

const selectEstilo = {
  container: (base: any) => ({
    ...base,
    width: '100%',
  }),
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 48,
    border: 'none',
    background: '#e6e7e8',
    borderRadius: 8,
    boxShadow: state.isFocused ? '0 0 0 2px #005eb8' : 'none',
    '&:hover': { boxShadow: state.isFocused ? '0 0 0 2px #005eb8' : 'none' },
  }),
  valueContainer: (base: any) => ({
    ...base,
    flex: 1,
    minWidth: 0,
    padding: '0 1rem',
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
    fontSize: '1rem',
    color: '#333',
  }),
  singleValue: (base: any) => ({ ...base, fontSize: '1rem', color: '#333' }),
  placeholder: (base: any) => ({ ...base, fontSize: '1rem', color: '#888' }),
  dropdownIndicator: (base: any) => ({ ...base, color: '#0057a0', paddingRight: 8 }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (base: any) => ({ ...base, borderRadius: 8, fontSize: '1rem', zIndex: 20 }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: '1rem',
    padding: '0.7rem 1rem',
    background: state.isSelected
      ? '#0057a0'
      : state.isFocused
      ? '#dbeafe'
      : '#fff',
    color: state.isSelected ? '#fff' : state.isFocused ? '#0057a0' : '#333',
    cursor: 'pointer',
  }),
};

export function BuscaUnidades() {
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState<{ value: string; label: string } | null>(null);
  const [especialidade, setEspecialidade] = useState<{ value: string; label: string } | null>(null);
  const [distancia, setDistancia] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const [tiposLista, setTiposLista] = useState<{ id: number; nome: string }[]>([]);
  const [especialidadesLista, setEspecialidadesLista] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tipos')
      .then((res) => res.json())
      .then((data) => setTiposLista(data));

    fetch('http://localhost:3001/api/especialidades')
      .then((res) => res.json())
      .then((data) => setEspecialidadesLista(data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setResultados([]);

    try {
      const response = await fetch('http://localhost:3001/api/busca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endereco,
          tipo: tipo ? tipo.label : '',
          especialidade: especialidade ? especialidade.label : '',
          distancia,
        }),
      });

      if (!response.ok) throw new Error('Erro na busca');

      const data = await response.json();
      setResultados(data);
    } catch (err: any) {
      setErro('Erro ao buscar unidades');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="busca-container">
      <Cabecalho
        mostrarLogo={true}
        mostrarMenu={true}
        mostrarBotaoVoltar={true}
        mostrarBotaoBusca={false}
      />

      <main className="busca-main">
        <img src="/src/assets/mapa-pin.png" alt="Pino de mapa" className="pin-img" />

        <h1 className="titulo-principal">Buscar Especialidade ou Hospital</h1>

        <form className="form-busca" onSubmit={handleSubmit} autoComplete="off">
          <label>
            Endereço
            <input
              type="text"
              placeholder="Digite o endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              autoComplete="off"
            />
          </label>

          <label>
            Tipo de estabelecimento
            <Select
              styles={selectEstilo}
              options={tiposLista.map((t) => ({ value: t.id.toString(), label: t.nome }))}
              value={tipo}
              onChange={setTipo}
              placeholder="Selecione ou digite para buscar..."
              isClearable
              noOptionsMessage={() => 'Nenhum tipo encontrado'}
              menuPlacement="auto"
            />
          </label>

          <label>
            Especialidade
            <Select
              styles={selectEstilo}
              options={especialidadesLista.map((e) => ({
                value: e.id.toString(),
                label: e.nome,
              }))}
              value={especialidade}
              onChange={setEspecialidade}
              placeholder="Selecione ou digite para buscar..."
              isClearable
              noOptionsMessage={() => 'Nenhuma especialidade encontrada'}
              menuPlacement="auto"
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

          <button type="submit" className="botao-buscar" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar unidades'}
          </button>
        </form>

        <div className="resultados-busca">
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {resultados.length > 0 && (
            <ul>
              {resultados.map((item, idx) => (
                <li
                  key={item.id || idx}
                  style={{
                    marginBottom: '1rem',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                  }}
                >
                  <strong>{item.nome}</strong>
                  <br />
                  {item.endereco}
                  <br />
                  {item.telefone && <span>Tel: {item.telefone}</span>}
                </li>
              ))}
            </ul>
          )}
          {!loading && resultados.length === 0 && !erro && (
            <p style={{ color: '#666', marginTop: '1rem' }}>Nenhuma unidade encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default BuscaUnidades;

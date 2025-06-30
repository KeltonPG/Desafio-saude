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
  const [tiposLista, setTiposLista] = useState<{ value: string; label: string }[]>([]);
  const [especialidadesLista, setEspecialidadesLista] = useState<{ value: string; label: string }[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/tipos')
      .then(res => res.json())
      .then(data =>
        setTiposLista(
          data.map((t: any) => ({
            value: t.id.toString(),
            label: t.nome,
          }))
        )
      )
      .catch(() => setTiposLista([]));

    fetch('http://localhost:3001/api/especialidades')
      .then(res => res.json())
      .then(data =>
        setEspecialidadesLista(
          data.map((e: any) => ({
            value: e.id.toString(),
            label: e.nome,
          }))
        )
      )
      .catch(() => setEspecialidadesLista([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setResultados([]);
    setLoading(true);

    try {
      // Geocodifica o endereço
      const geoRes = await fetch(`http://localhost:3001/api/geocodificar?endereco=${encodeURIComponent(endereco)}`);
      if (!geoRes.ok) throw new Error('Endereço não encontrado');
      const { lat, lng } = await geoRes.json();

      // Monta os parâmetros de busca
      const params = new URLSearchParams({
        lat: String(lat),
        lng: String(lng),
        raio: distancia ? String(Number(distancia) * 1000) : '5000', // padrão 5km se vazio
      });
      if (tipo) params.append('tipo', tipo.value);
      if (especialidade) params.append('especialidade', especialidade.value);

      // Busca unidades próximas
      const buscaRes = await fetch(`http://localhost:3001/api/busca?${params.toString()}`);
      if (!buscaRes.ok) throw new Error('Erro ao buscar unidades');
      const data = await buscaRes.json();

      setResultados(data);
      if (data.length === 0) setErro('Nenhuma unidade encontrada para os filtros informados.');
    } catch (err: any) {
      setErro(err.message || 'Erro ao buscar unidades');
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

        <h1 className="titulo-principal" style={{ background: '#0057a0', color: '#fff', padding: '0.5rem', borderRadius: 4 }}>
          Buscar Especialidade ou Hospital
        </h1>

        <form className="form-busca" onSubmit={handleSubmit} autoComplete="off">
          <label>
            Endereço
            <input
              type="text"
              placeholder="Digite o endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              autoComplete="off"
              style={{ background: '#e6e7e8', border: 'none', borderRadius: 8, minHeight: 48, padding: '0 1rem', fontSize: '1rem', marginBottom: 12 }}
              required
            />
          </label>

          <label>
            Tipo de estabelecimento
            <Select
              styles={selectEstilo}
              options={tiposLista}
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
              options={especialidadesLista}
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
              placeholder="Máximo 20km"
              min={1}
              max={30}
              value={distancia}
              onChange={e => {
              const value = e.target.value;
              // Garante que o valor fique entre 1 e 30
              if (value === "" || (Number(value) >= 1 && Number(value) <= 30)) {
                setDistancia(value);
              }
            }}
              style={{ background: '#e6e7e8', border: 'none', borderRadius: 8, minHeight: 48, padding: '0 1rem', fontSize: '1rem', marginBottom: 12 }}
              required
            />
          </label>

          <button type="submit" className="botao-buscar" style={{
            background: '#0057a0',
            color: '#fff',
            border: 'none',
            borderRadius: 24,
            padding: '1rem 0',
            fontSize: '1.1rem',
            marginTop: 16,
            width: '100%',
            fontWeight: 600
          }} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar unidades'}
          </button>
        </form>

        <div className="resultados-busca" style={{ marginTop: 24 }}>
          {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
          {resultados.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {resultados.map((item, idx) => (
                <li key={item.id || idx} style={{
                  marginBottom: '1rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  boxShadow: '0 2px 6px #0001'
                }}>
                  <strong>{item.nome}</strong>
                  <br />
                  {item.endereco}
                  <br />
                  {item.telefone && <span>Tel: {item.telefone}</span>}
                  <br />
                  {item.distancia && (
                    <span style={{ color: '#0057a0', fontWeight: 500 }}>
                      Distância: {(item.distancia / 1000).toFixed(2)} km
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default BuscaUnidades;

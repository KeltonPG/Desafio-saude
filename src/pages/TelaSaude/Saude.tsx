// src/pages/TelaSaude/index.tsx
import { useState, useEffect } from 'react';

// Importa os componentes existentes do seu projeto
import { Cabecalho } from '../../components/Cabecalho';
import { BotaoOpcao } from '../../components/BotaoOpcao';
import { useNavigate } from 'react-router-dom'

// Importa os ícones e imagens existentes do seu projeto
import iconeVacina from '../../assets/vacina.svg';
import iconeConsulta from '../../assets/doutora.svg';
import iconeEmergencia from '../../assets/emergencia.svg';
import iconeHospital from '../../assets/hospital.svg';
import fotoMedica from '../../assets/vacina_aplicada.png';

// Importa os estilos SCSS existentes
import './TelaSaude.scss';

// Interface para os estabelecimentos de saúde retornados pela API de busca
interface EstabelecimentoSaude {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    latitude: number; 
    longitude: number;
    distancia: number; 
}

// Interface para os itens de seleção (Categorias e Especialidades)
interface SelectOption {
    id: number;
    nome: string;
}

export default function TelaSaude() {
    const navigate = useNavigate();


    // --- Estados para a funcionalidade de busca ---
    const [termoBusca, setTermoBusca] = useState('');
    const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState<number | ''>('');
    const [especialidadeSelecionadaId, setEspecialidadeSelecionadaId] = useState<number | ''>('');
    const [localizacaoInput, setLocalizacaoInput] = useState('');
    const [estabelecimentos, setEstabelecimentos] = useState<EstabelecimentoSaude[]>([]); // Renomeado para EstabelecimentoSaude[]
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [categorias, setCategorias] = useState<SelectOption[]>([]);
    const [especialidades, setEspecialidades] = useState<SelectOption[]>([]);

    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLng, setUserLng] = useState<number | null>(null);
    const [raioBusca, setRaioBusca] = useState<number>(5000); // Raio padrão de 5km

    // --- Efeitos para carregar categorias e especialidades ---
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('/api/tipos'); // Endpoint para categorias
                if (!response.ok) {
                    throw new Error(`Erro ao carregar categorias: ${response.statusText}`);
                }
                const data: SelectOption[] = await response.json();
                setCategorias(data);
            } catch (err: any) {
                console.error("Falha ao buscar categorias:", err);
                setError("Não foi possível carregar as categorias.");
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const response = await fetch('/api/especialidades');
                if (!response.ok) {
                    throw new Error(`Erro ao carregar especialidades: ${response.statusText}`);
                }
                const data: SelectOption[] = await response.json();
                setEspecialidades(data);
            } catch (err: any) {
                console.error("Falha ao buscar especialidades:", err);
                setError("Não foi possível carregar as especialidades.");
            }
        };
        fetchEspecialidades();
    }, []);

    // --- Efeito para obter geolocalização do navegador ---
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLng(position.coords.longitude);
                    console.log("Localização do navegador obtida:", position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.warn('Erro ao obter localização do navegador:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.warn("Geolocalização não suportada pelo navegador.");
        }
    }, []);

    // --- Função principal de busca ---
    const handleBuscar = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setEstabelecimentos([]); // Limpa resultados anteriores

        let currentLat = userLat;
        let currentLng = userLng;

        // 1. Priorizar localização do campo de texto, se preenchido
        if (localizacaoInput) {
            try {
                console.log("Geocodificando endereço:", localizacaoInput);
                const geoResponse = await fetch(`/api/geocodificar?endereco=${encodeURIComponent(localizacaoInput)}`);
                if (!geoResponse.ok) {
                    const errorData = await geoResponse.json();
                    throw new Error(errorData.erro || `Erro ao geocodificar endereço: ${geoResponse.statusText}`);
                }
                const geoData = await geoResponse.json();
                currentLat = geoData.lat;
                currentLng = geoData.lng;
                console.log("Endereço geocodificado para:", currentLat, currentLng);
            } catch (err: any) {
                console.error('Erro na geocodificação:', err);
                setError(err.message || 'Não foi possível encontrar as coordenadas para o endereço fornecido.');
                setLoading(false);
                return;
            }
        }

        // 2. Se não houver localização
        if (currentLat === null || currentLng === null) {
            setError('Por favor, permita o acesso à sua localização ou digite um endereço para buscar unidades.');
            setLoading(false);
            return;
        }

        // 3. Construir os query parameters para a busca principal
        const params = new URLSearchParams();
        params.append('lat', currentLat.toString());
        params.append('lng', currentLng.toString());
        params.append('raio', raioBusca.toString()); 

        if (termoBusca) params.append('termoBusca', termoBusca); 
        if (categoriaSelecionadaId) params.append('tipo', categoriaSelecionadaId.toString());
        if (especialidadeSelecionadaId) params.append('especialidade', especialidadeSelecionadaId.toString());

        const queryString = params.toString();
        const url = `/api/busca${queryString ? `?${queryString}` : ''}`;
        console.log("URL de busca:", url);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || `Erro HTTP! status: ${response.status}`);
            }

            const data: EstabelecimentoSaude[] = await response.json();
            setEstabelecimentos(data);
        } catch (err: any) {
            console.error('Erro ao buscar estabelecimentos de saúde:', err);
            setError(err.message || 'Ocorreu um erro ao buscar os estabelecimentos de saúde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pagina-saude"> {/* Mantido o nome de classe do seu código */}
            {/* Seu Cabeçalho existente */}
            <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={false}/>

            <main className="pagina-central"> {/* Mantido o nome de classe do seu código */}
                <h1 className="titulo-principal">Secretaria de Estado da Saúde do Maranhão</h1>
                <p className="subtitulo">Trabalhando por uma saúde pública de qualidade</p>
                <h2 className="subtitulo-negrito">Escolha a unidade mais próxima de você!</h2>

                {/* Seus Botões de Opção existentes */}
                <div className="botoes">
                    <BotaoOpcao icone={iconeVacina} texto="Imunização" aoClicar={() => navigate('/TelaLocHosp')} />
                    <BotaoOpcao icone={iconeConsulta} texto="Consulta Médica" aoClicar={() => navigate('/TelaLocHosp')} />
                    <BotaoOpcao icone={iconeHospital} texto="Exames" aoClicar={() => navigate('/TelaLocHosp')} />
                    <BotaoOpcao icone={iconeEmergencia} texto="Emergência" aoClicar={() => navigate('/TelaLocHosp')} />
                </div>

                {/* --- SEÇÃO DE BUSCA DINÂMICA (Adicionada/Integrada) --- */}
                <section className="tela-saude__busca">
                    <h2>Encontre Estabelecimentos de Saúde</h2>
                    <form onSubmit={handleBuscar}>
                        <div className="form-group">
                            <label htmlFor="termoBusca">Buscar por nome ou descrição:</label>
                            <input
                                type="text"
                                id="termoBusca"
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                                placeholder="Ex: Hospital Central, UPA, Vacina COVID"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="localizacaoInput">Sua Localização (Endereço):</label>
                            <input
                                type="text"
                                id="localizacaoInput"
                                value={localizacaoInput}
                                onChange={(e) => setLocalizacaoInput(e.target.value)}
                                placeholder="Ex: Rua da Saúde, 123, Cidade, SP"
                                disabled={userLat !== null && userLng !== null && !localizacaoInput} // Desabilita se já tem localização do navegador E não está digitando um endereço
                            />
                            {userLat !== null && userLng !== null && (
                                <p className="text-sm text-green-600">
                                    Localização atual do navegador: ({userLat.toFixed(4)}, {userLng.toFixed(4)})
                                    {localizacaoInput && <span className="text-yellow-600"> (Sobrescrevendo com endereço digitado)</span>}
                                </p>
                            )}
                            {userLat === null && userLng === null && !localizacaoInput && (
                                <p className="text-sm text-red-600">
                                    Permita a localização do navegador ou digite um endereço.
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="raioBusca">Raio de Busca (metros):</label>
                            <input
                                type="number"
                                id="raioBusca"
                                value={raioBusca}
                                onChange={(e) => setRaioBusca(parseInt(e.target.value))}
                                min="1000"
                                max="20000"
                                step="1000"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria:</label>
                            <select
                                id="categoria"
                                value={categoriaSelecionadaId}
                                onChange={(e) => setCategoriaSelecionadaId(parseInt(e.target.value) || '')}
                            >
                                <option value="">Todas as Categorias</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="especialidade">Especialidade:</label>
                            <select
                                id="especialidade"
                                value={especialidadeSelecionadaId}
                                onChange={(e) => setEspecialidadeSelecionadaId(parseInt(e.target.value) || '')}
                            >
                                <option value="">Todas as Especialidades</option>
                                {especialidades.map((esp) => (
                                    <option key={esp.id} value={esp.id}>
                                        {esp.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Buscando...' : 'Buscar Estabelecimentos'}
                        </button>
                    </form>
                </section>

                <section className="tela-saude__resultados">
                    <h3>Resultados da Busca:</h3>
                    {error && <p className="error-message">{error}</p>}
                    {estabelecimentos.length === 0 && !loading && !error && <p>Nenhum estabelecimento encontrado. Tente refinar sua busca ou ajustar a localização.</p>}
                    <div className="unidades-list">
                        {estabelecimentos.map((estabelecimento) => (
                            <div key={estabelecimento.id} className="unidade-card">
                                <h4>{estabelecimento.nome}</h4>
                                <p>Endereço: {estabelecimento.endereco}</p>
                                <p>Telefone: {estabelecimento.telefone || 'N/A'}</p>
                                <p>Distância: {(estabelecimento.distancia / 1000).toFixed(2)} km</p>
                                {/* Você pode adicionar mais informações aqui */}
                            </div>
                        ))}
                    </div>
                </section>
                {/* --- FIM DA SEÇÃO DE BUSCA DINÂMICA --- */}

                {/* Sua Seção de Notícias existente */}
                <section className="noticias">
                    <h3>Últimas notícias</h3>
                    <h4>Avanço na cobertura vacinal infantil</h4>
                    <img className="fundo-foto" src={fotoMedica} alt="Vacinação" />
                    <p>
                        O estado aumentou a cobertura vacinal de 12 das 16 vacinas recomendadas no calendário
                        infantil do Programa Nacional de Imunizações, com destaque para a vacina contra hepatite
                        A, que passou de 63,6% em 2022 para 77,15% em 2023.
                        <br />
                        <strong>Fonte: Ministério da Saúde</strong>
                    </p>
                </section>
            </main>

            {/* Seu Rodapé existente */}
            <footer className="rodape">
                <p>© 2025 Grupo de Desenvolvimento • Plataforma de Apoio à Saúde</p>
            </footer>
        </div>
    );
}

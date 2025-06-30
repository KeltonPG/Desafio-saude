import { useNavigate } from 'react-router-dom';

// Importa os componentes existentes do seu projeto
import { Cabecalho } from '../../components/Cabecalho';
import { BotaoOpcao } from '../../components/BotaoOpcao';

// Importa os ícones e imagens existentes do seu projeto
import iconeVacina from '../../assets/vacina.svg';
import iconeConsulta from '../../assets/doutora.svg';
import iconeEmergencia from '../../assets/emergencia.svg';
import iconeHospital from '../../assets/hospital.svg';
import fotoMedica from '../../assets/vacina_aplicada.png';

// Importa os estilos SCSS existentes
import './TelaSaude.scss';

export default function TelaSaude() {
    const navigate = useNavigate();

    return (
        <div className="pagina-saude"> {/* Mantido o nome de classe do seu código */}
            {/* Seu Cabeçalho existente */}
            <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={false}/>

            <main className="pagina-central"> {/* Mantido o nome de classe do seu seu código */}
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

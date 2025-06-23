import { Cabecalho } from '../../components/Cabecalho'
import './TelaSobreNos.scss'
import { useNavigate } from 'react-router-dom' 

export default function TelaSobreNos() {
    const navigate = useNavigate(); 

    return (
        <div className='pagina-sobrenos'>
            <Cabecalho mostrarLogo= {true} mostrarMenu={true} mostrarBotaoVoltar={false}/>

            <header className='pagina-sobre'>
                <h1 className='titulo-principal'>Sobre Nós</h1>
            </header>

            <main className='sobre-proposito'>
                <section className='proposito'>
                    <h2>Nosso Propósito</h2>
                    <p>
                        Este projeto foi desenvolvido com o objetivo de facilitar o 
                        acesso á informação sobre unidades de saúde para toda a população,
                        especialmente para idosos que muitas vezes enfrentam dificuldades
                        ao buscar atendimento médico.
                    </p>

                    <h3>Quem Somos?</h3>
                    <p>
                        Somos estudantes participantes do Programa Trilhas-Eixo 2B,
                        uma iniciativa da Secretaria de Estado da Ciência, Tecnologia
                        e Inovação do Maranhão (SECTI). Nosso projeto busca desenvolver
                        soluções diitais voltadas para a melhoria da saúde pública, unindo
                        tecnologia, inovação e compromisso social para impactar positivamente 
                        a vida da população maranhense. 
                    </p>
                </section>
            </main>
        </div>
    )
}

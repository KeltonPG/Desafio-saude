import { Cabecalho } from '../../components/Cabecalho'
import { TelaSobreNós } from './TelaSobreNos.scss'
import { useNavigate } from 'react-router-dom' 

export default function TelaSobreNos() {
    const navigate = useNavigate(); 

    const entrar = () => {
        navigate("/config-hospitais");
    }
}

return {
    <div className= "pagina-sobrenos"> 
        <Cabecalho mostrarLogo={true} mostrarMenu={true} mostrarBotaoVoltar={false}/>
        
        <header className= "pagina-sobre">
            <h1 className= "titulo-principal">Sobre Nós</h1>
        </header>

        <main className= ""></main>





    </div>



}
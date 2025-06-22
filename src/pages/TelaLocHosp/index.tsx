import { Cabecalho } from '../../components/Cabecalho'
import'./TelaLocHosp.scss'

export default function TelaLocHosp() {

  return (
    <div className="pagina-LocHosp">
      <Cabecalho mostrarLogo={true} mostrarMenu={false} mostrarBotaoVoltar={true}/>

        <main className="conteudo">
            <section className="unidade">
                <h2>Centro de Saúde Djalma Marques</h2>
                <p>Endereço: Av: Celso Coutinho, S/N – Ipem Turu</p>
                <p>Exames disponíveis: Consulta de Enfermagem, Teste do pezinho, Controle do Crescimento e Desenvolvimento, Nebulização, Reidratação Oral, Imunização etc.</p>
                <iframe src="https://www.google.com/maps?q=Centro+de+Saúde+Djalma+Marques&output=embed" loading="lazy" className="mapa"></iframe>
            </section>

            <section className="unidade">
                <h2>Unidade de Saúde da Família AMAR</h2>
                <p>Endereço: Rua Deputado Luís Rocha, S/N – Vicente Fialho</p>
                <p>Exames disponíveis: Consulta de Enfermagem, Teste do pezinho, Controle do Crescimento e Desenvolvimento etc.</p>
                <iframe src="https://www.google.com/maps?q=Unidade+de+Saúde+da+Família+AMAR&output=embed" loading="lazy" className="mapa"></iframe>
            </section>
        </main>  

    </div>
  );
}
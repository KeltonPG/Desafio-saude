import { Cabecalho } from '../../components/Cabecalho';
import './TelaLocHosp.scss';

export default function TelaLocHosp() {
  return (
    <div className="pagina-LocHosp">
      <Cabecalho
        mostrarLogo={true}
        mostrarMenu={true}
        mostrarBotaoVoltar={true}
        mostrarBotaoBusca={false}
      />

      <main className="conteudo">
        <section className="unidade">
          <h2>Centro de Saúde Djalma Marques</h2>
          <p>
            <strong>Endereço:</strong> Av: Celso Coutinho, S/N – Ipem Turu
          </p>
          <p>
            <strong>Exames disponíveis:</strong> Consulta de Enfermagem, Teste do pezinho, Controle do Crescimento e Desenvolvimento, Nebulização, Reidratação Oral, Imunização etc.
          </p>
          <iframe
            src="https://www.google.com/maps?q=Centro+de+Saúde+Djalma+Marques&output=embed"
            loading="lazy"
            className="mapa"
            title="Mapa Centro de Saúde Djalma Marques"
          ></iframe>
        </section>

        <section className="unidade">
          <h2>Unidade de Saúde da Família AMAR</h2>
          <p>
            <strong>Endereço:</strong> Rua Deputado Luís Rocha, S/N – Vicente Fialho
          </p>
          <p>
            <strong>Exames disponíveis:</strong> Consulta de Enfermagem, Teste do pezinho, Controle do Crescimento e Desenvolvimento etc.
          </p>
          <iframe
            src="https://www.google.com/maps?q=Unidade+de+Saúde+da+Família+AMAR&output=embed"
            loading="lazy"
            className="mapa"
            title="Mapa Unidade de Saúde da Família AMAR"
          ></iframe>
        </section>
      </main>
    </div>
  );
}

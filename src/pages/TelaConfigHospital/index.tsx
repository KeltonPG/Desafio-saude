import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Cabecalho } from '../../components/Cabecalho';
import './TelaConfigHospital.scss';

type Hospital = {
  id: string;
  nome: string;
  especialidade: string;
  data: string;
};

export default function TelaConfigHospitais() {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosFalsos: Hospital[] = [
      {
        id: "1",
        nome: "UPA Cidade Operária",
        especialidade: "Pediatra",
        data: "15/06/2025",
      },
      {
        id: "2",
        nome: "C.S Djalma Marques",
        especialidade: "Ginecologista",
        data: "17/07/2025",
      },
      {
        id: "3",
        nome: "U.S Família Santa Bárbara",
        especialidade: "Teste do Pezinho",
        data: "18/06/2025",
      },
    ];

    setHospitais(dadosFalsos);
  }, []);

  return (
    <div className="pagina-config-hospitais">
      <Cabecalho mostrarLogo={true} mostrarMenu={false} mostrarBotaoVoltar={true}/>

      
      <main>
        <h2>Gerenciamento de Hospitais</h2>

        <div className="lista-hospitais">
          {hospitais.map((hospital) => (
            <div key={hospital.id} className="cartao-hospital">
              <p className="nome">{hospital.nome}</p>
              <p className="especialidade">{hospital.especialidade}</p>
              <p className="data">{hospital.data}</p>
              <div className="acoes">
                <button title="Visualizar">👁</button>
                <button title="Editar">📝</button>
                <button title="Excluir">🗑</button>
              </div>
            </div>
          ))}
        </div>

        <button 
  className="botao-adicionar" 
  onClick={() => navigate('/config-hospitais/adicionar')}
>
  Adicionar Hospital
</button>

      </main>
    </div>
  );
}

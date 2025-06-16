import './BotaoOpcao.scss'

type Props = {
  icone: string
  texto: string
  aoClicar: () => void
}

export function BotaoOpcao({ icone, texto, aoClicar }: Props) {
  return (
    <button className="botao-opcao" onClick={aoClicar}>
      <img src={icone} alt={texto} />
      <span>{texto}</span>
    </button>
  )
}

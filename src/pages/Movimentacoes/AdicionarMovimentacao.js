import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const AdicionarMovimentacao = ({salvarNovaMovimentacao}) => {

    const [movimentacaoValor, setMovimentacaoValor] = useState('')
    const [movimentacaoDescricao, setMovimentacaoDescricao] = useState('')

    const handleValor = evt =>{
        setMovimentacaoValor(evt.target.value)
      }
      const handleDescricao = evt =>{
        setMovimentacaoDescricao(evt.target.value)
      }
    
    const  salvar = async() =>{
        if(!isNaN(movimentacaoValor) && movimentacaoValor.search(/^[-]?\d+(\.)?\d+?$/) >= 0 && movimentacaoDescricao !== ''){
            await salvarNovaMovimentacao(
                {
                descricao : movimentacaoDescricao,
                valor :parseFloat(movimentacaoValor)
                })
            setMovimentacaoDescricao('')
            setMovimentacaoValor('')
        }
    }
    return (
        <tr>
              <td>
                <input type ='text' value = {movimentacaoDescricao} onChange = {handleDescricao} placeholder = 'Descrição'/>
              </td>
              <td>
                <input type ='number' value = {movimentacaoValor} onChange = {handleValor} placeholder = 'Valor' />
                <Button onClick = { salvar}>+</Button>
              </td>
         </tr>
    )
}

export default AdicionarMovimentacao

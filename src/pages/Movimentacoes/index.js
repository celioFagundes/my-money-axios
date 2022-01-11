import React, { useState, useEffect } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router'
import { useMesAPI, useMovimentacoesAPI } from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = () => {
  const { id } = useParams()
  const { infoMes, alterarMes } = useMesAPI(id)
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacoesAPI(id)
  const [somaEntradas, setSomaEntradas] = useState(0)
  const [somaSaidas, setSomaSaidas] = useState(0)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    let entradas = 0
    let saidas = 0

    Object.keys(movimentacoes.data).forEach(mov => {
      if (movimentacoes.data[mov].valor > 0) {
        entradas += movimentacoes.data[mov].valor
      } else {
        saidas += movimentacoes.data[mov].valor
      }
    })
    setSomaEntradas(entradas)
    setSomaSaidas(saidas)
  }, [movimentacoes.data])

  useEffect(() => {
   
    const updateMes = async () => {
      await alterarMes({
        entradas: somaEntradas,
        saidas: somaSaidas,
      })
    }
    updateMes()
    .then(() =>setReload(!reload))
  }, [somaEntradas, somaSaidas])

  const salvarMovimentacao = async dados => {
    await salvarNovaMovimentacao(dados)
    movimentacoes.refetch()
  }

  const removerMovimentacaoClick = async movID => {
    if (Object.keys(movimentacoes.data).length === 1) {
      await removerMovimentacao(`movimentacoes/${id}/${movID}`)
      window.location.reload()
    } else {
      await removerMovimentacao(`movimentacoes/${id}/${movID}`)
    }
    movimentacoes.refetch()
  }

  if (movimentacoes.error === 'Permission denied') {
    return <Navigate to='/login' />
  }
  return (
    <Container>
      <h1>Movimentacoes</h1>
      <Container>
        <InfoMes idMes={id} reload={reload} />
      </Container>
    
      <Table>
        <thead>
          <tr>
            <th>Descricão</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map(movimentacao => (
              <tr key={movimentacao}>
                <td>{movimentacoes.data[movimentacao].descricao}</td>
                <td>
                  {movimentacoes.data[movimentacao].valor}
                  <Button variant='danger' onClick={() => removerMovimentacaoClick(movimentacao)}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
          <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
        </tbody>
      </Table>
    </Container>
  )
}
export default Movimentacoes

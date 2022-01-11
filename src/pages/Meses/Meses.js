import React from 'react'
import Rest from '../../utils/rest'
import { Link } from 'react-router-dom'
import { Row, Table } from 'react-bootstrap'
import { Navigate } from 'react-router'

const baseURL = 'https://mymoney-2fcaf-default-rtdb.firebaseio.com/'
const {useGet} = Rest(baseURL)

const Meses = () => {

    const data = useGet('meses')

    if(data.error === 'Permission denied'){
        return <Navigate to =  '/login'/>
      }
    if(data.loading){
        return <p>Carregando</p>
    }
    
    return (
        <Row>
            <Table striped bordered hover variant = 'dark'>
                <thead>
                    <tr>
                    <th>Mês</th>
                    <th>Previsão entrada</th>
                    <th>Entrada</th>
                    <th>Previsão Saida</th>
                    <th>Saída</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Object.keys(data.data).map(mes =>(
                        <tr key = {mes}>
                        <td><Link to = {`/movimentacoes/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_entrada}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_saida}</td>
                        <td>{data.data[mes].saidas}</td>
                        </tr>
                    ))
                    }
                </tbody>
              </Table>
        </Row>
    )
}

export default Meses

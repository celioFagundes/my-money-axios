import React , {useState,useRef} from 'react'
import {Row, Button, Col } from "react-bootstrap";
import { Navigate } from 'react-router';
const minAno = 2017
const maxAno = 2022

const AdicionarMes = () => {

    const refAno = useRef()
    const refMes = useRef()
    const [redir, setRedir] = useState('')
    const anos = []
    const meses = []
    for(let i = minAno; i <= maxAno ; i++){
        anos.push(i)
    }
    for(let i = 1; i <= 12; i++){
        meses.push( i)
    }
    const zeroPad = num =>{
        if(num < 10){
            return '0' + num
        }
        return num
    }

    const verAno = () =>{
        setRedir(refAno.current.value + '-' + refMes.current.value)
    }
    if(redir !== ''){
        return <Navigate to ={'/movimentacoes/' + redir}/>
    }
    return (
        <div>
            <h2>Adicionar mês</h2>
            <Row>
                <Col xs = {2}>
                <select ref ={refAno}className="form-select" aria-label="Default select example">
                    <option hidden>Ano</option>
                    {anos.map(ano =>( <option key = {ano} value={ano}>{ano}</option> ))}
                </select>
                </Col>
                <Col  xs = {2}>
                <select ref= {refMes}className="form-select" aria-label="Default select example">
                    <option hidden>Mes</option>
                    {meses.map(zeroPad).map(mes =>(<option key = {mes} value={mes}>{mes}</option>))}      
                </select>
                </Col>
            <Col>
                <Button onClick = {verAno}>Adicionar</Button>
            </Col>
            </Row>
        </div>
    )
}

export default AdicionarMes

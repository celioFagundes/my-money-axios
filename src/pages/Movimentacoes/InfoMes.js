import React, {useState, useEffect} from 'react'
import { useMesAPI } from '../../api'
import { Navigate } from 'react-router-dom'

const InfoMes = ({idMes, reload}) => {
    const {infoMes,alterarMes} = useMesAPI(idMes)
    const [inputPrevEntrada, setInputPrevEntrada] = useState('')
    const [inputPrevSaida, setInputPrevSaida] = useState('')
    	
    useEffect(() => {
        infoMes.refetch()
    }, [reload])
    const alterarPrevisaoEntrada = async(evt) =>{
      
        if(inputPrevEntrada !== ''){
        await alterarMes({previsao_entrada : inputPrevEntrada})
        infoMes.refetch()}
        setInputPrevEntrada('')
        
      }
      const alterarPrevisaoSaida = async(evt) =>{
        if(inputPrevSaida !== ''){
        await alterarMes({previsao_saida : inputPrevSaida})
        infoMes.refetch()}
        setInputPrevSaida('')
  
      }
    if(infoMes.error === 'Permission denied'){
        return <Navigate to =  '/login'/>
      }
    if(infoMes.loading){
        return <p>Carregando dados do mes</p>
    }
    if(infoMes.data){
        return (
                <div>
                    <strong>Previsão entrada</strong> :{ infoMes.data.previsao_entrada}
                        <input type = 'number' 
                        placeholder = 'Nova previsão' 
                        onBlur = {alterarPrevisaoEntrada}
                        value = {inputPrevEntrada}
                        onChange = {evt => setInputPrevEntrada(parseFloat(evt.target.value))}/>
                    / 
                    <strong>Previsão saída</strong> : {infoMes.data.previsao_saida} 
                        <input type = 'number'
                        value = {inputPrevSaida}
                        onChange = {evt => setInputPrevSaida(parseFloat(evt.target.value))}
                        placeholder = 'Nova previsão'
                        onBlur = {alterarPrevisaoSaida}/>
                    <br/>
                    <strong>Entrada:</strong> {infoMes.data.entradas} / 
                    <strong>Saídas :</strong> {infoMes.data.saidas}
                </div>
        )
    
    }
    return (
        <div>
            <h1>info mes : {idMes}</h1>
        </div>
    )
}

export default InfoMes

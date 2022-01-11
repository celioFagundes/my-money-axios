import React from 'react'
import { Container } from 'react-bootstrap'
import AdicionarMes from './AdicionarMes'
import Meses from './Meses'

const Home = () => {
    return (
        <Container>
            <AdicionarMes/>
            <Meses/>
        </Container>
    )
}

export default Home

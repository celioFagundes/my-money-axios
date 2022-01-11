import React, {useState, useEffect} from 'react'
import {Container, Navbar ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const Header = () => {

    const [logado, setLogado] = useState(false)
    console.log(logado)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }else{
            setLogado(false)
        }
    })
    const logout = () =>{
        localStorage.removeItem('token')
        setLogado(false)
        window.location.reload()
    }
    return (
        
        <Navbar bg = 'dark' variant ='dark' expand ='md' fixed>
            <Container>
                <Navbar.Brand as = {Link} to ='/'>MyMoney</Navbar.Brand>
                {logado &&
                <Button onClick = {logout} variant="outline-danger">Sair</Button>
                }
                
            </Container>
        </Navbar>
        
    )
}
export default Header

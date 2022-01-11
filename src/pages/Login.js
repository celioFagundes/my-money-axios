import React, {useEffect,useState} from 'react'
import { usePost } from '../utils/rest'
import {Navigate} from 'react-router-dom'
import { Form ,Button, Container} from 'react-bootstrap'
const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVzTtUkimgqrMrbvtzcwLf9vZ55rh7CEk'

const Login = () => {

    const [postData, signIn] = usePost(url)
    const [logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha]= useState('')
    useEffect(() =>{
        if(Object.keys(postData.data).length > 0 ){
            localStorage.setItem('token', postData.data.idToken)
            window.location.reload()
        }
        
    },[postData])

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }
    })
    const login = async() =>{
        await signIn({
            email,
            password: senha,
            returnSecureToken : true
        })     
    }
    if(logado){
        return <Navigate to ='/'/>
    }
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange = {evt => setEmail(evt.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange = {evt => setSenha(evt.target.value)}/>
                </Form.Group>
                {postData.error && 
                    <p>Email ou senha invalidos</p>
                }
                <Button variant="primary" type="button" onClick = {login}>
                    Login
                </Button>
            </Form>
        
        </Container>
    )
}

export default Login

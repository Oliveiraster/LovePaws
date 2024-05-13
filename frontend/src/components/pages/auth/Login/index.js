import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { Context } from "../../../../context/UserContext"

import Input from '../../../form/Input'

import styles from './styles.module.css'

const Login = () => {

    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
    }

    
    return (
       <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input text='E-mail' type='text' name='email' placeholder='Digite seu email' handleOnChange={handleChange} />
                <Input text='Senha' type='password' name='password' placeholder='Digite sua senha' handleOnChange={handleChange} />
                <input type='submit' value='Entrar' />
            </form>
            <p>
                Não tem conta? <Link to={'/register'}>Clique aqui.</Link>
            </p>
        </section>
    )
  }
  export default Login
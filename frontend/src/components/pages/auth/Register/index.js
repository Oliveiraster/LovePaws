import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { Context } from "../../../../context/UserContext"

import Input from '../../../form/Input'

import styles from './styles.module.css'  


const Register = () => {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        register(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <Input text='Nome' type='text' name='name' placeholder='Digite seu nome' handleOnChange={handleChange} />
                <Input text='E-mail' type='text' name='email' placeholder='Digite seu email' handleOnChange={handleChange} />
                <Input text='Telefone' type='text' name='phone' placeholder='Digite seu Telefone' handleOnChange={handleChange} />
                <Input text='Senha' type='password' name='password' placeholder='Digite sua senha' handleOnChange={handleChange} />
                <Input text='Confirme a senha' type='password' name='confirmPassword' placeholder='Confirme sua senha' handleOnChange={handleChange} />
                <input type='submit' value='Cadastrar' />
            </form>
            <p>
                Já tem conta? <Link to={'/login'}>Clique aqui.</Link>
            </p>
        </section>
    )
  }
  export default Register
import api from '../utils/api'

import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
    const [auth, setAuth] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuth(true)
        }
    },[])

    async function register(user){
        
        let msgText = 'Cadastro realizado!'
        let msgType = 'sucesso'

        try {
            const data = await api.post('/users/register', user).then((res) =>{
                return res.data
            })
            await authUser(data)
        } catch (err) {
            msgText = err.response.data.message
            msgType = 'fail'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){
        setAuth(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate("/")
    }

    function logout(){
        const msgText = 'Logout realizado!'
        const msgType = 'sucesso'

        setAuth(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    async function login(user){
        let msgText = 'Logado com sucesso!'
        let msgType = 'sucesso'

        try {
            const data = await api.post('/users/user', user).then((res) =>{
            return res.data
            })
            await authUser(data)
            
        } catch (err) {
            msgText = err.response.data.message
            msgType = 'fail' 
        }
        setFlashMessage(msgText, msgType)
    }
    return{auth ,register, logout, login}
}
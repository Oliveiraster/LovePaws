import api from '../../../utils/api'

import { useEffect, useState} from "react";

import Input from "../../form/Input";
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoundedImage';

import styles from './styles.module.css';
import formStyles from './formStyles.module.css';


const Profile = () => {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState('')
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

   

    useEffect(() => {
        api.get('/users/checkuser', {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((res)=>{
            setUser(res.data)
        })
    }, [token])
    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }
    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let msgType = 'sucesso'
        
        const formData = new FormData()
        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multpart/form-data'
            }
        }).then((res) => {
            return res.data
        }).catch((err)=>{
            msgType = 'fail'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
        <div className={styles.profile_container}>
            <h1>Perfil</h1>
            {(user.image || preview) && (
                <RoundedImage src={ preview 
                    ? URL.createObjectURL(preview)
                    : `${process.env.REACT_APP_API}images/users/${user.image}` }
                     alt={user.name} />
            )}
        </div>
        <form onSubmit={handleSubmit} className={formStyles.form_container}>
            <Input text='Imagem' type='file' name='image' handleOnChange={onFileChange} />
            <Input text='Nome' type='text' name='name' placeholder='Digite seu Nome' handleOnChange={handleChange}  value={user.name|| '' }/>
            <Input text='E-mail' type='email' name='email' placeholder='Digite seu email' handleOnChange={handleChange}  value={user.email || '' }/>
            <Input text='Telefone' type='text' name='phone' placeholder='Digite seu telefone' handleOnChange={handleChange}  value={user.phone || '' }/>
            <Input text='Senha' type='password' name='password' placeholder='Digite sua senha' handleOnChange={handleChange}/>
            <Input text='Confirme senha' type='password' name='ConfirmPassword' placeholder='Confirme sua senha' handleOnChange={handleChange}/>
            
            <input type='submit' value='Editar' />
        
        </form>
        </section>
    )
  }
  export default Profile
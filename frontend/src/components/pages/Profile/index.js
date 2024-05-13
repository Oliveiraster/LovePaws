import { useState} from "react";


import Input from "../../form/Input";

import styles from './styles.module.css';
import formStyles from './formStyles.module.css';

const Profile = () => {

    const [user, setUser] = useState({})
    function onFileChange(e){
        setUser()
    }
    function handleChange(e){
        
    }

    return (
        <section>
        <div className={styles.profile_container}>
            <h1>Perfil</h1>
            <p>Preview Imagem</p>
        </div>
        <form className={formStyles.form_container}>
            <Input text='Imagem' type='file' name='image' handleOnChange={onFileChange} />
            <Input text='Nome' type='text' name='name' placeholder='Digite seu Nome' handleOnChange={handleChange}  value={user.nome|| '' }/>
            <Input text='E-mail' type='email' name='email' placeholder='Digite seu email' handleOnChange={handleChange}  value={user.email || '' }/>
            <Input text='Telefone' type='text' name='phone' placeholder='Digite seu telefone' handleOnChange={handleChange}  value={user.phone || '' }/>
            <Input text='Senha' type='password' name='password' placeholder='Digite sua senha' handleOnChange={handleChange}/>
            <Input text='Confirme senha' type='password' name='ConfirmPassword' placeholder='Confirme sua senha' handleOnChange={handleChange}/>
            
        
        
        </form>
        </section>
    )
  }
  export default Profile
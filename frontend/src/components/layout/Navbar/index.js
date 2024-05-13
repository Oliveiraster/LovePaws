import { Link } from "react-router-dom"
import Logo from '../../../assets/img/logo.png'
import styles from './styles.module.css'

import { useContext } from "react"
import {Context} from '../../../context/UserContext'

const Navbar= () => {

    const {auth, logout} = useContext(Context)

    return (
       <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>
            <img src={Logo} alt="Pet Store" />
            <h2>LovePaws</h2>
        </div>
        <ul>
            <li> <Link to={'/'}>Adotar</Link> </li>
            {auth ? (<>
                <li> <Link to={'/profile'}>Perfil</Link> </li>
                <li onClick={logout}>Sair</li> 
            </>):(<>
                <li> <Link to={'/login'}>Entrar</Link> </li>
                <li> <Link to={'/register'}>Cadastrar</Link> </li>
            </>)}     
        </ul>
       </nav>
    )
  }
  export default Navbar
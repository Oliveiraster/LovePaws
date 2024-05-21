import api from '../../../../utils/api'

import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'

import styles from './styles.module.css'

import useFlashMessage from '../../../../hooks/useFlashMessage'
import RoundedImage from '../../../layout/RoundedImage'

const PetDetails = () =>{
    const [pet, setPet] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()
    const [token] = useState(localStorage.getItem('token')|| '')
    useEffect(() => {
        api.get(`pets/${id}`).then((res) => {
            setPet(res.data.pet)
        })
    }, [id])

    const schedule = async () => {
        let msgType = 'sucesso'

        const data = await api.patch(`pets/toMark/${pet._id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((res) => {
            return res.data
        }).catch((err) => {
            msgType = 'fail'
            console.log(err.response.data)
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }
    return(<>
        {pet.name && (
            <section className={styles.pet_details_container}>
                <div className={styles.pet_details_header}>
                    <h1>Conhecendo o Pet: {pet.name}</h1>
                    <p>Se tiver interesse, marqui uma visita para conhece-lo</p>
                </div>
                <div className={styles.pet_images}>
                    {pet.images.map((image, index) =>(
                        <img src={`${process.env.REACT_APP_API}images/pets/${image}`} alt={pet.name} key={index} />
                    ))}
                </div>
                <p>
                    <span className='bold'>Peso:</span> {pet.weight}kg
                </p>
                <p>
                    <span className='bold'>Idade:</span> {pet.age}anos
                </p>
                {token ? (<button onClick={schedule}>Solicitar uma visita</button>) : (<p>Voce precisa <Link to='/register'>Cria uma conta</Link> para solicitar a visita</p>)}
            </section>
        )}  
    </>)
}

export default PetDetails
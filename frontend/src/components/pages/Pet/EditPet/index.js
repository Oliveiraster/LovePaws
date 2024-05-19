import api from '../../../../utils/api'
import PetForm from '../../../form/PetForm'
import styles from '../AddPet/styles.module.css'

import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import useFlashMessage from '../../../../hooks/useFlashMessage'

const EditPet = () =>{
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
   
    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((res) =>
            setPet(res.data.pet)
        )
    },[token, id])

    const attPet = async (pet) =>{
        let msgType = 'sucesso'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`/pets/${pet._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multpart/form-data'
            }
        }).then((res)=>{
            return res.data
        }).catch((err) =>{
            msgType = 'fail'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }
    return(
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o pet: {pet.name}</h1>
                <p>edição</p>
            </div>
            {pet.name && 
                <PetForm handleSubmit={attPet} btnText='Atualizar' petData={pet} />
            }
        </section>
    )
}

export default EditPet
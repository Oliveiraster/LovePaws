import styles from './styles.module.css'

import api from '../../../../utils/api'

import { useState } from 'react'
import { useNavigate } from "react-router-dom"


import useFlashMessage from '../../../../hooks/useFlashMessage'
import PetForm from '../../../form/PetForm'

const AddPet = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet){
        let msgType = 'sucesso'

        const formData = new FormData()

        const petFormData = await Object.keys(pet).forEach((key) => {
        if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
            formData.append(`images`, pet[key][i])
            }
        } else {
            formData.append(key, pet[key])
        }
        })

        formData.append('pet', petFormData)

        const data = await api
        .post(`/pets/create`, formData, {
            headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            msgType = 'fail'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'fail'){
            navigate('/pet/mypets')
        }
    }
    return (
        <section className={styles.addpetHeader}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Disponivel pra adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar pet' />
        </section>
    )
  }
  export default AddPet
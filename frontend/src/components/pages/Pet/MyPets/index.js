import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from '../../../../utils/api'
import styles from './styles.module.css'
import useFlashMessage from "../../../../hooks/useFlashMessage"
import RoundedImage from "../../../layout/RoundedImage"

const MyPets = () => {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    useEffect(() =>{
        api.get('/pets/mypets', {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((res) => {
            setPets(res.data.pets)
        })
    }, [token])

    const removePet = async (id) => {
        let msgType = 'sucesso'

        const data = await api.delete(`pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((res) => {
            const downPets = pets.filter((pet) => pet._id !== id)
            setPets(downPets)
            return res.data
        })
        .catch((err) => {
            msgType = 'fail'
            return err.response.data
        })  
        setFlashMessage(data.message, msgType)
    }
    
    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Meu Pets</h1>
                <Link to='/pet/add'>Cadastrar Pet</Link>
            </div>
            <div className={styles.petslist_container}>
                {pets.length > 0 && pets.map((pet) => (
                    <div key={pet._id} className={styles.petlist_row}>
                        <RoundedImage
                            src={`${process.env.REACT_APP_API}images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width="px75"
                        />
                        <span className="bold">{pet.name}</span>
                        <div className={styles.actions}>
                            {pet.available? 
                            (<>
                                {pet.adopter && (
                                     <button 
                                     className={styles.conclude_btn}>Concluir adoção</button>
                                )}
                                <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                <button onClick={() => {
                                    removePet(pet._id)
                                }}
                                >Excluir
                                </button>
                               
                            </>): <p>adotado</p> }
                        </div>
                    </div>
                    ))
                }
                {pets.length === 0 && <p>Não há pets cadastrado s</p>}
            </div>
        </section>
    )
  }
  export default MyPets
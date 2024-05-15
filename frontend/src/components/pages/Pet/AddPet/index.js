import styles from './styles.module.css'

import api from '../../../../utils/api'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useFlashMessage from '../../../../hooks/useFlashMessage'

const AddPet = () => {
    
    return (
        <section className={styles.addpetHeader}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Disponivel pra adoção</p>
            </div>
            <p>formuladio</p>
        </section>
    )
  }
  export default AddPet
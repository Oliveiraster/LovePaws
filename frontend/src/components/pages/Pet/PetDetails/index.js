import api from '../../../../utils/api'

import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'

import styles from './styles.module.css'

import useFlashMessage from '../../../../hooks/useFlashMessage'

const PetDetails = () =>{
    const {setFlashMessage} = useFlashMessage()

    return(
        <h1>Detalhe pet</h1>
    )
}

export default PetDetails
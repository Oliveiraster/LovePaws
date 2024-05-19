import {useState} from 'react'

import styles from './styles.module.css'

import Input from '../Input'
import Select from '../Select'
import RoundedImage from '../../layout/RoundedImage'

function PetForm({petData, handleSubmit, btnText}){
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

    function onFileChange(e){
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }
    function handleChange(e){
        setPet({...pet, [e.target.name]: e.target.value})
    }
    function handleColor(e){
         setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e){
        e.preventDefault()
        handleSubmit(pet)
    }
    return(
       <form onSubmit={submit} className={styles.form_container}>
        <div className={styles.box}>
            {preview.length > 0 ? preview.map((image, index) => (
                <RoundedImage src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
            )): 
            pet.images && pet.images.map((image, index) => (
                 <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
                 alt={pet.name} 
                 key={`${pet.name}+${index}`} />
            ))
            }
        </div>
        <Input text='Imagens do pet' 
        type='file' 
        name='images' 
        handleOnChange={onFileChange} 
        multiple={true} />

        <Input text='Nome do pet' 
        type='text' 
        name='name'  
        placeholder='Digete o nome' 
        handleOnChange={handleChange} 
        multiple={true}
        value={pet.name || ''} />

        <Input text='Idade do pet' 
        type='number' 
        name='age'  
        placeholder='Digite a idade' 
        handleOnChange={handleChange} 
        multiple={true}
        value={pet.age || ''} />

        <Input text='Peso do pet' 
        type='number' 
        name='weight'  
        placeholder='Digite o peso' 
        handleOnChange={handleChange} 
        multiple={true}
        value={pet.weight || ''} />

        <Select name='color' text='Selecione a cor' options={colors} handleOnChange={handleColor} value={pet.color} />
    

        <input type='submit' value={btnText} />


       </form>
       
    )
}
export default PetForm
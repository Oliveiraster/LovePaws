const Pet = require('../models/Pet')

const getToken = require('../helpers/getToken')
const getTokenUser = require('../helpers/getTokenUser')
const ObjectId = require('mongoose')

module.exports = class PetController{
    static async create(req, res){

      const {name, age, weight, color} = req.body
      const image = req.files
      const available = true

      const validations = [
        { campo: name, message: 'O nome é obrigatório!' },
        { campo: age, message: 'A idade é obrigatório!' },
        { campo: weight, message: 'O peso é obrigatória!' },
        { campo: color, message: 'A cor é obrigatória!' },
      ]  
      for( const objCampo of validations){
        if (!objCampo.campo){
            return res.status(422).json({message: objCampo.message})
        } 
      }
      if(image.length === 0){
         return res.status(422).json({message:'A imagem é obrigatoria!'})
      }
      const user = await getTokenUser(getToken(req))

      const pet = new Pet({
        name,
        age,
        weight,
        color,
        available,
        images:[],
        user:{
            _id: user._id,
            name: user.name,
            image: user.image,
            phone: user.phone
        }
      })

      image.map(image => {
        pet.images.push(image.filename)
      })

      try {
        const newPet = await pet.save()
        res.status(201).json({message: `${newPet.name} cadastrado! `, newPet})
      } catch (err) {
        
      }
    }

    static async getAllPets(req, res){
       const pets = await Pet.find().sort('-createdAt')

       res.status(201).json({pets: pets})
    }
    
    static async getMyPets(req, res){

      const user = await getTokenUser(getToken(req))
      const myPets = await Pet.find({'user._id': user._id}).sort('-createdAt')

      res.status(200).json({pets: myPets})
    }

    static async getAllUserAdoptions(req, res){

      const user = await getTokenUser(getToken(req))
      const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

      res.status(200).json({ pets })
    }

    static async getPetId(req, res){
      const id  =  req.params.id  
      if(!ObjectId.isValid(id)){
        return res.status(422).json({message: 'ID invalido'})
      }

      const pet = await Pet.findOne({_id: id})

      if(!pet){
         return res.status(404).json({message: 'Pet não encontrado!'})
      }

      return res.status(200).json({pets:pet})
    }

    static async removePet(req, res){
       const id  =  req.params.id 
       
       if(!ObjectId.isValid(id)){
        return res.status(422).json({message: 'ID invalido'})
      }

      const pet = await Pet.findOne({_id: id})

      if(!pet){
         return res.status(404).json({message: 'Pet não encontrado!'})
      }
      
      const user = await getTokenUser(getToken(req))

      if(pet.user._id.toString() !== user._id.toString()){
        return res.status(422).json({message: 'Problema ao verificar sua solicitação!'})
      }

      await Pet.findByIdAndDelete(id)
      res.status(200).json({message:' Pet removido!'})
    }

    static async attPet(req, res){
      const id = req.params.id
      const {name, age, weight, color} = req.body
      const images = req.files
      const upData = {}
     
       const validations = [
        { campo: name, message: 'O nome é obrigatório!' },
        { campo: age, message: 'A idade é obrigatório!' },
        { campo: weight, message: 'O peso é obrigatória!' },
        { campo: color, message: 'A cor é obrigatória!' },
      ]  
      for( const objCampo of validations){
        if (!objCampo.campo){
            return res.status(422).json({message: objCampo.message})
        } 
      }
      upData.name = name
      upData.age = age
      upData.weight = weight
      upData.color = color

      if(images.length === 0){
        return res.status(422).json({message:'A imagem é obrigatoria!'})
      } else {
        upData.images = []
        images.map((image) => {
          upData.images.puss(image.filename)
        })
      }

      const pet = await Pet.findOne({_id: id})

      if(!pet){
        return res.status(404).json({message: 'Pet não encontrado!'})
      }
      await Pet.findByIdAndUpdate(id, upData)
      return res.status(200).json({message: 'Pet atualizado!'})
    }

    static async toMark(req, res){
      const id = params.id
      
      const pet = await Pet.findOne({_id: id})

      if(!pet){
        return res.status(404).json({message: 'Pet não encontrado!'})
      }

      const user = await getTokenUser(getToken(req))

      if(pet.user._id.equals(user._id)){
        return res.status(422).json({message: 'Não pode agender visata com seu pet'})
      }

      if(pet.adopter?._id.equals(user._id)){
        return res.status(422).json({message: 'Você já agendeu uma visita para este pet!'})
      }

      pet.adopter = {
        _id: user.id,
        name: user.name,
        image: user.image
      }
      await Pet.findByIdAndUpdate(id, pet)
      return res.status(200).json({message: `Visita agendada entre em contato com ${pet.user.name} atravez do teleone ${pet.user.phone} .` })
    }

    static async concludeAdoption(req, res){
      const id = req.params.id

      const pet = await Pet.findOne({_id: id})

      if(!pet){
         return res.status(404).json({message: 'Pet não encontrado!'})
      }

      if(pet.user._id.toString() !== user._id.toString()){
        return res.status(422).json({message: 'Problema ao verificar sua solicitação!'})
      }

       pet.available = false

       await Pet.findByIdAndUpdate(id, pet)

       res.status(200).json({message: 'Parabéns, processo de adoção concluido'})
    }
} 
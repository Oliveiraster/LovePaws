const createUserToken = require('../helpers/createUserToken')
const getToken = require('../helpers/getToken')
const getTokenUser = require('../helpers/getTokenUser')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class UserController{
    static async register(req, res){
      const {name, email, password, confirmPassword, phone} = req.body
      //validations
      const validations = [
        { campo: name, message: 'O nome é obrigatório!' },
        { campo: email, message: 'O email é obrigatório!' },
        { campo: password, message: 'A senha é obrigatória!' },
        { campo: confirmPassword, message: 'A confirmação da senha é obrigatória!' },
        { campo: phone, message: 'O telefone é obrigatório!' }
      ]  
      for( const objCampo of validations){
        if (!objCampo.campo){
            return res.status(422).json({message: objCampo.message})
        } 
      }
      if (password !== confirmPassword){
            return res.status(422).json({message:"Senhas nao correspondem"})
        }
      // verificando se usuario existe
      const userExist = await User.findOne({email:email})

      if(userExist){
        return res.status(422).json({message:'Por Favor, utilize outro e-mail'})
      }
      // Criptografando senha 
      const salt = await bcrypt.genSalt(12)
      const passHash = await bcrypt.hash(password,salt)
      // Criando usuario
      const user = new User({
        name,
        email,
        phone,
        password: passHash
      })
      try {
        const newUser = await user.save()

        await createUserToken(newUser, req, res)
      } catch(err){
        return res.status(500).json({message: err})
      }
    }

    static async Login(req,res){
      const { email, password} = req.body
      const data = await User.findOne({ email: email})
      if(!data){
        return res.status(422).json({message: 'Usuario não encontrado!'})
      }
      const validPassword = await bcrypt.compare(password, data.password)
      if(!validPassword){
        return res.status(422).json({message: 'Senha invalida'})
      }

      return await createUserToken(data,req,res)
      
    }

    static async checkUser(req,res){

      let currentUser

      if (req.headers.authorization){
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')

        currentUser = await User.findById(decoded.id).select('-password')
       
      } else {
        currentUser = null
      }
      
      res.status(200).send(currentUser)
    }
    static async getUserById(req,res){
      const id = req.params.id

      const user = await User.findById(id).select('-password')

      if(!user){
        return res.status(422).json({message: 'Usuario não encontrado'})
      }

      return res.status(200).json({user})
    }

    static async editUser(req, res) {

    const data = await getTokenUser(getToken(req))

    const {name, email, phone, password, confirmPassword} = req.body
  

    let image = ''

    if(req.file){
      data.image = req.file.filename
    }

    if (!name) {  
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }
    data.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    const userExists = await User.findOne({ email: email })

    if (data.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    data.email = email

    if (image) {
      const imageName = req.file.filename
      data.image = imageName
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    data.phone = phone

    if (password !== confirmPassword) {
      res.status(422).json({ error: 'As senhas não conferem.' })
    } else if (password === confirmPassword && password ) {

      const salt = await bcrypt.genSalt(12)
      const password= req.body.password

      const passHash = await bcrypt.hash(password, salt)

      data.password = passHash
    }

    try {
    await User.findOneAndUpdate(
        { _id: data._id },
        { $set: data },
        { new: true },
      )
      res.json({ message: 'Usuário atualizado!' })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}


    
const jwt = require('jsonwebtoken')
const getToken = require('./getToken')

const auth = (req, res, next)=> {
   
    if (!req.headers.authorization){
        return res.status(401).json({message: 'Não Autenticado!!'})
    }

    const token = getToken(req)
    if (!token){
        return res.status(401).json({message: 'Não Autenticado!!'})
    }

    try{
        const authToken = jwt.verify(token, 'nossosecret')
        req.user = authToken
        next()
    } catch(err){
        return res.status(400).json({message: 'Token invalido!'})
    }
}

module.exports = auth
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getTokenUser = async (token) =>{
    const decoded = jwt.verify(token, 'nossosecret')

    const user = await User.findOne({_id: decoded.id})

    return user
}

module.exports = getTokenUser
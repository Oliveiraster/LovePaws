const router = require('express').Router()

const UserController = require('../controllers/UserController')

const auth = require('../helpers/auth')
const imgUp = require('../helpers/imgs')

    router.post('/register', UserController.register)
    router.post('/user', UserController.Login)
    router.get('/checkuser', UserController.checkUser)
    router.get('/:id', UserController.getUserById)
    router.patch('/edit/:id',auth, imgUp.single('image'), UserController.editUser)

module.exports = router
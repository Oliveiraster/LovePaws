const router = require('express').Router()

const auth = require('../helpers/auth')
const imgUp = require('../helpers/imgs')

const PetController = require('../controllers/PetController')

router.post('/create', auth, imgUp.array('images'), PetController.create)
router.get('/', PetController.getAllPets)
router.get('/mypets', auth, PetController.getMyPets)
router.get('/myadoptions', auth, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetId)
router.delete('/:id',auth, PetController.removePet)
router.patch('/:id', auth, imgUp.array('images'), PetController.attPet)
router.patch('/toMark/:id', auth, PetController.toMark)
router.patch('/conclude/:id', auth, PetController.concludeAdoption)


module.exports = router
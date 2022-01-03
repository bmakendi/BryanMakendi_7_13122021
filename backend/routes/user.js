const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//When a user signs up, a request gets sent to this path
router.post('/signup', userCtrl.signup)

//When a user tries to login, a request gets sent to this path
router.post('/login', userCtrl.login)

//When a user wants to update his profile picture or/and his job title, a request gets sent to this path
router.put('/:id', auth, multer, userCtrl.modifyUser)

//When a user wants to delete its account, a request gets sent to this path
router.delete('/:id', auth, userCtrl.deleteUser)

//When you go on a user's profile, a request gets sent to this path
router.get('/:id', userCtrl.getUser)

module.exports = router

const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

//When an user signs up, a request gets sent to this path
router.post('/signup', userCtrl.signup)

//When an user tries to login, a request gets sent to this path
router.post('/login', userCtrl.login)

module.exports = router

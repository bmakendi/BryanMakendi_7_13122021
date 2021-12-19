const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth')

/**
 * post like
 * get all likes
 * delete like
 */

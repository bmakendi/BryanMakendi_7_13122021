const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth')

/**
 * A post comment, get all comments, delete comment route
 */

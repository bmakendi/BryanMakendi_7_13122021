const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth')

//Posting an article sends a request to this path
router.post('/post', auth, articleCtrl.postArticle)

//Fetching all articles sends a request to this path
/* router.get('/', auth, articleCtrl.getArticles)

//Fetching one article sends a request to this path
router.get('/:id', auth, articleCtrl.getOneArticle) */

module.exports = router

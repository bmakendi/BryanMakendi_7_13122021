const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth')

//Posting an article sends a request to this path
router.post('/post', auth, articleCtrl.postArticle)

//Updating an article sends a request to this path
router.put('/:id', auth, articleCtrl.modifyArticle)

//Fetching all articles sends a request to this path
router.get('/', auth, articleCtrl.getArticles)

//Fetching one article sends a request to this path
router.get('/:id', auth, articleCtrl.getOneArticle)

//Deleting an article sends a request to this path
router.delete('/:id', auth, articleCtrl.deleteArticle)

module.exports = router

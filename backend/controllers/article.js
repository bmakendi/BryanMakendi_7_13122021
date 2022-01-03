const db = require('../models')
const Article = db.article
const User = db.user

exports.postArticle = (req, res, next) => {
  if (
    !req.body.article.title ||
    !req.body.article.content ||
    !req.body.userId
  ) {
    return res.status(400).send(new Error('Bad request !'))
  }
  Article.create({
    title: req.body.article.title,
    content: req.body.article.content,
    UserId: req.body.userId,
  })
    .then(() => res.status(201).json({ message: 'Article posté !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyArticle = (req, res, next) => {}

exports.getArticles = (req, res, next) => {
  Article.findAll({
    include: [
      { model: User, attributes: ['name', 'firstname', 'pictureUrl', 'admin'] },
    ],
  })
    .then(articles => res.status(200).json(articles))
    .catch(error =>
      res
        .status(404)
        .json({ message: 'Aucun article de posté !', error: error })
    )
}

exports.getOneArticle = (req, res, next) => {}

exports.deleteArticle = (req, res, next) => {}

const db = require('../models')
const Article = db.article
const User = db.user
const Comment = db.comment

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
      {
        model: User,
        attributes: ['name', 'firstname', 'pictureUrl', 'admin'],
      },
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

exports.postComment = (req, res, next) => {
  if (
    !req.body.comment.content ||
    !req.body.userId ||
    !req.body.firstname ||
    !req.body.name ||
    !req.body.articleId
  ) {
    return res.status(400).send(new Error('Bad request !'))
  }
  Comment.create({
    content: req.body.comment.content,
    firstname: req.body.firstname,
    name: req.body.name,
    UserId: req.body.userId,
    ArticleId: req.body.articleId,
  })
    .then(() => res.status(201).json({ message: 'Commentaire posté !' }))
    .catch(error =>
      res.status(400).json({
        message: 'Erreur lors de la publication du commentaire',
        error,
      })
    )
}

exports.getComments = (req, res, next) => {}

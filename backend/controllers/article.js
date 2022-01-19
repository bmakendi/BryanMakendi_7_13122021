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
    return res
      .status(400)
      .json({
        message: 'Mauvaise requête, besoin de userId et un objet article',
      })
  }
  Article.create({
    title: req.body.article.title,
    content: req.body.article.content,
    UserId: req.body.userId,
  })
    .then(() => res.status(201).json({ message: 'Article posté !' }))
    .catch(error =>
      res
        .status(400)
        .json({ message: 'Erreur lors de la création du post', error })
    )
}

exports.modifyArticle = (req, res, next) => {
  if (
    !req.body.article.title ||
    !req.body.article.content ||
    !req.body.userId
  ) {
    return res
      .status(400)
      .json({
        message: 'Mauvaise requête, besoin de userId et un objet article',
      })
  }
  Article.update(
    {
      title: req.body.article.title,
      content: req.body.article.content,
      UserId: req.body.userId,
    },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(201).json({ message: 'Article modifié !' }))
    .catch(error =>
      res
        .status(400)
        .json({ message: 'Erreur lors de la modification du post', error })
    )
}

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

exports.getOneArticle = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send(new Error('Bad request ! Need a userId.'))
  }
  Article.findOne({ where: { id: req.params.id } })
    .then(article => res.status(200).json(article))
    .catch(error =>
      res.status(404).json({ message: 'Article introuvable.', error })
    )
}

exports.deleteArticle = (req, res, next) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: 'Mauvaise requête, manque id en paramètre' })
  }
  if (!req.body.admin) {
    return res.status(400).json({ message: 'Il manque admin dans le body' })
  }
  Article.findOne({ where: { id: req.params.id } }).then(article => {
    if (req.body.userId !== article.UserId && req.body.admin === 'false')
      return res.status(401).json({
        message: "Vous n'avez pas l'autorisation de supprimer cet utilisateur.",
      })
  })
  Article.destroy({ where: { id: req.params.id } })
    .then(deleted => {
      return res.status(200).json({ message: deleted + ' article supprimé !' })
    })
    .catch(error => res.status(400).json({ error }))
}

exports.postComment = (req, res, next) => {
  if (!req.body.comment.content || !req.body.userId || !req.params.articleId) {
    return res.status(400).send(new Error('Bad request !'))
  }
  const comment = new Comment({
    content: req.body.comment.content,
    firstname: req.body.firstname,
    name: req.body.name,
    UserId: req.body.userId,
    ArticleId: req.params.articleId,
  })
  comment
    .save()
    .then(() => res.status(201).json({ message: 'Commentaire posté !' }))
    .catch(error =>
      res.status(400).json({
        message: 'Erreur lors de la publication du commentaire',
        error,
      })
    )
}

exports.getComments = (req, res, next) => {
  if (!req.params.articleId) {
    return res
      .status(400)
      .send(new Error('Bad request ! Need an id in parameters.'))
  }
  Comment.findAll({ where: { ArticleId: req.params.articleId } })
    .then(comments => res.status(200).json(comments))
    .catch(error =>
      res.status(404).json({ message: 'Aucun commentaire de trouvé.', error })
    )
}

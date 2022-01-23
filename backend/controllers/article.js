const db = require('../models')
const Article = db.article
const User = db.user
const Comment = db.comment
const Like = db.like

exports.postArticle = (req, res, next) => {
  if (
    !req.body.article.title ||
    !req.body.article.content ||
    !req.body.userId
  ) {
    return res.status(400).json({
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
  if (!req.body.article.content || !req.body.userId) {
    return res.status(400).json({
      erreur: 'Mauvaise requête, besoin de userId et un objet article',
    })
  }
  Article.update(
    {
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
  Article.findOne({ where: { id: req.params.id } }).then(article => {
    if (req.body.userId !== article.UserId && req.body.admin === 'false')
      return res.status(401).json({
        message: "Vous n'avez pas l'autorisation de supprimer cet article.",
      })
  })
  Article.destroy({ where: { id: req.params.id } })
    .then(deleted => {
      return res.status(200).json({ message: deleted + ' article supprimé !' })
    })
    .catch(error => res.status(400).json({ error }))
}

exports.postComment = (req, res, next) => {
  if (!req.body.content || !req.body.userId || !req.params.articleId) {
    return res
      .status(400)
      .json({ message: 'mauvaise requête, manque des trucs dans le body' })
  }
  Comment.create({
    content: req.body.content,
    UserId: req.body.userId,
    ArticleId: req.params.articleId,
  })
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
  Comment.findAll({
    where: { ArticleId: req.params.articleId },
    include: [
      {
        model: User,
        attributes: ['name', 'firstname', 'pictureUrl', 'admin'],
      },
    ],
  })
    .then(comments => res.status(200).json(comments))
    .catch(error =>
      res.status(404).json({ message: 'Aucun commentaire de trouvé.', error })
    )
}

exports.deleteComment = (req, res, next) => {
  if (!req.params.commentId) {
    return res.status(400).json({
      message: 'Mauvaise requête, manque id du commentaire en paramètre',
    })
  }
  Comment.findOne({ where: { id: req.params.commentId } }).then(comment => {
    if (req.body.userId !== comment.UserId && req.body.admin === 'false')
      return res.status(401).json({
        message: "Vous n'avez pas l'autorisation de supprimer ce commentaire.",
      })
  })
  Comment.destroy({ where: { id: req.params.commentId } })
    .then(deleted => {
      return res
        .status(200)
        .json({ message: deleted + ' commentaire supprimé !' })
    })
    .catch(error =>
      res.status(400).json({
        message: 'Erreur lors de la suppression du commentaire',
        error,
      })
    )
}

//LIKES

exports.likePost = (req, res, next) => {
  if (!req.body.userId || !req.params.articleId) {
    return res.status(400).json({
      message: 'Mauvaise requête, besoin de body.userId et articleId en param',
    })
  }
  Like.create({
    UserId: req.body.userId,
    ArticleId: req.params.articleId,
  })
    .then(() => res.status(201).json({ message: 'Like posé !' }))
    .catch(error =>
      res.status(400).json({
        message: 'Erreur avec le like !',
        error,
      })
    )
}

exports.getLikes = (req, res, next) => {
  if (!req.params.articleId) {
    return res
      .status(400)
      .json({ message: 'mauvaise requête faut faire un effort' })
  }
  Like.findAll({
    where: { ArticleId: req.params.articleId },
  })
    .then(likes => res.status(200).json(likes))
    .catch(error =>
      res.status(404).json({ message: 'Aucun like de trouvé.', error })
    )
}

exports.unlikePost = (req, res, next) => {
  if (!req.body.userId || !req.params.articleId) {
    return res.status(400).json({ message: 'need articleId in params' })
  }
  Like.destroy({
    where: { ArticleId: req.params.articleId, UserId: req.body.userId },
  })
    .then(deleted => {
      return res.status(200).json({ message: deleted + ' like supprimé !' })
    })
    .catch(error =>
      res.status(400).json({
        message: 'Erreur lors de la suppression du like',
        error,
      })
    )
}

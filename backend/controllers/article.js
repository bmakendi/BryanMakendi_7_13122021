const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const Article = db.article

exports.postArticle = (req, res, next) => {
  if (
    !req.body.article.title ||
    !req.body.article.content ||
    !req.body.article.UserId
  ) {
    return res
      .status(400)
      .send(new Error('Bad request at signup ! Check your entries.'))
  }
  Article.create({
    title: req.body.article.title,
    content: req.body.article.content,
    UserId: req.body.article.UserId,
  })
    .then(() => res.status(201).json({ message: 'Article posté !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getArticles = (req, res, next) => {}

exports.getOneArticle = (req, res, next) => {}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user
const fs = require('fs')

/**
 * Signing up leads to this function
 * We use bcrypt to hide the user's password in the database, then we save the user's info
 */
exports.signup = (req, res, next) => {
  if (
    !req.body.password ||
    !req.body.email ||
    !req.body.name ||
    !req.body.firstname
  ) {
    return res
      .status(400)
      .send(new Error('Bad request at signup ! Check your entries.'))
  }
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        firstname: req.body.firstname,
      })
        .then(() =>
          res.status(201).json({
            message: 'Inscription réussie, utilisateur créé !',
          })
        )
        .catch(error => res.status(400).json({ error: error }))
    })
    .catch(error => res.status(500).json({ error: error }))
}

/**
 * Logging into one's account leads to this function.
 */
exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send(new Error('Bad request at login ! Check your entries.'))
  }
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user)
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid)
            return res.status(401).json({ error: 'Mauvais mot de passe !' }) //Couldn't log in since passwords don't match each other
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
              expiresIn: '24h',
            }),
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error: error }))
}

/**
 * Updating a profile picture or a job title will lead to this function.
 */
exports.modify = (req, res, next) => {
  if (req.file) {
    User.findOne({ where: { id: req.body.id } })
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        if (user.pictureUrl) {
          const filename = user.pictureUrl.split('/images/')[1]
          fs.unlink('images/' + filename, error => {
            if (error) throw error
          })
        }
      })
      .catch(error => res.status(500).json({ error: error }))
    User.update(
      {
        pictureUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      },
      { where: { id: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: 'Photo bien modifié !' }))
      .catch(error =>
        res.status(400).json({
          message: 'Erreur lors de la modification de la photo : ' + error,
        })
      )
  } else {
    User.update(
      { job: req.body.changes.job },
      { where: { id: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: 'Job bien modifié !' }))
      .catch(error =>
        res
          .status(400)
          .json({ message: 'Erreur lors de la modification du job : ' + error })
      )
  }
}

/**
 * Deleting an account will lead to this function.
 */
exports.delete = (req, res, next) => {
  User.destroy({ where: { id: req.body.id } })
    .then(user => {
      return res.status(200).json({ message: user + ' utilisateur supprimé !' })
    })
    .catch(error => res.status(400).json({ error }))
}

/**
 * Clicking on a user's profile leads to this function.
 * Password is excluded from the response.
 */
exports.getUser = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send(new Error('Bad request ! Need a userId.'))
  }
  User.scope('withoutPassword')
    .findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error =>
      res.status(404).json({ message: 'Utilisateur introuvable.' })
    )
}

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
            userId: user.uid,
            token: jwt.sign({ userId: user.uid }, process.env.SECRET_KEY, {
              expiresIn: '24h',
            }),
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error: error }))
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('User ID non valable !')
    } else {
      next()
    }
  } catch (error) {
    res.status(403).json({ error: error | 'Utilisateur non autorisé !' })
  }
}

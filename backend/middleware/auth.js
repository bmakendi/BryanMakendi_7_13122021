const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decodedToken.userId
    if (
      req.body.userId &&
      parseInt(req.body.userId) !== parseInt(userId) &&
      req.params.id &&
      parseInt(req.params.id) !== parseInt(userId)
    ) {
      return res.status(403).json({
        message: "Vous n'avez pas l'autorisation d'effectuer cette requête.",
      })
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({
      message: "Vous n'avez pas l'autorisation d'effectuer cette requête.",
      error,
    })
  }
}

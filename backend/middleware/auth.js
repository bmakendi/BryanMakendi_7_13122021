const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decodedToken.userId
    console.log('User Id i have to verify: ' + userId)
    console.log('le body de la requête: ' + req.body)
    if (req.body.userId && parseInt(req.body.userId) !== parseInt(userId)) {
      return res.status(403).json({ error: 'Forbidden request sorry.' })
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized !' })
  }
}

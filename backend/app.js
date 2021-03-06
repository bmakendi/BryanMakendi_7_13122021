//Server behavior
const express = require('express')
const path = require('path')

const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const likeRoutes = require('./routes/like')

const app = express()

//Setting request headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

//Parsing json
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
//User request will end up on these routes
app.use('/auth', userRoutes)
app.use('/articles', articleRoutes)
app.use('/likes', likeRoutes)
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello world' })
})

module.exports = app

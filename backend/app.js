//Server behavior
const express = require('express')
const userRoutes = require('./routes/user')
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

app.use('/api/auth', userRoutes)
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello world' })
})

module.exports = app

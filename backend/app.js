//Server behavior
const express = require('express')
const { Sequelize } = require('sequelize')
require('dotenv').config()

const app = express()

//Connecting to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('connection réussie !')
  })
  .catch(error => {
    console.log('Erreur, connection échouée:', error)
  })

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

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello world' })
})

module.exports = app

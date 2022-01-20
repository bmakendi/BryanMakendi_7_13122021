const fs = require('fs')
const path = require('path')
const { Sequelize } = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}

//sequelize cli configuration | Do not modify
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

//Defining Models
db.user = require('./User')(sequelize, Sequelize)
db.article = require('./Article')(sequelize, Sequelize)
db.like = require('./Like')(sequelize, Sequelize)
db.comment = require('./Comment')(sequelize, Sequelize)

//Associations

//One to many between an article and a user
db.user.hasMany(db.article, { onDelete: 'CASCADE' })
db.article.belongsTo(db.user, { onDelete: 'CASCADE' })

//One to many between users and articles through likes table
db.user.hasMany(db.like, { onDelete: 'CASCADE' })
db.like.belongsTo(db.user, { onDelete: 'CASCADE' })
db.article.hasMany(db.like, { onDelete: 'CASCADE' })
db.like.belongsTo(db.article, { onDelete: 'CASCADE' })

//One to many between users and articles through comments table
db.user.hasMany(db.comment, { onDelete: 'CASCADE' })
db.comment.belongsTo(db.user, { onDelete: 'CASCADE' })
db.article.hasMany(db.comment, { onDelete: 'CASCADE' })
db.comment.belongsTo(db.article, { onDelete: 'CASCADE' })

module.exports = db

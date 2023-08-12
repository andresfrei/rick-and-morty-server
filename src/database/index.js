const { Sequelize } = require('sequelize')

const database = process.env.DB_DATABASE
const userName = process.env.DB_USERNAME
const host = process.env.DB_HOST
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize(database, userName, password, {
  host,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

module.exports = sequelize

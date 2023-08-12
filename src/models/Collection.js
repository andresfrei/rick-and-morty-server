const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Collection extends Model {}

Collection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'collection'
})

module.exports = Collection

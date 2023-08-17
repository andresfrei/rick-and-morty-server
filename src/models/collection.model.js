const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database')

class Collection extends Model {}

Collection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: {
    type: DataTypes.INTEGER,
    require: true
  },
  idCharacter: {
    type: DataTypes.INTEGER,
    require: true
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    require: true
  }
}, {
  sequelize,
  modelName: 'collection'
})

module.exports = Collection

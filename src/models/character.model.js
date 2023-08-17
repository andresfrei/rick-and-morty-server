const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database')

class Character extends Model {}

Character.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  species: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  origin: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING }
}, {
  sequelize,
  timestamps: false,
  modelName: 'character'
})

module.exports = Character

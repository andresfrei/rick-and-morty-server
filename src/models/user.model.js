const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    require: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    require: true
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},
{
  hooks: {
    beforeCreate: async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
    }
  },
  sequelize,
  modelName: 'user'
})

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User

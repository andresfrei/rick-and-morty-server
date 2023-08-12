const { USER_STATUS } = require('../config/consts')
const Cache = require('../libs/classCache')
const { createToken } = require('../libs/handleToken')
const User = require('../models/User')
const { sendNotificationUserValidate } = require('./notification.service')
const { Op } = require('sequelize')

const cacheSessions = new Cache() // Cacheo de sessiones

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'password', 'status'],
    where: { email }
  })

  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  if (!user.comparePassword(password)) throw new Error('PASSWORD_INVALID')

  const token = await createToken({ idUser: user.id }, '1h')
  const { id, name, status } = user
  cacheSessions.addItem(id, { id, name, status })
  return { user: { id, name, email, status }, token }
}

const registerUserService = async (data) => {
  const { email } = data
  const user = await User.findOne({ where: { email } })
  if (user) throw new Error('USER_EXIST')
  const newUser = await User.create(data)
  sendNotificationUserValidate(newUser)
}

const validateUserService = async (idUser) => {
  try {
    const user = await User.findOne({
      attributes: ['status'],
      where: { id: idUser, status: 0 }
    })

    if (!user) throw new Error('INVALID_TOKEN')

    user.status = USER_STATUS.VALIDATED
    await user.save()

    return true
  } catch (error) {
    throw new Error('INVALID_TOKEN')
  }
}

const findUserValuesSrvice = async (field, value, cache = true) => {
  let user = null
  if (field === 'id' && cache) {
    user = await cacheSessions.findItem(value)
    if (user) return user // Devuelvo objeto de la cache
  }
  const where = { [field]: value }
  user = await User.findOne({
    where,
    status: {
      [Op.gt]: 0 // Status > 0
    }
  })
  if (!user) return {}
  const { id, name, email, status } = user
  cacheSessions.addItem(id, { id, name, status })
  return { id, name, email, status }
}

const resendUserValidationService = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('USER_ALREADY_VALIDATED')
  sendNotificationUserValidate(user)
  return true
}

module.exports = { loginUserService, registerUserService, validateUserService, resendUserValidationService, findUserValuesSrvice }

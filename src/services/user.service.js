const { USER_STATUS } = require('../config/consts')
const { createToken } = require('../libs/handleToken')
const User = require('../models/User')
const { sendNotificationUserValidate } = require('./notification.service')

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } })

  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  if (!user.comparePassword(password)) throw new Error('PASSWORD_INVALID')

  const token = await createToken({ idUser: user.id }, '1h')
  const { id, name, status } = user
  return { user: { id, name, email, status }, token }
}

const registerUserService = async (data) => {
  const { email } = data
  const user = await User.findOne({ where: { email } })
  if (user) throw new Error('USER_EXIST')
  return User.create(data)
}

const validateUserService = async (idUser) => {
  try {
    const user = await User.findOne({ where: { id: idUser } })
    if (!user) throw new Error('INVALID_TOKEN')
    if (user.status !== 0) throw new Error('INVALID_TOKEN')
    user.status = USER_STATUS.VALIDATED
    await user.save()
    return true
  } catch (error) {
    throw new Error('INVALID_TOKEN')
  }
}

const resendUserValidationService = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('USER_ALREADY_VALIDATED')
  sendNotificationUserValidate(user.id)
  return true
}

module.exports = { loginUserService, registerUserService, validateUserService, resendUserValidationService }

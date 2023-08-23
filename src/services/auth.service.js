const { createToken } = require('../libs/handleToken')
const { sendNotificationUserValidate } = require('./notification.service')
const { findUser, createUser, findUserData } = require('./user.service')
const Cache = require('../libs/classCache')
const { findAllService } = require('./collection.service')

const cacheSessions = new Cache() // Cacheo de sessiones

const loginService = async ({ email, password }) => {
  const user = await findUser({ email })
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  if (!user.comparePassword(password)) throw new Error('PASSWORD_INVALID')
  const token = createToken({ idUser: user.id })
  const { id, name, status } = user
  cacheSessions.addItem(id, { id, name, status, email })
  return { user: { id, name, email, status }, token }
}

const loginById = async (idUser, options) => {
  const { cache, collection } = options
  let user
  let userCollection
  let session

  if (cache) user = cacheSessions.findItem(idUser)

  if (!user) {
    user = await findUserData({ id: idUser })
    if (!user) throw new Error('USER_NOT_FOUND')
    if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  }

  if (collection) userCollection = await findAllService(idUser)

  const { name, status, email } = user
  cacheSessions.addItem(idUser, { id: idUser, name, status, email })

  session = { id: idUser, name, email, status }
  if (collection) session = { ...session, collection: userCollection }

  return session
}

const registerService = async (data) => {
  const { email } = data
  const user = await findUser({ email })
  if (user) throw new Error('USER_EXIST')
  const newUser = await createUser(data)
  sendNotificationUserValidate(newUser)
  return newUser
}

const validateUserService = async (id) => {
  const user = await findUser({ id })
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('INVALID TOKEN')
  user.status = 1
  await user.save()
  return true
}

const resendValidation = async (email) => {
  const user = await findUser({ email })
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('USER_ALREADY_VALIDATED')
  sendNotificationUserValidate(user)
  return true
}

const validateSessionService = async (session) => {
  let user = null
  const { idUser } = session
  user = cacheSessions.findItem(idUser)
  if (user) return user
  user = await findUserData({ id: idUser })
  if (!user) throw new Error('USER_NOT_FOUND')
  const { id } = user
  cacheSessions.addItem(id, user)
  return user
}

module.exports = {
  loginService,
  registerService,
  resendValidation,
  loginById,
  validateUserService,
  validateSessionService
}

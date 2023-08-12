const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET
const expire = process.env.JWT_EXPIRE

const createToken = async (payload, expiresIn = expire) => {
  return await jwt.sign(payload, secret, { expiresIn })
}

const validateToken = async (token) => {
  try {
    return await jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

module.exports = { createToken, validateToken }

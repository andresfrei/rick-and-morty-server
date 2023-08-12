const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET
const expire = process.env.JWT_EXPIRE

async function createToken (payload, expiresIn = expire) {
  return await jwt.sign(payload, secret, { expiresIn })
}

async function validateToken (token) {
  if (!token) return false
  try {
    return await jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

module.exports = { createToken, validateToken }

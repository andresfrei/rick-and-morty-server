const { validateToken } = require('../libs/handleToken')
const { validateSessionService } = require('../services/auth.service')

const validateBearToken = async (req, res, next) => {
  try {
    let token = null
    let user = null
    let session = null
    const { authorization } = req.headers
    if (authorization) token = authorization.split(' ')[1]
    if (token) session = validateToken(token)
    if (session) user = await validateSessionService(session)
    if (user?.status > 0) {
      req.session = session
      next()
    } else {
      res.status(401).json({ message: 'INVALID_TOKEN' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' })
  }
}

module.exports = { validateBearToken }

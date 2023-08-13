const { validateToken } = require('../libs/handleToken')
const { findUserValuesSrvice } = require('../services/user.service')

const validateBearToken = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1]
  let user = null
  try {
    const session = await validateToken(token)
    if (session?.idUser) user = await findUserValuesSrvice('id', session.idUser)
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

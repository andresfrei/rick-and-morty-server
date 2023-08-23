const {
  loginService,
  registerService,
  loginById,
  resendValidation,
  validateUserService
} = require('../services/auth.service')

const loginController = async (req, res) => {
  try {
    const { body } = req
    const session = await loginService(body)
    res.status(200).json(session)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

const loguotController = (req, res) => {

}

const authController = async (req, res) => {
  try {
    const { idUser } = req.session
    const { collection } = req.query
    const user = await loginById(idUser, { cache: true, collection })
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const registerController = async (req, res) => {
  const { body } = req
  try {
    await registerService(body)
    const message = 'User created. Needs to be validated'
    return res.status(201).json({ message })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

const userValidationController = async (req, res) => {
  try {
    const { idUser } = req.session
    await validateUserService(idUser)
    res.status(200).json({ message: 'User validate' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const sendEmailController = async (req, res) => {
  const { email } = req.params
  try {
    await resendValidation(email)
    res.status(201).json({ message: 'The notification was sent to email: ' + email })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = {
  loginController,
  loguotController,
  registerController,
  authController,
  sendEmailController,
  userValidationController
}

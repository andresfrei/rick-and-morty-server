const { registerUserService, loginUserService, validateUserService, resendUserValidationService } = require('../services/user.service')

const loginUser = async (req, res) => {
  const { body } = req
  try {
    const session = await loginUserService(body)
    res.status(200).json(session)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

const logOutUser = (req, res) => {

}

const registerUser = async (req, res) => {
  const { body } = req
  try {
    await registerUserService(body)
    const message = 'User created. Needs to be validated'
    return res.status(201).json({ message })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

const validateUser = async (req, res) => {
  const { idUser } = req.session
  try {
    await validateUserService(idUser)
    res.status(201).json({ message: 'USER_VALIDATED' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const resendValidationUser = async (req, res) => {
  const { email } = req.params
  try {
    await resendUserValidationService(email)
    res.status(201).json({ message: 'The notification was sent to email: ' + email })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = { loginUser, registerUser, validateUser, resendValidationUser, logOutUser }

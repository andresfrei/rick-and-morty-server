const Validator = require('../libs/classValidator')
const { validateToken } = require('../libs/handleToken')

const loginValidator = (req, res, next) => {
  const errors = []
  const { email, password } = req.body

  const emailValidate = new Validator('email', email)
  const passwordValidate = new Validator('password', password)

  emailValidate.isEmail()
  !emailValidate.isValidate() && errors.push(emailValidate.errorMessage())

  passwordValidate.isPasswordSecure()
  !passwordValidate.isValidate() && errors.push(passwordValidate.errorMessage())

  errors.length
    ? res.status(400).json(errors)
    : next()
}

const registerValidator = (req, res, next) => {
  const errors = []
  const { email, name, password } = req.body
  req.body = { email, name, password }

  const nameValidate = new Validator('name', name)
  const emailValidate = new Validator('email', email)
  const passwordValidate = new Validator('password', password)

  nameValidate.isRequired()
  nameValidate.isLongMin(4)
  !nameValidate.isValidate() && errors.push(nameValidate.errorMessage())

  emailValidate.isRequired()
  emailValidate.isEmail()
  !emailValidate.isValidate() && errors.push(emailValidate.errorMessage())

  passwordValidate.isPasswordSecure()
  !passwordValidate.isValidate() && errors.push(passwordValidate.errorMessage())

  errors.length > 0
    ? res.status(400).json(errors)
    : next()
}

const validateTokenParam = async (req, res, next) => {
  const { token } = req.params
  try {
    const session = validateToken(token)
    req.session = session
    next()
  } catch (error) {
    res.status(401).json({ message: 'INVALID_TOKEN' })
  }
}

const resendValidate = (req, res, next) => {
  const { email } = req.params
  const validate = new Validator('email', email)
  validate.isEmail()
  validate.resolve(res, next)
}

/* const validateBearToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    let user = null
    const session = await validateToken(token)
    if (session?.idUser) user = await findUserValuesSrvice('id', session.idUser)
    if (user?.status > 0) {
      req.session = session
      next()
    } else {
      res.status(401).json({ message: 'INVALID_TOKEN' })
    }
  } catch (error) {
    res.status(401).json({ message: 'INVALID_TOKEN' })
  }
} */

module.exports = { loginValidator, registerValidator, validateTokenParam, resendValidate }

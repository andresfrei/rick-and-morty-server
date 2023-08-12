const Validator = require('../libs/classValidator')

const validateId = (req, res, next) => {
  const errors = []
  const { id } = req.params

  const validate = new Validator('id', id)
  validate.isNumber()
  validate.isRange(1, 826) /// Límite API

  !validate.isValidate() && errors.push(validate.errorMessage())

  /* const email = new Validator('email', 'sdfsfsf')
  email.isEmail()
  !email.isValidate() && errors.push(email.errorMessage())
 */

  // validate.resolve(res, next)
  return validate.isValidate() ? next() : res.status(400).send(errors)
}

module.exports = { validateId }

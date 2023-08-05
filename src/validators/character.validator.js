const Validator = require('../tools/classValidator')

const validateId = (req, res, next) => {
  const { id } = req.params

  const validate = new Validator('id', id)
  validate.isNumber()
  validate.isMin(1)
  validate.isMax(826) /// Límite API

  validate.isValidate()
    ? next()
    : res.status(400).send({ errors: [validate.errorMessage()] })
}

module.exports = { validateId }

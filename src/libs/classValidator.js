const { validateToken } = require('./handleToken')

class Validator {
  constructor (fieldName, value) {
    this.field = fieldName
    this.value = value
    this._errors = []
  }

  isRequired () {
    const res = !!this.value || this.value === 0
    !res && this._errors.push('It is required')
    return res
  }

  isNumber () {
    const res = !isNaN(Number(this.value))
    !res && this._errors.push('Not a number')
    return res
  }

  isString () {
    const res = typeof this.value === 'string'
    !res && this._errors.push('Not a string')
    return res
  }

  isEmail () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const res = regex.test(this.value)
    !res && this._errors.push('Not an email')
    return res
  }

  isMax (max) {
    const res = this.value <= max
    !res && this._errors.push(`Must be less than or equal to ${max}`)
    return res
  }

  isMin (min) {
    const res = this.value >= min
    !res && this._errors.push(`Must be greater than or equal to ${min}`)
    return res
  }

  isRange (min, max) {
    const res = this.value >= min && this.value <= max
    !res && this._errors.push(`The value is out of the range ${min} and ${max}`)
    return res
  }

  isContainsLetters () {
    const regex = /[a-zA-Z]/
    const res = regex.test(this.value)
    !res && this._errors.push('Must contain some letter')
    return res
  }

  isContainNumbers () {
    const regex = /\d/
    const res = regex.test(this.value)
    !res && this._errors.push('Must contain some number')
    return res
  }

  isContainSymbols () {
    const regex = /\W/
    const res = regex.test(this.value)
    !res && this._errors.push('Must contain at least one symbol')
    return res
  }

  isLongMin (long) {
    const isText = typeof this.value === 'string'
    const res = isText && this.value.length >= long
    !res && this._errors.push(`Minimum length of ${long} characters`)
    return res
  }

  isPasswordSecure () {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{5,}$/
    const res = regex.test(this.value)
    !res && this._errors.push('The password must have at least 5 characters, at least one letter, one number and one sign')
    return res
  }

  notEmpty () {
    const res = !!this.value
    !res && this._errors.push('The value cannot be empty')
    return res
  }

  isValidate () {
    return this._errors.length === 0
  }

  errorMessage () {
    return {
      field: this.field,
      value: this.value,
      message: this._errors
    }
  }

  resolve (res, next) {
    this.isValidate()
      ? next()
      : res.status(400).json(this.errorMessage())
  }
}

module.exports = Validator

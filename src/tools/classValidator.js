class Validator {
  constructor (fieldName, value) {
    this.field = fieldName
    this.value = value
    this._errors = []
  }

  isNumber () {
    const res = !isNaN(Number(this.value))
    !res && this._errors.push('Not a number')
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

  isValidate () {
    return this._errors.length === 0
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
    const res = this.value.length >= long
    !res && this._errors.push(`Minimum length of ${long} characters`)
    return res
  }

  isPasswordSecure () {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{5,}$/
    const res = regex.test(this.value)
    !res && this._errors.push('The password must have at least 5 characters, at least one letter, one number and one sign')
    return res
  }

  errorMessage () {
    return {
      field: this.field,
      value: this.value,
      message: this._errors
    }
  }
}

module.exports = Validator

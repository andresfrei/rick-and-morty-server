const express = require('express')
const { loginUser, registerUser, validateUser, resendValidationUser } = require('../controllers/auth.controller')
const { loginValidator, registerValidator, validateTokenParam, resendValidate } = require('../validators/auth.validator')

const router = express.Router()

router.post('/login', loginValidator, loginUser)
router.post('/logout', loginValidator, loginUser)
router.post('/register', registerValidator, registerUser)
router.post('/validate/:token', validateTokenParam, validateUser)
router.post('/resend/:email', resendValidate, resendValidationUser)

module.exports = router

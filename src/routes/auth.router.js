const express = require('express')

const {
  loginValidator,
  registerValidator,
  validateTokenParam,
  resendValidate
} = require('../validators/auth.validator')

const {
  loginController,
  loguotController,
  registerController,
  authController,
  sendEmailController,
  userValidationController
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/login', loginValidator, loginController)
router.post('/logout', loginValidator, loguotController)
router.post('/session/:token', validateTokenParam, authController)
router.post('/register', registerValidator, registerController)
router.post('/validate/:token', validateTokenParam, userValidationController)
router.post('/resend/:email', resendValidate, sendEmailController)

module.exports = router

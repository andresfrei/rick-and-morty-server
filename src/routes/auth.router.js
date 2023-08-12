const express = require('express')
const { loginUser, registerUser, validateUser, resendValidationUser } = require('../controllers/auth.controller')
const { loginValidator, registerValidator, validateTokenParam, resendValidate } = require('../validators/auth.validator')

const { sessionStoreMiddleWare } = require('../middlewares/store.middleware')

const router = express.Router()

router.use(sessionStoreMiddleWare)

router.post('/login', loginValidator, loginUser)
router.post('/logout', loginValidator, loginUser)
router.post('/register', registerValidator, registerUser)
router.post('/validate/:token', validateTokenParam, validateUser)
router.post('/resend/:email', resendValidate, resendValidationUser)

module.exports = router

const express = require('express')
const { getCharacter, getAllCharacters } = require('../controllers/character.controller')
const { validateId } = require('../validators/character.validator')
const { validateBearToken } = require('../validators/auth.validator')

const router = express.Router()

router.get('/', validateBearToken, getAllCharacters)
router.get('/:id', validateId, validateBearToken, getCharacter)

module.exports = router

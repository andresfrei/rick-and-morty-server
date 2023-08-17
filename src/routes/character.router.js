const express = require('express')
const { validateId } = require('../validators/character.validator')
const { validateBearToken } = require('../validators/token.validatos')

const { getCharacter, getAllCharacters } = require('../controllers/character.controller')

const router = express.Router()

router.get('/', validateBearToken, getAllCharacters)
router.get('/:id', validateId, validateBearToken, getCharacter)

module.exports = router

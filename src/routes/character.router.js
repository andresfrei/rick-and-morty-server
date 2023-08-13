const express = require('express')
const { getCharacter, getAllCharacters } = require('../controllers/character.controller')
const { validateId } = require('../validators/character.validator')
const { validateBearToken } = require('../validators/token.validatos')

const router = express.Router()

router.get('/', validateBearToken, getAllCharacters)
router.get('/:id', validateId, getCharacter)

module.exports = router

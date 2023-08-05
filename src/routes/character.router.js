const express = require('express')
const { getCharacter, getAllCharacters } = require('../controllers/character.controller')
const { validateId } = require('../validators/character.validator')

const router = express.Router()

router.get('/', getAllCharacters)
router.get('/:id', validateId, getCharacter)

module.exports = router

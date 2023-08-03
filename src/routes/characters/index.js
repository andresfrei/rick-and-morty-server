const express = require('express')
const router = express.Router()

const { getCharacterById, getAllCharacters } = require('../../controllers/charactersController')

router.get('/', getAllCharacters)
router.get('/:id', getCharacterById)

module.exports = router

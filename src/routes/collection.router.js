const express = require('express')
const { validateId } = require('../validators/character.validator')
const { validateBearToken } = require('../validators/token.validatos')

const { getOneItemController, deleteItemController, updateItemController, getAllItemsService } = require('../controllers/collection.controller')

const router = express.Router()

router.get('/', validateBearToken, getAllItemsService)
router.get('/:id', validateId, validateBearToken, getOneItemController)
router.patch('/:id', validateId, validateBearToken, updateItemController)
router.delete('/:id', validateId, validateBearToken, deleteItemController)

module.exports = router

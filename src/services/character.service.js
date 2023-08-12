const Character = require('../models/Character')
const { findCharacterApi } = require('./api.service')
const Cache = require('../libs/classCache')

const charactersCache = new Cache()

const findCharacterService = async (id, cache = true) => {
  let character = null

  if (cache) character = charactersCache.findItem(id)
  if (character) return character // Retorno character cache

  character = await await Character.findOne({ where: { id } })
  if (character) {
    charactersCache.addItem(id, character) // agrego a la cache
    return character // retorno character DB
  }

  character = await findCharacterApi(id)
  if (!character) return null
  Character.create(character) // agrego a la base de datos
  charactersCache.addItem(id, character) // agrego a la cache
  return character
}

const allCharacters = () => {
  return Character
}

module.exports = { findCharacterService, allCharacters }

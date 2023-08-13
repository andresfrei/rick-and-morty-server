const Character = require('../models/Character')
const Cache = require('../libs/classCache')
const { findCharacterApi } = require('./api.service')

const charactersCache = new Cache()

const findCharacterService = async (id, cache = true) => {
  try {
    let character
    if (cache) character = charactersCache.findItem(id)
    if (character) return character // Retorno character cache
    const find = await Character.findOne({ where: { id } })
    character = find?.dataValues
    if (character) {
      setCharacterCache(character)
      return character // retorno character DB
    }
    character = await findCharacterApi(id)
    if (!character) return null
    await Character.create(character) // agrego a la base de datos
    setCharacterCache(character)
    return character
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const setCharacterCache = (character) => {
  const { id, name, status, species, gender, origin, image } = character
  charactersCache.addItem(id, { id, name, status, species, gender, origin, image })
}

const allCharacters = () => {
  return Character
}

module.exports = { findCharacterService, allCharacters }

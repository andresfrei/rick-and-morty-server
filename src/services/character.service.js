const Character = require('../models/Character')
const { findCharacterApi } = require('./api.service')

const findCharacter = async (id) => {
  const find = await await Character.findOne({ where: { id } })
  if (find) return find
  const newcharacter = await findCharacterApi(id)
  if (!newcharacter) return null
  Character.create(newcharacter)
  return newcharacter
}

const allCharacters = () => {
  return Character
}

module.exports = { findCharacter, allCharacters }

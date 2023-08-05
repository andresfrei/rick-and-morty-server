const { findCharacterApi } = require('./api.service')
const characters = require('../mock/data')

const findCharacter = async (id) => {
  const find = characters.find(character => character.id === parseInt(id))
  if (find) return find
  const findApi = await findCharacterApi(id)
  if (!findApi) return null
  characters.push(findApi)
  return findApi
}

const allCharacters = () => characters

module.exports = { findCharacter, allCharacters }

const { findCharacterApi } = require('./api.service')
const Character = require('../models/character.model')
const Cache = require('../libs/classCache')

const charactersCache = new Cache()

const findOneCharacter = async (id, useCache = true) => {
  let character

  // BUSCO EN LA CACHE
  if (useCache) character = charactersCache.findItem(id)
  if (character) return character // Retorno character cache

  // BUSCO EN LA BASE DE DATOS
  const find = await Character.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id }
  })
  character = find?.dataValues
  if (character) {
    useCache && charactersCache.addItem(character.id, character)
    return character // retorno character DB
  }

  // SI NO ESTA EN LA DB LO BUSCO EN LA API DE RICK_AND_MORTY
  character = await findCharacterApi(id)
  if (!character) throw new Error('CHARACTER_NOT_FOUND')
  Character.create(character) // agrego a la base de datos
  useCache && charactersCache.addItem(character.id, character)
  return character
}

const findAllCharacters = async () => {
  const characters = await Character.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  return characters
}

module.exports = { findOneCharacter, findAllCharacters }

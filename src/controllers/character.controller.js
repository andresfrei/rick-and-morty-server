const { findCharacter, allCharacters } = require('../services/character.service')

const getAllCharacters = (_req, res) => {
  const characters = allCharacters()
  res.status(200).send(characters)
}

const getCharacter = async (req, res) => {
  const { id } = req.params
  const character = await findCharacter(id)

  return character
    ? res.status(200).send(character)
    : res.status(404).send({ message: 'NOT_FOUND' })
}

module.exports = { getCharacter, getAllCharacters }

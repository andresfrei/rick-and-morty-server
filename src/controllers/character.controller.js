const { findCharacterService, allCharacters } = require('../services/character.service')

const getAllCharacters = (_req, res) => {
  const characters = allCharacters()
  res.status(200).send(characters)
}

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params
    const character = await findCharacterService(id)
    return character
      ? res.status(200).send(character)
      : res.status(404).send({ message: 'NOT_FOUND' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCharacter, getAllCharacters }

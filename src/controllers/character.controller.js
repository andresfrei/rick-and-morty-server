const { findAllCharacters, findOneCharacter } = require('../services/character.service')

const getAllCharacters = async (_req, res) => {
  try {
    const characters = await findAllCharacters()
    res.status(200).send(characters)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params
    const character = await findOneCharacter(id)
    return character
      ? res.status(200).send(character)
      : res.status(404).send({ message: 'NOT_FOUND' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCharacter, getAllCharacters }

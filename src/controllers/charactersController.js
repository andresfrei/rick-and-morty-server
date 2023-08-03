const { findCharacter, allCharacters } = require('../services/charactersService')

const getAllCharacters = (_req, res) => {
  res.send(allCharacters)
}

const getCharacterById = (req, res) => {
  const { id } = req.params
  const character = findCharacter(id)
  res.send(character)
}

module.exports = { getCharacterById, getAllCharacters }

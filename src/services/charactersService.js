const characters = require('../mock/data')

const findCharacter = (id) => {
  const find = characters.find(character => character.id === parseInt(id))
  console.log(find)
  return find
}

const allCharacters = () => characters

module.exports = { findCharacter, allCharacters }

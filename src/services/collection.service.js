// const Character = require('../models/character.model')
const Collection = require('../models/collection.model')
const { findOneCharacter } = require('./character.service')

const { sequelize } = require('../database')
const { queryUserCollection } = require('../database/querys/collection.query')

// const { findOneCharacter } = require('./character.service')

const findAllService = async (idUser, moreOptions) => {
  // Por el momento suspendo relaciones
  /* const collection = await Collection.findAll({
    include: { model: Character, as: 'character' },
    where: { idUser, ...moreOptions }
  })
  const items = collection.json()
  return items || [] */

  // Query sin relación
  const resul = await sequelize.query(queryUserCollection, {
    replacements: { idUser }
  })
  const collecions = resul[0]
  return collecions || []
}

const findOneService = async (idUser, idCharacter) => {
  let item = null
  if (!idUser || !idCharacter) throw new Error('IVALID_PARAMS')

  // BUSCO LOS DATOS DEL CHARACTER
  const character = await findOneCharacter(idCharacter, true)
  if (!character) throw new Error('ERROR_CHARACTER_ID')

  // BUSCO SI EXISTE EN LA COLECCION FindOrCreate
  item = await Collection.findOne({ where: { idUser, idCharacter } })

  // SI NO EXISTE LO CREO
  if (!item) item = await Collection.create({ idUser, idCharacter })

  // DEVUELVO EL OBJETO
  return { ...character, favorite: item.favorite }
}

const deleteOneService = async (idUser, idCharacter) => {
  if (!idUser || !idCharacter) throw new Error('IVALID_PARAMS')

  const item = await Collection.findOne({ where: { idUser, idCharacter } })
  if (!item) throw new Error('INVALID_ID')

  await item.destroy()
  return true
}

const updateOneService = async (idUser, idCharacter, newData) => {
  const { favorite } = newData

  const item = await Collection.findOne({ where: { idUser, idCharacter } })
  if (!item) throw new Error('INVALID_ID')

  item.favorite = favorite
  await item.save()

  return true
}

module.exports = { findAllService, findOneService, deleteOneService, updateOneService }

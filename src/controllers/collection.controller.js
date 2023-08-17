const { findOneService, deleteOneService, updateOneService, findAllService } = require('../services/collection.service')

const getOneItemController = async (req, res) => {
  try {
    const { idUser } = req.session
    const idCharacter = Number(req.params.id)
    const itemColection = await findOneService(idUser, idCharacter)
    res.status(201).json(itemColection)
  } catch (error) {
    res.status(400).json({ messaje: error.message })
  }
}

const getAllItemsService = async (req, res) => {
  try {
    const { idUser } = req.session
    const collection = await findAllService(idUser)
    res.status(200).json(collection)
  } catch (error) {
    res.status(400).json({ messaje: error.message })
  }
}

const deleteItemController = async (req, res) => {
  try {
    const { idUser } = req.session
    const idCharacter = Number(req.params.id)
    await deleteOneService(idUser, idCharacter)
    res.status(200).json({ messaje: 'DELETED_ITEM' })
  } catch (error) {
    res.status(400).json({ messaje: error.message })
  }
}

const updateItemController = async (req, res) => {
  try {
    const { body, session, params } = req
    const { idUser } = session
    const idCharacter = Number(params.id)
    await updateOneService(idUser, idCharacter, body)
    res.status(200).json({ messaje: 'UPDATED_ITEM' })
  } catch (error) {
    res.status(400).json({ messaje: error.message })
  }
}

module.exports = { getOneItemController, deleteItemController, updateItemController, getAllItemsService }

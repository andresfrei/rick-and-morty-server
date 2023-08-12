const { createToken } = require('../libs/handleToken')

const sendNotificationUserValidate = (idUser) => {
  createToken({ idUser })
    .then(token => console.log(token))
    .catch(error => console.log(error.message))
}

module.exports = { sendNotificationUserValidate }

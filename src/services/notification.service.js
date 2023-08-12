const { createToken } = require('../libs/handleToken')

const sendNotificationUserValidate = (user) => {
  const { id, email } = user
  createToken({ idUser: id })
    .then(token => console.log(token))
    .catch(error => console.log(error.message))
  console.log('Send mail to :' + email) //! PENDIENTE
}

module.exports = { sendNotificationUserValidate }

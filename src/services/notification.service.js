const { createToken } = require('../libs/handleToken')

const sendNotificationUserValidate = (user) => {
  const { id, email } = user
  const token = createToken({ idUser: id })
  console.log(token)
  console.log('Send mail to :' + email) //! PENDIENTE
}

module.exports = { sendNotificationUserValidate }

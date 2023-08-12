const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// const multer = require('multer')

require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000

// const filesStoage = path.join(__dirname, 'storege')
const pathViews = path.join(__dirname, 'views')
// const pathPublic = path.join(__dirname, 'public')

// Config
app.set('views', pathViews)
app.set('view engine', 'pug')

// Middlewares
app.use(cors())
app.use(express.json())
// app.use(express.static(pathPublic))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
// app.use(multer({ dest: filesStoage }).single('csv'))

// Routes
app.use('/api', require('./routes/index.router'))

// Database
const sequelize = require('./database')
sequelize.sync()
  .then(() => console.log('db is ready'))
  .catch(error => console.error('Unable to connect to the database', error))

app.listen(port, async () => {
  console.log(`Server up in port ${port}`)
})

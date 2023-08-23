const path = require('path')
const express = require('express')
const cors = require('cors')
// const multer = require('multer')

const server = express()

// Development Environment
if (process.env.DEV) {
  const morgan = require('morgan')
  server.use(morgan('dev'))
}

// const filesStoage = path.join(__dirname, 'storege')
const pathViews = path.join(__dirname, 'views')
// const pathPublic = path.join(__dirname, 'public')

// Config
server.set('views', pathViews)
server.set('view engine', 'pug')

// Middlewares
server.use(cors())
server.use(express.json())
// server.use(express.static(pathPublic))
server.use(express.urlencoded({ extended: true }))
// server.use(multer({ dest: filesStoage }).single('csv'))

// Routes
server.use('/api', require('./routes/index.router'))

module.exports = server

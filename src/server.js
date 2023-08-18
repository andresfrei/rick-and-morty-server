const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// const multer = require('multer')

const server = express()

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
server.use(morgan('dev'))
server.use(express.urlencoded({ extended: true }))
// server.use(multer({ dest: filesStoage }).single('csv'))

// Routes
server.use('/api', require('./routes/index.router'))

module.exports = server

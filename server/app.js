require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('errorhandler')

const app = express()
const mongoose = require('mongoose')

mongoose.promise = global.Promise
const isProduction = process.env.NODE_ENV === 'production'

// Webserver setup
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public'))) //TODO: possibly remove this line
app.use(session({secret: 'angryTacoApi', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}))

if (!isProduction) {
    app.use(errorHandler())
}

// Database setup
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.on('open', () => console.log('Mongoose connected.'))
mongoose.set('debug', true)
require('../models/Users')

// routes
app.use(require('./routes'))



// Errors
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (!isProduction) {
  app.use((err, req, res) => {
      res.status(err.stauts || 500)

      res.json({
          errors: {
              message: err.message,
              error: err,
          }
      })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({
      errors: {
          message: err.message,
          error: err
      }
  })
})

// const server = app.listen(3050, () => console.log('Server started on http://localhost:3050'))

module.exports = app
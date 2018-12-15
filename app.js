'use strict'

const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')

//const Db = require('../validation-bd')
//const config = require('./config')

//const env = process.env.NODE_ENV || 'production'
//let db = new Db(config.db)

const operacionesRoutes = require('./api/routes/operaciones')

//db.connect()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Credentials', true)

  
  next()
})

app.use('/operaciones', operacionesRoutes)

module.exports = app

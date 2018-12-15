'use strict'

const database = {
  db: {},
  auth: {
    secret: process.env.SECRET || 'tr4n$v4l1d4'
  },
  secret: process.env.ENVIOS_AREPA_SECRET || 'arepa' // never use default
}

module.exports = database

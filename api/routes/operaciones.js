'use strict'

const router = require('express-promise-router')()
//const auth = require('express-jwt')
const config = require('../../config')
const Db = require('../../../validation-bd')

const env = process.env.NODE_ENV || 'production'
let db = new Db()

//router.get('/', auth(config.auth),async (req, res, next) => {
router.get('/', async (req, res) => {
  
  //const { user } = req
  //if (!user || !user.username) {
    //return next(new Error('Not authorized'))
  //}
  await db.connect()
  let operaciones = await db.getOperaciones()
  await db.disconnect()
  res.status(200).json(operaciones)
 
})

router.post('/', async (req, res, next) => {
  
  db.connect()
  let operacion = await req.body
  let arr_ops = await db.getOperaciones()
  let arr_nop = []
  for (const op in arr_ops) {
    arr_nop[op] = arr_ops[op].nro_operacion
  }
  const idx = arr_nop.indexOf(operacion.nro_operacion)
  if ( idx == -1) {
    let created = await db.saveOperacion(operacion)
    db.disconnect()
    res.status(201).send(created)
  }
  else {
    res.status(500).send(arr_ops[idx]);
  }
    
})

module.exports = router
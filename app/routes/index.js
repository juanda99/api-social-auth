var router = require('express').Router()
var cervezas = require('./cervezas')
var users = require('./users')
// var keywords = require('./keywords')
//var users = require('./users')

router.use('/cervezas', cervezas)
// router.use('/keywords', keywords)
router.use('/users', users)

router.get('/', (req, res) => res.status(200).json({ message: 'You are connected to Arasaac API' }))

module.exports = router
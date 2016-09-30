var router = require('express').Router()
var users = require ('../controllers/users')


/**
 * Singup user
 */
router.post('/', (req, res)=> users.create(req, res))

module.exports = router
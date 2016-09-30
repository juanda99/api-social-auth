import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import expressJWT from 'express-jwt'
import config from './config'
// import configureAuth from './configureAuth'


/*bbdd configuration in its own file*/
require('./db')

/*email configuration*/
require('./mail.js')

var app = express()                

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 

app.use(expressJWT({ secret: config.auth.jwt.secret}).unless({path: [/\/auth/i, /\/api/i, /\/facebook/i ] }))      


app.use(session({
  secret: config.auth.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400 }
}))

// configureAuth(app, config)   

// all routes with api prefix, good for versioning
const router = require('./routes')
app.use('/api', router)

app.listen(config.port, () => console.log('API listenting, port: ' + config.port))

module.exports = app
var User = require('./models/Users')
var mongoose = require('mongoose')
var nev = require('email-verification')(mongoose)
var TempUser = require('./models/TempUsers')
var bcrypt = require('bcryptjs')

var myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback)
    })
  })
}

nev.configure({
  verificationURL: 'http://localhost:3000/auth/${URL}',
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes
  tempUserCollection: 'myawesomewebsite_tempusers',
  passwordFieldName: 'password',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'user@email.com',
      pass: 'my-password'
    }
  },
  hashingFunction: myHasher,
  verifyMailOptions: {
    from: 'Do Not Reply <juandacorreo@gmail.com>',
    subject: 'Please confirm account',
    html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
    text: 'Please confirm your account by clicking the following link: ${URL}'
  }
}, function(err, options){
  if (err) {
    console.log(err)
    return
  }
  console.log('configured: ' + (typeof options === 'object'))
})

// configure temp user using a predefined file 

nev.configure({
  tempUserModel: TempUser
}, function(err, options ){
  if (err) {
    console.log (err)
    return  
  }
})
module.exports = nev
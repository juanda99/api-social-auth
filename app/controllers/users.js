var User = require('../models/Users')
var TempUser = require('../models/TempUsers')
var nev = require('../mail')
module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/
  search: function (req, res) {
    var q = req.query.q
    User.find({ $text: { $search: q } }, function(err, users) {
      if(err) {
        return res.status(500).json({
          message: 'Error en la búsqueda'
        })
      }
      return res.json(users)
    })
  },
  list: function(req, res) {
    User.find(function(err, Users){
      if(err) {
        return res.status(500).json({
          message: 'Error obteniendo los usuarios'
        })
      }
      return res.json(Users)
    })
  },
  show: function(req, res) {
    var id = req.params.id
    User.findOne({_id: id}, function(err, users){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el usuario'
        })
      }
      if(!users) {
        return res.status(404).json( {
          message: 'No tenemos a este usuario'
        })
      }
      return res.json(users)
    })
  },
  create: function(req, res) {
    var user = new TempUser (req.body)

    nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED')
      }
      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.json({
          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
        })
      }
      // new user created
      if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName]
        nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending verification email FAILED')
          }
          res.json({
            msg: 'An email has been sent to you. Please check it to verify your account.',
            info: info
          })
        })

      // user already exists in temporary collection!
      } else {
        res.json({
          msg: 'You have already signed up. Please check your email to verify your account.'
        })
      }
    })





 /*
    user.save(function(err, users){
      if(err) {
        return res.status(500).json( {
          message: 'Error al guardar el usuario',
          error: err
        })
      }
      return res.status(201).json({
        message: 'saved',
        _id: users._id
      })
    })
    */
  },
  update: function(req, res) {
    var id = req.params.id
    User.findOne({_id: id}, function(err, users){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al guardar el usuario',
          error: err
        })
      }
      if(!users) {
        return res.status(404).json({
          message: 'No hemos encontrado la users'
        })
      }
      users.Nombre = req.body.nombre
      users.Descripción =  req.body.descripcion
      users.Graduacion = req.body.graduacion
      users.Envase = req.body.envase
      users.Precio = req.body.precio
      users.save(function(err, users){
        if(err) {
          return res.status(500).json({
            message: 'Error al guardar la users'
          })
        }
        if(!users) {
          return res.status(404).json({
            message: 'No hemos encontrado la users'
          })
        }
        return res.json(users)
      })
    })
  },
  remove: function(req, res) {
    var id = req.params.id
    User.findByIdAndRemove(id, function(err, users){
      if(err) {
        return res.json(500, {
          message: 'No hemos encontrado el usuario'
        })
      }
      return res.json(users)
    })
  }
}
require('babel-polyfill')
const path = require('path')

// environment

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

// authentication

const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'secret key for testing' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
  }
}

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URL || 'mongodb://localhost/cervezas',
  uploadsDir: path.join( __dirname, 'static', 'uploads' ),
  auth
}, environment)

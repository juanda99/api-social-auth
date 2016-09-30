'use strict';
var request = require('supertest');
var express = require('express');

const should = require('should');


/*obtenemos nuestra api rest que vamos a testear*/
var app = require('../app/server');


describe('Crear una nueva cerveza', function() {
  it('Crea la cerveza retornando 201', function(done) {
    request(app)
      .post('/api/cervezas/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        "Nombre": 'DAMN',
        "Descripción": "Mi cerveza preferida",
        "Graduación": "10º",
        "Envase": "Bidón",
        "Precio": "1 eurito"
      })
      .expect(201, done);
  });
});

describe('Actualizar la cerveza', function() {
  it('Devuelve 404 si no encuentra la cerveza', function(done) {
    request(app)
      .put('/api/cervezas/57461cd40d288d854aa2ea64')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        "Nombre": 'AMBAR',
        "Descripción": "Mi cerveza preferida",
        "Graduación": "10º",
        "Envase": "Bidón",
        "Precio": "1 eurito"
      })
      .expect(404, done);
  });
  it('Actualiza la cerveza', function (done) {
    request(app)
      .put('/api/cervezas/57461cd40d288d854aa2ea6b')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        "Nombre": 'AMBAR',
        "Descripción": "Mi cerveza preferida",
        "Graduación": "10º",
        "Envase": "Bidón",
        "Precio": "1 eurito"
      })
      .expect(200, done);
  });    
});

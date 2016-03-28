'use strict';

var app = require('../..');
import request from 'supertest';

var newRedirect;

describe('Redirect API:', function() {

  describe('GET /', function() {
    var redirects;

    beforeEach(function(done) {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          redirects = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      redirects.should.be.instanceOf(Array);
    });

  });

  describe('POST /', function() {
    beforeEach(function(done) {
      request(app)
        .post('/')
        .send({
          name: 'New Redirect',
          info: 'This is the brand new redirect!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRedirect = res.body;
          done();
        });
    });

    it('should respond with the newly created redirect', function() {
      newRedirect.name.should.equal('New Redirect');
      newRedirect.info.should.equal('This is the brand new redirect!!!');
    });

  });

  describe('GET //:id', function() {
    var redirect;

    beforeEach(function(done) {
      request(app)
        .get('//' + newRedirect._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          redirect = res.body;
          done();
        });
    });

    afterEach(function() {
      redirect = {};
    });

    it('should respond with the requested redirect', function() {
      redirect.name.should.equal('New Redirect');
      redirect.info.should.equal('This is the brand new redirect!!!');
    });

  });

  describe('PUT //:id', function() {
    var updatedRedirect;

    beforeEach(function(done) {
      request(app)
        .put('//' + newRedirect._id)
        .send({
          name: 'Updated Redirect',
          info: 'This is the updated redirect!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRedirect = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRedirect = {};
    });

    it('should respond with the updated redirect', function() {
      updatedRedirect.name.should.equal('Updated Redirect');
      updatedRedirect.info.should.equal('This is the updated redirect!!!');
    });

  });

  describe('DELETE //:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('//' + newRedirect._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when redirect does not exist', function(done) {
      request(app)
        .delete('//' + newRedirect._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

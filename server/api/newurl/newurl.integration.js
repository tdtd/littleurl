'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newNewurl;

describe('Newurl API:', function () {

  describe('GET /newurl', function () {
    var newurls;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/newurl').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newurls = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      newurls.should.be.instanceOf(Array);
    });
  });

  describe('POST /newurl', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/newurl').send({
        name: 'New Newurl',
        info: 'This is the brand new newurl!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newNewurl = res.body;
        done();
      });
    });

    it('should respond with the newly created newurl', function () {
      newNewurl.name.should.equal('New Newurl');
      newNewurl.info.should.equal('This is the brand new newurl!!!');
    });
  });

  describe('GET /newurl/:id', function () {
    var newurl;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/newurl/' + newNewurl._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newurl = res.body;
        done();
      });
    });

    afterEach(function () {
      newurl = {};
    });

    it('should respond with the requested newurl', function () {
      newurl.name.should.equal('New Newurl');
      newurl.info.should.equal('This is the brand new newurl!!!');
    });
  });

  describe('PUT /newurl/:id', function () {
    var updatedNewurl;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/newurl/' + newNewurl._id).send({
        name: 'Updated Newurl',
        info: 'This is the updated newurl!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedNewurl = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedNewurl = {};
    });

    it('should respond with the updated newurl', function () {
      updatedNewurl.name.should.equal('Updated Newurl');
      updatedNewurl.info.should.equal('This is the updated newurl!!!');
    });
  });

  describe('DELETE /newurl/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/newurl/' + newNewurl._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when newurl does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/newurl/' + newNewurl._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=newurl.integration.js.map

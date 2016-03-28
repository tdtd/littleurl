/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /              ->  index
 * POST    /              ->  create
 * GET     //:id          ->  show
 * PUT     //:id          ->  update
 * DELETE  //:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _redirectModel = require('./redirect.model');

var _redirectModel2 = _interopRequireDefault(_redirectModel);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Redirects

function index(req, res) {
  return _redirectModel2['default'].find().exec().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Redirect from the DB

function show(req, res) {
  return _redirectModel2['default'].findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Redirect in the DB

function create(req, res) {
  return _redirectModel2['default'].create(req.body).then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Redirect in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _redirectModel2['default'].findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Deletes a Redirect from the DB

function destroy(req, res) {
  return _redirectModel2['default'].findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=redirect.controller.js.map

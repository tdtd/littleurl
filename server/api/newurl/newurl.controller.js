/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /newurl/              ->  index
 * POST    /newurl/              ->  create
 * GET     /newurl//:id          ->  show
 * PUT     /newurl//:id          ->  update
 * DELETE  /newurl//:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.redirectURL = redirectURL;
exports.newURL = newURL;
exports.create = create;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _newurlModel = require('./newurl.model');

var _newurlModel2 = _interopRequireDefault(_newurlModel);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      var finEnt = entity;
      finEnt.shortUrl = "https://littleurl.herokuapp.com/" + entity._id;
      entity._id = undefined;
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

function handleRedirect(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.redirect(entity.originalUrl);
    }
  };
}

function checkUrl(url) {
  var urlReg = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
  var a = url;

  return urlReg.test(a);
}

function formatUrl(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}

// Gets a list of News

function index(req, res) {
  return _newurlModel2['default'].find().exec().then(respondWithResult(res))['catch'](handleError(res));
}

function redirectURL(req, res) {
  var id = req.params.id;
  return _newurlModel2['default'].findById(id).exec().then(handleEntityNotFound(res)).then(handleRedirect(res))['catch'](handleError(res));
}

function newURL(req, res) {
  var path = req.path.substr(8);
  if (checkUrl(path)) {
    path = formatUrl(path);
    (0, _requestPromise2['default'])(path).then(function () {
      _newurlModel2['default'].findURL(path, function (err, news) {
        if (err) {
          return handleError(res, err);
        }
        if (news.length === 0) {
          return _newurlModel2['default'].create({ 'originalUrl': path }).then(respondWithResult(res, 201))['catch'](handleError(res));
        } else {
          var found = news[0];
          var id = found._id;
          found._id = undefined;
          found.shortUrl = "https://littleurl.herokuapp.com/" + id;

          return res.status(200).json(found);
        }
      });
    })['catch'](function (err) {
      handleError(err);
    });
  } else {
    return res.status(400).json({ error: 'Not a valid URL' });
  }
}

// Creates a new New in the DB

function create(req, res) {
  return _newurlModel2['default'].create(req.body).then(respondWithResult(res, 201))['catch'](handleError(res));
}
//# sourceMappingURL=newurl.controller.js.map

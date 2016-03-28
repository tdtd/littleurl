'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var RedirectSchema = new _mongoose2['default'].Schema({
  name: String,
  info: String,
  active: Boolean
});

exports['default'] = _mongoose2['default'].model('Redirect', RedirectSchema);
module.exports = exports['default'];
//# sourceMappingURL=redirect.model.js.map

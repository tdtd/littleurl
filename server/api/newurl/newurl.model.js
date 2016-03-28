'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var NewurlSchema = new _mongoose2['default'].Schema({
  _id: {
    type: String,
    unique: true,
    'default': _shortid2['default'].generate
  },
  originalUrl: String,
  shortUrl: String
});

NewurlSchema.statics = {
  findURL: function findURL(param, cb) {
    this.find({}).where('originalUrl').equals(param).limit(10).exec(cb);
  }
};

NewurlSchema.post('save', function (doc) {
  doc.short_url = 'https://littleurl.herokuapp.com/' + doc._id;
});

NewurlSchema.set('versionKey', false);
exports['default'] = _mongoose2['default'].model('Newurl', NewurlSchema);
module.exports = exports['default'];
//# sourceMappingURL=newurl.model.js.map

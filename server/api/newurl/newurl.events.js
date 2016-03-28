/**
 * Newurl model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Newurl = require('./newurl.model');
var NewurlEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NewurlEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Newurl.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    NewurlEvents.emit(event + ':' + doc._id, doc);
    NewurlEvents.emit(event, doc);
  };
}

exports['default'] = NewurlEvents;
module.exports = exports['default'];
//# sourceMappingURL=newurl.events.js.map

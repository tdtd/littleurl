/**
 * New model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var New = require('./new.model');
var NewEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NewEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  New.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    NewEvents.emit(event + ':' + doc._id, doc);
    NewEvents.emit(event, doc);
  };
}

exports['default'] = NewEvents;
module.exports = exports['default'];
//# sourceMappingURL=new.events.js.map

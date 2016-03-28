/**
 * Redirect model events
 */

'use strict';

import {EventEmitter} from 'events';
var Redirect = require('./redirect.model');
var RedirectEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RedirectEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Redirect.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RedirectEvents.emit(event + ':' + doc._id, doc);
    RedirectEvents.emit(event, doc);
  }
}

export default RedirectEvents;

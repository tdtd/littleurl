'use strict';

import mongoose from 'mongoose';

var RedirectSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Redirect', RedirectSchema);

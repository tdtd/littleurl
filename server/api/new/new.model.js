'use strict';

import mongoose from 'mongoose';
import shortid  from 'shortid';

var NewSchema = new mongoose.Schema({
	_id:{
		type: String,
    unique: true,
    'default': shortid.generate
	},
  original_url: String,
	short_url: String
});

NewSchema.statics = {
  findURL: function(param, cb) {
    this.find({})
      .where('original_url').equals(param)
      .limit(10)
      .exec(cb);
  }
};

NewSchema.post('save', function(doc) {
  doc.short_url = 'https://littleurl.herokuapp.com/'+doc._id;
});

NewSchema.set('versionKey', false);
export default mongoose.model('New', NewSchema);

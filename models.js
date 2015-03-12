var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.User= mongoose.model('User', new Schema({

  username: { type: String, required: true , unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true , unique: true },

}));
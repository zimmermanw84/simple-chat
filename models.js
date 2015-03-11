var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.User= mongoose.model('User', new Schema({

  username: String,
  password: String,
  email: String,

}));
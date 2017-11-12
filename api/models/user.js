var mongoose = require('mongoose');

var schema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', schema);

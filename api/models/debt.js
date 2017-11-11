var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  recurrent: {
    type: Boolean,
    required: false
  },
  paid: {
    type: Boolean,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: true
  }
});

mongoose.model('Debt', schema);

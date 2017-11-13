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
  },
  isInstallment: {
    type: Boolean,
    required: false
  },
  currentInstallment: {
    type: Number,
    required: false
  },
  totalInstallments: {
    type: Number,
    required: false
  },
  period: {
    type: String,
    required: false
  }
});

mongoose.model('Debt', schema);

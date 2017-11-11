var mongoose = require('mongoose');

var schema = mongoose.Schema({
  period: {
    from : {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  },
  incomes: {
    fixed: {
      type: Number,
      required: false
    },
    variable: {
      type: Number,
      required: false
    }
  }
});

mongoose.model('Config', schema);

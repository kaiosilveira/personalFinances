var mongoose = require('mongoose');

module.exports = function(connectionUrl) {

  mongoose.connect(connectionUrl);

  mongoose.connection.on('connected', function() {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', function(error) {
    console.log('MongoDB connection error: ' + error);
  });

  mongoose.connection.on('disconnect', function() {
    console.log('MongoDB disconnected');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('MongoDB disconnected');
      process.exit(0);
    });
  });
  
}

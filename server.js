var http = require('http');
var app = require('./config/express');
require('./config/database')('mongodb://localhost/personalFinances');

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('server running');
});

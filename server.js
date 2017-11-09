var http = require('http');
var express = require('express'),
  app = express();

  app.use(express.static('./public'));

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('server running');
});

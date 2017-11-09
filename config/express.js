var express = require('express'),
  app = express();

app.use(express.static('./public'));

module.exports = app;

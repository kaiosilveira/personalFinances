var express = require('express'),
  app = express();
var consign = require('consign');

app.use(express.static('./public'));

consign({ cwd: 'api' })
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

module.exports = app;

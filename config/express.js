var express = require('express'),
  app = express();
var bodyParser = require('body-parser');
var consign = require('consign');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

consign({ cwd: 'api' })
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

module.exports = app;

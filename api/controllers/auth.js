var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var model = mongoose.model('User');

module.exports = function(app) {

  var api = {};

  api.auth = function(req, res) {

    model
    .findOne({ username: req.body.username, password: req.body.password })
    .then(
      user => {
        console.log(JSON.stringify(user));
        if(!user) {
          console.log('invalid credentials');
          res.sendStatus(401);
        } else {
          console.log('creating token');

          var token = jwt.sign({ username: user.username }, app.get('secret'), {
            expiresIn: 86400
          });

          console.log('token created', token);

          res.set('x-access-token', token);
          res.end();
        }
      },
      err => {
        console.log(err);
        res.sendStatus(401);
      }
    );
  };

  api.validateToken = function(req, res, next) {

    console.log('validating token');
    var token = req.headers['x-access-token'];

    if(token) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {

        if(err) {
          console.log(err);
          res.sendStatus(401);
        } else {
          console.log(decoded);
          req.user = decoded;
          next();
        }

      });

    } else {
      console.log('token not found');
      res.sendStatus(401);
    }

  };

  return api;
};

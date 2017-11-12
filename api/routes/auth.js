module.exports = function(app) {

  var authController = app.controllers.auth;

  app.post('/v1/auth', authController.auth);
  app.use('/*', authController.validateToken);

}

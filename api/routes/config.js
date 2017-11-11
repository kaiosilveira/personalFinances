module.exports = function(app) {

  var configController = app.controllers.config;

  app
    .route('/v1/config')
    .get(configController.get)
    .post(configController.create);

  app
    .route('/v1/config/:id')
    .put(configController.update);

}

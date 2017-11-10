module.exports = function(app) {

  var registersController = app.controllers.registersController;

  app
    .route('/v1/registers')
    .get(registersController.list);

}

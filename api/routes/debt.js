module.exports = function(app) {

  var debtsController = app.controllers.debt;

  app
    .route('/v1/debts')
    .get(debtsController.list)
    .post(debtsController.create);

  app
    .route('/v1/debts/:id')
    .put(debtsController.update)
    .delete(debtsController.delete);

}

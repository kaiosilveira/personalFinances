var mongoose = require('mongoose');
var debtsController = {}
var model = mongoose.model('Debt');

debtsController.list = function(req, res) {

  model
  .find()
  .then(
    data => res.json(data),
    err => res.status(500).json(err)
  );

};

debtsController.create = function(req, res) {

  model
  .create(req.body)
  .then(
    debt => {
      console.log(debt);
      res.status(201).json(debt);
    },
    err => res.status(500).json(err)
  );

}

debtsController.update = function(req, res) {

  model
  .findByIdAndUpdate(req.params.id, req.body)
  .then(
    debt => res.json(debt),
    err => res.status(500).json(err)
  );

}

debtsController.delete = function(req, res) {

  model
  .remove({ _id : req.params.id })
  .then(
    () => res.sendStatus(204),
    err => res.status(500).json(err)
  );

}

module.exports = debtsController;

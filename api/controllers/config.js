var mongoose = require('mongoose');
var configController = {}
var model = mongoose.model('Config');

configController.get = function(req, res) {

  model
  .find()
  .then(
    data => res.json(data),
    err => res.status(500).json(err)
  );

};

configController.create = function(req, res) {

  model
  .create(req.body)
  .then(
    config => res.status(201).json(config),
    err => res.status(500).json(err)
  );

}

configController.update = function(req, res) {

  model
  .findByIdAndUpdate(req.params.id, req.body)
  .then(
    config => res.json(config),
    err => res.status(500).json(err)
  );

}

configController.delete = function(req, res) {

  model
  .remove({ _id : req.params.id })
  .then(
    () => res.sendStatus(204),
    err => res.status(500).json(err)
  );

}

module.exports = configController;

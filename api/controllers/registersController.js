var registersController = {}

registersController.list = function(req, res) {
  res.json([
    {
      title: 'Almoço',
      amount: 25,
      expirationDate: new Date(),
      recurrent: false,
      description: 'Almoço no Mania de Churrasco Bourbon Plazza Shopping em 10/11/2017'
    }
  ]);
};

module.exports = registersController;

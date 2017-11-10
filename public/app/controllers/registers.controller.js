(function() {

  'use strict';

  angular.module('personal-finances').controller('registersController', registersController);

  registersController.$inject = ['$scope', '$routeParams', '$location', 'registersProvider', 'dateHelper'];

  function registersController($scope, $routeParams, $location, registersProvider, dateHelper) {

    var self = this;

    //variables initialization
    self._init = _init;
    self.registry = {};
    self.registers = [];
    self.filteredRegistries = [];
    self.showPendingOnly = false;

    //functions
    self.getTotal = getTotal;

    self._init();

    self.getTotalPaid = () => {
      return $scope.filteredRegistries.length ?
          $scope.filteredRegistries
          .filter(r => r.paid)
          .map(r => parseFloat(r.amount))
          .reduce((total, item) => total += item, 0)
          : 0;
    }

    self.getTotalPending = () => {
      return self.filteredRegistries.length ?
      self.filteredRegistries
        .filter(r => !r.paid)
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

    self.setPaid = registry => {
      var r = self.registers[self.registers.indexOf(registry)];
      var index = self.registers.indexOf(registry);

      r.paid = r.paid ? false : true;

      registersProvider.update(r, index);

      Materialize.toast('Registro atualizado!', 2000);
    }

    self.filterRegistryList = () => {
      self.filteredRegistries = self.showPendingOnly ?
      self.registers.filter(r => !r.paid)
        : self.registers;
    }

    self.showDetails = (registry) => {
      $location.path('/details/' + registry.id);
    }

    self.isExpired = (registry) => {
      let isPrevious = dateHelper.previous(dateHelper.fromFormatedString(registry.expirationDate), new Date());
      return !registry.paid && isPrevious;
    }

    self.save = () => {

      registersProvider.add(self.registry);
      self.registry = {};

      Materialize.toast('Registro adicionado!', 2000);
    }

    self.update = () => {
      registersProvider.update(angular.copy(self.registry));
      self.registry = {};

      Materialize.toast('Registro atualizado!', 2000);
    }

    self.delete = () => {
      registersProvider.delete(self.registry);
      self.registry = {};

      Materialize.toast('Registro deletado!', 2000);
    }

    function _init() {
      registersProvider
      .list()
      .then(
        registers => {
          console.log(registers);
          self.registry = registers.filter(r => r.id == $routeParams.id)[0] || {};
          self.registers = registers;
          self.filteredRegistries = self.registers || [];
        },
        err => console.log(err));
    }

    function getTotal() {
      return self.filteredRegistries.length ?
        self.filteredRegistries
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

  }

})();

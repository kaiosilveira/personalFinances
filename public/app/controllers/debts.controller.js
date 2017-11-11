(function() {

  'use strict';

  angular.module('personal-finances').controller('debtsController', debtsController);

  debtsController.$inject = ['$scope', '$routeParams', '$location', 'debtsService', 'dateHelper'];

  function debtsController($scope, $routeParams, $location, debtsService, dateHelper) {

    var self = this;

    //variables initialization
    self._init = _init;
    self.debt = {};
    self.debts = [];
    self.filteredDebts = [];
    self.showPendingOnly = false;

    //function references
    self.getTotal = getTotal;
    self.setPaid = setPaid;
    self.getTotalPending = getTotalPending;
    self.getTotalPaid = getTotalPaid;
    self.save = save;
    self.update = update;
    self.delete = remove;
    self.filterRegistryList = filterRegistryList;
    self.showDetails = showDetails;
    self.isExpired = isExpired;

    //initialization
    self._init();

    //functions
    function getTotalPaid() {
      return self.filteredDebts.length ?
          self.filteredDebts
          .filter(r => r.paid)
          .map(r => parseFloat(r.amount))
          .reduce((total, item) => total += item, 0)
          : 0;
    }

    function getTotalPending() {
      return self.filteredDebts.length ?
      self.filteredDebts
        .filter(r => !r.paid)
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

    function filterRegistryList() {
      self.filteredDebts = self.showPendingOnly ?
      self.debts.filter(r => !r.paid)
        : self.debts;
    }

    function showDetails(debt) {
      $location.path('/details/' + debt._id);
    }

    function isExpired(debt) {
      let isPrevious = dateHelper.previous(dateHelper.fromFormatedString(debt.expirationDate), new Date());
      return !debt.paid && isPrevious;
    }

    function save() {

      debtsService
      .post(self.debt)
      .then(
        success => {
          Materialize.toast('Registro adicionado!', 2000);
          self.debt = {};
        },
        error => {
          Materialize.toast('Falha ao adicionar o registro');
          self.debt = {};
        }
      );

    }

    function update() {
      debtsService.update(angular.copy(self.debt));
      self.debt = {};

      Materialize.toast('Registro atualizado!', 2000);
    }

    function remove() {

      debtsService
      .delete(self.debt)
      .then(
        () => {
          self.debt = {};
          Materialize.toast('Registro deletado!', 2000);
          $location.url('/');
        },
        err => {
          Materialize.toast('Falha ao excluir o registro', 2000);
          console.log(err);
        }
      );

    }

    function _init() {
      debtsService
      .list()
      .then(
        result => {
          self.debts = result.data;
          self.debt = self.debts.filter(r => r._id == $routeParams.id)[0] || {};
          console.log(self.debt);
          self.filteredDebts = self.debts || [];
        },
        err => console.log(err));
    }

    function getTotal() {
      return self.filteredDebts.length ?
        self.filteredDebts
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

    function setPaid(debt) {

      debt.paid = !debt.paid;

      setTimeout(() => {
        debtsService
        .update(debt)
        .then(
          () => {
            Materialize.toast('Registro atualizado!', 2000);
          },
          err => Materialize.toast('Falha ao atualizar o registro', 2000)
        );
      }, 300);

    }

  }

})();

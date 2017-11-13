(function() {

  'use strict';

  angular.module('personal-finances').controller('debtsController', debtsController);

  debtsController.$inject = ['$rootScope', '$scope', '$routeParams', '$location', 'debtsService', 'dateHelper', 'periodHelper', 'configService'];

  function debtsController($rootScope, $scope, $routeParams, $location, debtsService, dateHelper, periodHelper, configService) {

    $rootScope.action = 'list';

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
    self.filterDebtList = filterDebtList;
    self.showDetails = showDetails;
    self.isExpired = isExpired;
    self.getPreviousPeriod = getPreviousPeriod;
    self.getNextPeriod = getNextPeriod;

    //initialization
    self._init();

    //functions

    function getPreviousPeriod() {

      self.period = periodHelper.getPrevious(self.period, self.config);

      debtsService.listByPeriod(self.period.getName())
      .then(
        result => {
          self.debts = result.data;
          self.debt = self.debts.filter(r => r._id == $routeParams.id)[0] || {};
          self.filteredDebts = self.debts || [];
        },
        err => console.log(err)
      );

    }

    function getNextPeriod() {

      self.period = periodHelper.getNext(self.period, self.config);

      debtsService.listByPeriod(self.period.getName())
      .then(
        result => {
          self.debts = result.data;
          self.debt = self.debts.filter(r => r._id == $routeParams.id)[0] || {};
          self.filteredDebts = self.debts || [];
        },
        err => console.log(err)
      );

    }

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

    function filterDebtList() {

      self.filteredDebts = self.debts;

      if(self.showPendingOnly)
        self.filteredDebts = self.debts.filter(debt => !debt.paid);

      if(self.showInstallments)
        self.filteredDebts = self.filteredDebts.filter(debt => debt.isInstallment);

      if(self.search)
        self.filteredDebts = self.filteredDebts.filter(debt => omniFilter(debt, self.search));
    }

    function showDetails(debt) {
      $location.path('/details/' + debt._id);
    }

    function isExpired(debt) {
      return !debt.paid && new Date(debt.expirationDate) < new Date();
      let isPrevious = dateHelper.previous(dateHelper.fromFormatedString(debt.expirationDate), new Date());
      return !debt.paid && isPrevious;
    }

    function save() {

      self.debt.period = self.period.getName();

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

    function _init() {

      configService
      .get()
      .then(config => {
        self.config = config;
        self.period = periodHelper.buildPeriod(config);
        console.log(periodHelper.getPeriodNameByDate(new Date(2017, 2, 17), config));
        return debtsService.listByPeriod(self.period.getName());
      })
      .then(
        result => {
          self.debts = result.data;
          self.debt = self.debts.filter(r => r._id == $routeParams.id)[0] || {};
          self.filteredDebts = self.debts || [];
        },
        err => console.log(err));

    }

    //auxiliary functions
    function omniFilter(entity, searchTerm) {

      if(!searchTerm)
        return true;

      return Object
      .keys(entity)
      .some(key => entity.hasOwnProperty(key) && entity[key].toString().indexOf(searchTerm) >= 0);

    }

  }

})();

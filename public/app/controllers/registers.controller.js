(function() {

  'use strict';

  angular.module('personal-finances').controller('registersController', registersController);

  registersController.$inject = ['$scope', '$routeParams', '$location', 'registersProvider', 'dateHelper'];

  function registersController($scope, $routeParams, $location, registersProvider, dateHelper) {

    $scope.registry = registersProvider.list().filter(r => r.id == $routeParams.id)[0] || {};
    $scope.registers = registersProvider.list();
    $scope.filteredRegistries = $scope.registers || [];
    $scope.showPendingOnly = false;

    $scope.getTotal = () => {
      return $scope.filteredRegistries.length ?
        $scope.filteredRegistries
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

    $scope.getTotalPaid = () => {
      return $scope.filteredRegistries.length ?
          $scope.filteredRegistries
          .filter(r => r.paid)
          .map(r => parseFloat(r.amount))
          .reduce((total, item) => total += item, 0)
          : 0;
    }

    $scope.getTotalPending = () => {
      return $scope.filteredRegistries.length ?
      $scope.filteredRegistries
        .filter(r => !r.paid)
        .map(r => parseFloat(r.amount))
        .reduce((total, item) => total += item, 0)
        : 0;
    }

    $scope.setPaid = registry => {
      var r = $scope.registers[$scope.registers.indexOf(registry)];
      var index = $scope.registers.indexOf(registry);

      r.paid = r.paid ? false : true;

      registersProvider.update(r, index);

      Materialize.toast('Registro atualizado!', 2000);
    }

    $scope.filterRegistryList = () => {
      $scope.filteredRegistries = $scope.showPendingOnly ?
      $scope.registers.filter(r => !r.paid)
        : $scope.registers;
    }

    $scope.showDetails = (registry) => {
      $location.path('/details/' + registry.id);
    }

    $scope.isExpired = (registry) => {
      let isPrevious = dateHelper.previous(dateHelper.fromFormatedString(registry.expirationDate), new Date());
      return !registry.paid && isPrevious;
    }

    $scope.save = () => {

      registersProvider.add($scope.registry);
      $scope.registry = {};

      Materialize.toast('Registro adicionado!', 2000);
    }

    $scope.update = () => {
      registersProvider.update(angular.copy($scope.registry));
      $scope.registry = {};

      Materialize.toast('Registro atualizado!', 2000);
    }

    $scope.delete = () => {
      registersProvider.delete($scope.registry);
      $scope.registry = {};

      Materialize.toast('Registro deletado!', 2000);
    }

  }

})();

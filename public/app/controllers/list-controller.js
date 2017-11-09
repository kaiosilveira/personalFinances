(function() {

  'use strict';

  function listController($scope, $location, registersProvider, dateHelper) {

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
  }

  listController.$inject = ['$scope', '$location', 'registersProvider', 'dateHelper'];

  angular.module('personal-finances').controller('listController', listController);

})();

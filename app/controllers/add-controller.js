(function() {

  'use strict';

  function addController($scope, registersProvider) {

    $scope.save = () => {

      registersProvider.add($scope.registry);
      $scope.registry = {};

      Materialize.toast('Registro adicionado!', 2000);
    }

  }

  addController.$inject = ['$scope', 'registersProvider'];

  angular.module('personal-finances').controller('addController', addController);

})();

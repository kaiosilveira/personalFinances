(function() {

  'use strict';

  function detailsController($scope, $rootScope, $routeParams, registersProvider) {

    $scope.registry = registersProvider.list().filter(r => r.id == $routeParams.id)[0];

    $scope.save = () => {
      registersProvider.update($scope.registry);
      $scope.registry = {};

      Materialize.toast('Registro atualizado!', 2000);
    }

    $scope.delete = () => {
      registersProvider.delete($scope.registry);
      $scope.registry = {};

      Materialize.toast('Registro deletado!', 2000);
    }

  }

  detailsController.$inject = ['$scope', '$rootScope', '$routeParams', 'registersProvider'];

  angular.module('personal-finances').controller('detailsController', detailsController);

})();

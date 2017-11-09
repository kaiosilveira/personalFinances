(function() {

  'use strict';

  function configController($scope, $rootScope, configProvider) {

    $scope.config = angular.copy(configProvider.get());

    $scope.save = () => {
      configProvider.update(angular.copy($scope.config));
      Materialize.toast('Configurações redefinidas', 2000);
    }

  }

  configController.$inject = ['$scope', '$rootScope', 'configProvider'];

  angular.module('personal-finances').controller('configController', configController);

})();

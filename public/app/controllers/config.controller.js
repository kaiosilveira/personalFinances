(function() {

  'use strict';

  angular.module('personal-finances').controller('configController', configController);

  configController.$inject = ['$scope', '$rootScope', 'configProvider'];

  function configController($scope, $rootScope, configProvider) {

    var self = this;

    self.config = angular.copy(configProvider.get());

    self.save = () => {
      configProvider.update(angular.copy(self.config));
      Materialize.toast('Configurações redefinidas', 2000);
    }

  }

})();

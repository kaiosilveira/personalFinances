(function() {

  'use strict';

  function registersService($rootScope) {

    var service = {

      model: {
        registers : []
      },

      saveState : () => {
        sessionStorage.registersService = angular.toJson(service.model);
      },

      restoreState : () => {
        service.model = angular.fromJson(sessionStorage.registersService);
      }

    };

    $rootScope.$on('saveRegisters', service.saveState);
    $rootScope.$on('restoreRegisters', service.restoreState);

    return service;
  }

  registersService.$inject = ['$rootScope'];
  angular.module('personal-finances').service('registersService', registersService);

})();

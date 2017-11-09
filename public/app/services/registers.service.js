(function() {

  'use strict';

  function registersService($rootScope) {

    var service = {

      model: {
        registers : []
      },

      list : () => {
        return angular
        .fromJson(sessionStorage.registersService)
        .registers;
      },

      saveState : () => {
        console.log(service.model);
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

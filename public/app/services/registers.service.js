(function() {

  'use strict';

  angular.module('personal-finances').service('registersService', registersService);

  registersService.$inject = ['$rootScope', '$http', '$q'];

  function registersService($rootScope, $http, $q) {

    var baseUrl = '/v1/registers';

    var service = {

      model: {
        registers : []
      },

      list : () => $http.get(baseUrl),

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

})();

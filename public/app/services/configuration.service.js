(function() {

  'use strict';

  function configService($rootScope) {

    var service = {

      model: {
          period: {
            from : 0,
            to: 0
          },
          incomes: {
            fixed: 0,
            variable: 0
          }
      },

      get: () => {
        return angular.fromJson(sessionStorage.config || service.model);
      },

      saveState: () => {
        sessionStorage.config = angular.toJson(service.model);
        console.log('config saved');
      },

      restoreState: () => {
        service.model = angular.fromJson(sessionStorage.config);
        console.log('config restored');
      }

    };

    $rootScope.$on('configUpdated', service.saveState);
    $rootScope.$on('restoreConfig', service.restoreState);

    return service;
  }

  configService.$inject = ['$rootScope'];
  angular.module('personal-finances').service('configService', configService);

})();

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

      saveState: () => {
        sessionStorage.configService = angular.toJson(service.model);
        console.log('config saved');
      },

      restoreState: () => {
        service.model = angular.fromJson(sessionStorage.configService);
        console.log('config restored');
      }

    };

    $rootScope.$on('saveConfig', service.saveState);
    $rootScope.$on('restoreConfig', service.restoreState);

    return service;
  }

  configService.$inject = ['$rootScope'];
  angular.module('personal-finances').service('configService', configService);

})();

(function() {

  'use strict';

  function configProvider($rootScope, configService) {

    var provider = {

      get: () => {

        $rootScope.$broadcast('restoreConfig');

        return configService.model ? configService.model : {
          period: {
            from: 5,
            to: 4
          },
          incomes: {
            fixed: 0,
            variable: 0
          }
        };
      },

      getPeriod: () => {
        return configService.get().period || { from: 5, to: 4 };
      },

      update: (config) => {
        configService.model = config;
        $rootScope.$broadcast('configUpdated');
      }

    };

    return provider;
  }

  configProvider.$inject = ['$rootScope', 'configService'];
  angular.module('personal-finances').factory('configProvider', configProvider);

})();

(function() {

  'use strict';

  function configProvider($rootScope, configService) {

    var currentDate = new Date();
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

      getPeriodStartDate: () => {
        var period = configService.get().period;
        return new Date(
          currentDate.getFullYear(),
          currentDate.getDate() < period.from ? currentDate.getMonth() - 1 : currentDate.getMonth(),
          period.from)
          .toLocaleDateString();
      },

      getPeriodEndDate: () => {
        var period = configService.get().period;
        return new Date(
          currentDate.getFullYear(),
          currentDate.getDate() < period.from ? currentDate.getMonth() : currentDate.getMonth() + 1,
          period.to)
          .toLocaleDateString();
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

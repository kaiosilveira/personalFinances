(function() {

  'use strict';

  function homeController($sope, configProvider) {

    var self = this;
    var config = configProvider.get();
    var currentDate = new Date();

    self.getPeriodStartDate = () => {
      return new Date(currentDate.getFullYear(),  currentDate.getMonth() - 1, config.period.from).toLocaleDateString();
    }

    self.getPeriodEndDate = () => {
      return new Date(currentDate.getFullYear(),  currentDate.getMonth(), config.period.to).toLocaleDateString();
    }

  }

  homeController.$inject = ['$scope', 'configProvider'];
  angular.module('personal-finances').controller('homeController', homeController);

})();

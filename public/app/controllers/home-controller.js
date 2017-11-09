(function() {

  'use strict';

  function homeController($scope, configProvider) {

    var self = this;
    var period = configProvider.getPeriod();
    console.log(period);
    var currentDate = new Date();

    self.getPeriodStartDate = () => {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getDate() < period.from ? currentDate.getMonth() - 1 : currentDate.getMonth(),
        period.from)
        .toLocaleDateString();
    }

    self.getPeriodEndDate = () => {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getDate() < period.from ? currentDate.getMonth() : currentDate.getMonth() + 1,
        period.to)
        .toLocaleDateString();
    }

    $scope.$on('configUpdated', () => period = configProvider.getPeriod());

  }

  homeController.$inject = ['$scope', 'configProvider'];
  angular.module('personal-finances').controller('homeController', homeController);

})();

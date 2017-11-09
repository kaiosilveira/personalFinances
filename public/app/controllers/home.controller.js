(function() {

  'use strict';

  angular.module('personal-finances').controller('homeController', homeController);
  homeController.$inject = ['$scope', 'configProvider'];

  function homeController($scope, configProvider) {

    var self = this;
    var period = configProvider.getPeriod();

    self.getPeriodStartDate = () => configProvider.getPeriodStartDate();

    self.getPeriodEndDate = () => configProvider.getPeriodEndDate();

    $scope.$on('configUpdated', () => period = configProvider.getPeriod());

  }

})();

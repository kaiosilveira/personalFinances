(function() {

  'use strict';

  angular.module('personal-finances').controller('homeController', homeController);

  homeController.$inject = ['$scope', 'configService'];

  function homeController($scope, configService) {

    var self = this;
    self.config = {};
    self.period = {};
    self.getPeriodStartDate = getPeriodStartDate;
    self.getPeriodEndDate = getPeriodEndDate;

    let currentDate = new Date();

    _init();

    function _init() {
      configService.get()
      .then(
        config => {
          self.config = config;
          self.period = config.period;
        },
        err => console.log(err));
    }

    function getPeriodStartDate() {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getDate() < self.period.from ? currentDate.getMonth() - 1 : currentDate.getMonth(),
        self.period.from)
        .toLocaleDateString();
    }

    function getPeriodEndDate() {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getDate() < self.period.from ? currentDate.getMonth() : currentDate.getMonth() + 1,
        self.period.to)
        .toLocaleDateString();
    }

  }

})();

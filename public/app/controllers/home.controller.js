(function() {

  'use strict';

  angular.module('personal-finances').controller('homeController', homeController);

  homeController.$inject = ['$rootScope', '$scope', 'configService'];

  function homeController($rootScope, $scope, configService) {

    $rootScope.action = 'home';

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
      return this.config.period ? this.config.period.getStartDate().toLocaleDateString() : null;
    }

    function getPeriodEndDate() {
      return this.config.period ? this.config.period.getEndDate().toLocaleDateString() : null;
    }

  }

})();

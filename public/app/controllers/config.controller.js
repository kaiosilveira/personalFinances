(function() {

  'use strict';

  angular.module('personal-finances').controller('configController', configController);

  configController.$inject = ['$scope', '$rootScope', 'configService'];

  function configController($scope, $rootScope, configService) {

    $rootScope.action = 'config';

    var self = this;
    self.save = save;

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

    function save(){
      configService.update(angular.copy(self.config))
      .then(
        success => Materialize.toast('Configurações redefinidas', 2000),
        err => console.log(err)
      );
    }

  }

})();

(function() {
  'use strict';

  angular.module('personal-finances').controller('groupsController', groupsController);

  groupsController.$inject = ['$scope'];

  function groupsController($scope) {

    var self = this;

    self.group = {};
    self.save = function() {
      console.log(['group', angular.copy(self.group)]);
      self.group = {};
      Materialize.toast('Registro adicionado!', 2000);
    };

  }

})();

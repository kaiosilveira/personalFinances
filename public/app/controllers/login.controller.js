(function() {

  'use strict';

  angular
  .module('personal-finances')
  .controller('loginController', loginController);

  loginController.$inject = ['$rootScope', '$location', '$http'];

  function loginController($rootScope, $location, $http) {

    $rootScope.action = 'login';

    var self = this;
    var baseUrl = '/v1/auth';

    self.user = {};
    self.login = login;

    function login() {
      $http.post(baseUrl, self.user)
      .then(user => {
        console.log(user);
        $location.path('/');
      },
      err => {
        console.log(err);
        Materialize.toast('Usuário ou senha inválidos', 2000);
      });
    }

  }

})();

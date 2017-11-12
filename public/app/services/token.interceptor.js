(function() {

  'use strict';

  angular.module('personal-finances').factory('tokenInterceptor', tokenInterceptor);

  tokenInterceptor.$inject = ['$window', '$location', '$q'];

  function tokenInterceptor($window, $location, $q) {

    var interceptor = {};

    interceptor.response = function(response) {

      console.log('intercepting response');
      var token = response.headers('x-access-token');

      if(token) {
        console.log('token defined at response');
        $window.sessionStorage.token = token;
      }

      return response;
    }

    interceptor.request = function(config) {
      config.headers =  config.headers || {};

      if($window.sessionStorage.token) {
        config.headers['x-access-token'] = $window.sessionStorage.token;
      }

      return config;
    }

    interceptor.responseError = function(rejection) {

      if(rejection != null && rejection.status === 401) {
        console.log('token rejected');
        delete $window.sessionStorage.token;
        $location.path('/login');
      }

      return $q.reject(rejection);

    }

    return interceptor;

  }

})();

angular
  .module('personal-finances', ['ngRoute'])
  .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {

    $httpProvider.interceptors.push('tokenInterceptor');

  }

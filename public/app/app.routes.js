(function() {

  'use strict';

  function routesConfig($routeProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/app/views/list.html',
      controller: 'listController'
    })
    .when('/config', {
      templateUrl: '/app/views/config.html',
      controller: 'configController'
    })
    .when('/add', {
      templateUrl: 'app/views/add.html',
      controller: 'addController'
    })
    .when('/details/:id', {
      templateUrl: 'app/views/details.html',
      controller: 'detailsController'
    });

  }

  routesConfig.$inject = ['$routeProvider'];

  angular.module('personal-finances').config(routesConfig);

})();

(function() {

  'use strict';

  function routesConfig($routeProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/app/views/registers/list.html',
      controller: 'registersController'
    })
    .when('/config', {
      templateUrl: '/app/views/config/config.html',
      controller: 'configController',
      controllerAs: 'configCtrl'
    })
    .when('/add', {
      templateUrl: 'app/views/registers/add.html',
      controller: 'registersController'
    })
    .when('/details/:id', {
      templateUrl: 'app/views/registers/details.html',
      controller: 'registersController'
    })
    .when('/groups/new/', {
      templateUrl: 'app/views/groups/add.html',
      controller: 'groupsController',
      controllerAs: 'groupsCtrl'
    });

  }

  routesConfig.$inject = ['$routeProvider'];

  angular.module('personal-finances').config(routesConfig);

})();

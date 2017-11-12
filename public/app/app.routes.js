(function() {

  'use strict';

  function routesConfig($routeProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/app/views/debts/list.html',
      controller: 'debtsController',
      controllerAs: 'debtsCtrl'
    })
    $routeProvider
    .when('/login', {
      templateUrl: '/app/views/login/login.html',
      controller: 'loginController',
      controllerAs: 'loginCtrl'
    })
    .when('/config', {
      templateUrl: '/app/views/config/config.html',
      controller: 'configController',
      controllerAs: 'configCtrl'
    })
    .when('/add', {
      templateUrl: 'app/views/debts/add.html',
      controller: 'debtsController',
      controllerAs: 'debtsCtrl'
    })
    .when('/details/:id', {
      templateUrl: 'app/views/debts/details.html',
      controller: 'debtsController',
      controllerAs: 'debtsCtrl'
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

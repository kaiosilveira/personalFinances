(function() {

  'use strict';

  angular.module('personal-finances').service('debtsService', debtsService);

  debtsService.$inject = ['$rootScope', '$http', '$q'];

  function debtsService($rootScope, $http, $q) {

    let baseUrl = '/v1/debts';

    let service = {
      post: post,
      list: list,
      get: get,
      update: update,
      delete: remove
    };

    return service;

    function post(debt) {
      return $http.post(baseUrl, debt);
    }

    function list() {
      return $http.get(baseUrl)
    }

    function get(id) {
      return $http.get(baseUrl + '/' + id);
    }

    function update(debt) {
      return $http.put(baseUrl + '/' + debt._id, debt);
    }

    function remove(debt) {
      return $http.delete(baseUrl + '/' + debt._id);
    }

  }

})();

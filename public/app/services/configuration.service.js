(function() {

  'use strict';

  angular.module('personal-finances').service('configService', configService);

  configService.$inject = ['$http', '$q'];

  function configService($http, $q) {

    let baseUrl = '/v1/config';
    const DEFAULT_CONFIG = {
      period: {
        from: 5,
        to: 4
      },
      incomes: {
        fixed: 0,
        variable: 0
      }
    };

    var service = {
      post: post,
      get: get,
      update: update
    };

    return service;

    function post(config) {
        return $http.post(baseUrl, config);
    }

    function get() {
      var defer = $q.defer();

      $http
      .get(baseUrl)
      .then(
        result => defer.resolve(result.data && result.data.length ? result.data[0] : DEFAULT_CONFIG),
        err => defer.reject(err)
      );

      return defer.promise;
    }

    function update(config) {
      return config._id ? $http.put(baseUrl + '/' + config._id, config) : $http.post(baseUrl, config);
    }

  }

})();

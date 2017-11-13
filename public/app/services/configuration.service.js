(function() {

  'use strict';

  angular.module('personal-finances').service('configService', configService);

  configService.$inject = ['$http', '$q'];

  function configService($http, $q) {

    let baseUrl = '/v1/config';
    const DEFAULT_CONFIG = {
      period: {
        from: 5,
        to: 4,
        getStartDate: function() {
          var currentDate = new Date();
          return new Date(
            currentDate.getFullYear(),
            currentDate.getDate() < this.from ? currentDate.getMonth() - 1 : currentDate.getMonth(),
            this.from);
        },
        getEndDate: function() {
          var currentDate = new Date();
          return new Date(
            currentDate.getFullYear(),
            currentDate.getDate() < this.from ? currentDate.getMonth() : currentDate.getMonth() + 1,
            this.to);
        },
        getName: function() {
          let startDate = this.getStartDate();
          return [startDate.getFullYear(), startDate.getMonth() + 1].join('');
        }
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
        result => {

          var config = {};
          if(result.data && result.data.length) {
            config = result.data[0];
            config.period.getStartDate = DEFAULT_CONFIG.period.getStartDate;
            config.period.getEndDate = DEFAULT_CONFIG.period.getEndDate;
            config.period.getName = DEFAULT_CONFIG.period.getName;
          } else
            config = DEFAULT_CONFIG;

          defer.resolve(config);
        },
        err => defer.reject(err)
      );

      return defer.promise;
    }

    function update(config) {
      return config._id ? $http.put(baseUrl + '/' + config._id, config) : $http.post(baseUrl, config);
    }

  }

})();

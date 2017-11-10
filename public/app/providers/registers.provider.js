(function() {

  'use strict';

  angular.module('personal-finances').factory('registersProvider', registersProvider);

  registersProvider.$inject = ['$rootScope', '$q', 'registersService', 'guidFactory'];

  function registersProvider($rootScope, $q, registersService, guidFactory) {

    var provider = {

      list : () => {

        var defer = $q.defer();

        registersService
        .list()
        .then(
          result => defer.resolve(result.data),
          err => defer.reject(err)
        );

        return defer.promise;

      },

      add: (registry) => {

        registry.id = guidFactory.createGuid();

        if(!registersService.model)
          registersService.model = {
            registers: []
          };

        registersService.model.registers.push(registry);
        $rootScope.$broadcast('saveRegisters');
      },

      update: (registry) => {
        let index = registersService.model.registers.findIndex(r => r.id == registry.id);
        registersService.model.registers[index] = registry;
        $rootScope.$broadcast('saveRegisters');
      },

      delete: (registry) => {
        registersService.model.registers.forEach(r => {
          if(r.id == registry.id) {
            registersService.model.registers.splice(registersService.model.registers.indexOf(r), 1);
            $rootScope.$broadcast('saveRegisters');
          }
        })
      }
    }

    return provider;
  }

})();

(function() {

  'use strict';

  angular.module('personal-finances').factory('registersProvider', registersProvider);

  registersProvider.$inject = ['$rootScope', 'registersService', 'guidFactory'];

  function registersProvider($rootScope, registersService, guidFactory) {

    var provider = {

      list : () => {
        $rootScope.$broadcast('restoreRegisters');

        if(!registersService.list() || !registersService.list().length)
          return [];

        return registersService.list();
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
        console.log(['registry at provider', registry]);
        registersService.model.registers.filter(r => r.id == registry.id)[0] = registry;
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

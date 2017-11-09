(function() {

  guidFactory = () => {

    var factory = {
      s4: () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      },

      createGuid: () => {
        return factory.s4() + factory.s4() + '-' + factory.s4() + '-' + factory.s4() + '-' +
          factory.s4() + '-' + factory.s4() + factory.s4() + factory.s4();
      }
    };

    return factory;
  }

  angular.module('personal-finances').factory('guidFactory', guidFactory);

})();

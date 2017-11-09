(function() {

  'use strict';

  anglar.module('personal-finances').factory('groupsProvider', groupsProvider);

  function groupsProvider() {

    var provider = {};

    provider.save = function(group) {
      console.log('we must save da group', group);
    };

    return provider;

  }

})();

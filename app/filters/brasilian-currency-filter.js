(function() {

  'use strict';

  function brasilianCurrencyFilter() {

    return (value) => {
      var str = value.toString();
      return 'R$' + str.replace('.', ',');
    }
  }

  angular.module('personal-finances').filter('currencybr', brasilianCurrencyFilter);

})();

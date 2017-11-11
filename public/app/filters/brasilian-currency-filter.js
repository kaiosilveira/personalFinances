(function() {

  'use strict';

  function brasilianCurrencyFilter() {

    return (value) => {

      if(!value)
        return 'R$00,00';

      var str = value.toFixed(2);
      return 'R$' + str.replace('.', ',');
    }
  }

  angular.module('personal-finances').filter('currencybr', brasilianCurrencyFilter);

})();

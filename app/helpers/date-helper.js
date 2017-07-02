(function() {

  'use strict';

  function dateHelper() {

    var helper = {
      equals: (d1, d2) => {
        return (
          d1.getYear() == d2.getYear() &&
          d1.getMonth() == d2.getMonth() &&
          d1.getDate() == d2.getDate());
      },

      previous: (date, comparison) => {
        let hasPreviousYear = date.getYear() < comparison.getYear();
        let hasPreviousMonth = date.getYear() >= comparison.getYear() && date.getMonth() < comparison.getMonth();
        let hasPreviousDay = date.getYear() >= comparison.getYear() && date.getMonth() >= comparison.getMonth() && date.getDate() < comparison.getDate();

        return hasPreviousYear || hasPreviousMonth || hasPreviousDay;
      },

      fromFormatedString: (dateStr) => {
        return new Date(dateStr.split('/').reverse());
      }
    };

    return helper;
  };

  angular.module('personal-finances').factory('dateHelper', dateHelper);

})();

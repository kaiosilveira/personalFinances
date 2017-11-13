(function () {

  'use strict';

  angular.module('personal-finances').factory('periodHelper', periodHelper);

  function periodHelper() {

    var helper = {};

    helper.buildPeriod = function(config, startDate, endDate) {

      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let monthFrom = currentDate.getDate() < config.period.from ? currentDate.getMonth() - 1 : currentDate.getMonth();
      let monthTo = currentDate.getDate() < config.period.from ? currentDate.getMonth() : currentDate.getMonth() + 1;
      let from = startDate ? startDate : new Date(year, monthFrom, config.period.from);
      let to = endDate ? endDate : new Date(year, monthTo, config.period.to);

      let period = {
        from: from,
        to: to,
        getName: function() {
          return [this.from.getFullYear(), this.from.getMonth() + 1].join('');
        }
      };

      return period;
    }

    helper.getNext = function(period, config) {

      let startDate = new Date(
        period.from.getFullYear(),
        period.from.getMonth() + 1,
        period.from.getDate()
      );

      let endDate = new Date(
        period.to.getFullYear(),
        period.to.getMonth() + 1,
        period.to.getDate()
      );

      return this.buildPeriod(config, startDate, endDate);

    }

    helper.getPrevious = function(period, config) {

      let startDate = new Date(
        period.from.getFullYear(),
        period.from.getMonth() - 1,
        period.from.getDate()
      );

      let endDate = new Date(
        period.to.getFullYear(),
        period.to.getMonth() - 1,
        period.to.getDate()
      );

      return this.buildPeriod(config, startDate, endDate);

    }

    helper.getPeriodNameByDate = function(date, period) {

      if(date.getDate() >= period.from.getDate() && date.getDate() <= period.from.getDate)
        return period.getName();

    }

    return helper;

  }

})();

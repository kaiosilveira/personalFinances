(function() {

  function priceDirective($filter) {
    return {

      restrict : 'A',
      require : 'ngModel',
      link : (scope, element, attrs, ngModelController) => {
        ngModelController.$parses.push(data => {
          data = $filter('commaToDecimal')(data);
        });
      }
    };
  }

  priceDirective.$inject = ['$filter'];
  angular.module('personal-finances').directive('price', priceDirective);

})();

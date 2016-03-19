var stockrApp = angular.module('stockrApp', ['ngRoute', 'stockrControllers']);

stockrApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/:symbol', {
        templateUrl: 'partials/stockData.jade',
        controller: 'StockCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
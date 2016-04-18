var stockrApp = angular.module('stockrApp', ['ngRoute', 'stockrControllers']);

stockrApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stock/:symbol', {
        controller: 'StockCtrl'
      }).
      when('/stock/:symbol/:startdate/:enddate', {
        controller: 'StockCtrl'
      }).
      when('/stock/quote', {
        controller: 'StockCtrl'
      }).
      when('/', {
        controller: 'StockCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

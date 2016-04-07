var stockrApp = angular.module('stockrApp', ['ngRoute', 'stockrControllers']);

stockrApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stock/:symbol', {
        templateUrl: 'partials/stockData.jade',
        controller: 'StockCtrl'
      }).
      when('/stock/:symbol/:startdate/:enddate', {
        templateUrl: 'partials/stockData.jade',
        controller: 'StockCtrl'
      }).
      when('/', {
        templateUrl: 'partials/home.jade',
        controller: 'StockCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
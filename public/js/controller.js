var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.stocks = [
    {"symbol":"aapl"}
  ];
}]);
var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams', 
    function ($scope, $http, $routeParams) {
  
  $scope.symbol = $routeParams.symbol;
  
  if($scope.symbol){
    $http.get('/api/stock/' + $scope.symbol)
        .success(function(data) {
            $scope.stockData = data;
            console.log($scope.symbol);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  }

  console.log($scope.stockData);

}]);
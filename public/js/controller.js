var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams', 
    function ($scope, $http, $routeParams) {
  
  $scope.symbol = $routeParams.symbol;
  $scope.startdate = $routeParams.startdate;
  $scope.enddate = $routeParams.enddate;

  if($scope.startdate && $scope.enddate){
    $http.get('api/stock/' + $scope.symbol + '/' + $scope.startdate + '/' + $scope.enddate)
        .success(function(data){
            $scope.stockData = data;
        })
        .error(function(data){
            console.log('Error:' + data);
        })
  } else if($scope.symbol){
    $http.get('/api/stock/' + $scope.symbol)
        .success(function(data) {
            $scope.stockData = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  }


}]);



var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

  $scope.symbol = $routeParams.symbol;
  $scope.startdate = $routeParams.startdate;
  $scope.enddate = $routeParams.enddate;
  $scope.stockData = [];
  $scope.formData = [];
  $scope.stockChartData = [];


  $scope.getQuote = function(startdate){
    console.log("getQuote triggered");
    var symbol = $scope.formData.symbol;
    var queryDate = new Date($scope.formData.startdate);

    //format date to work with API call
    var queryYear = queryDate.getFullYear();
    var queryMonth = queryDate.getMonth() + 1;
    var queryDay = queryDate.getDate();

    queryYear = queryYear.toString();
    queryMonth = queryMonth.toString();
    queryDay = queryDay.toString();

    if (queryMonth.length < 2){
      var leadingZero = "0";
      queryMonth = leadingZero + queryMonth;
    }

    if (queryDay.length < 2){
      var leadingZero = "0";
      queryDay = leadingZero + queryDay;
    }

    $scope.date = queryYear + queryMonth + queryDay;


    $http({
      method: 'GET',
      url: 'api/stock/' + symbol + '/' + $scope.date
    }).then(function successCallback(response) {
        $scope.stockData = response.data;
        $scope.symbol = response.data[0].symbol;
        response.data.forEach(function(response, index){
          $scope.stockChartData[index] = {"date": response.tradingDay, "lastPrice": response.close};
        });
      }, function errorCallback(response) {
        console.log('Error:' + response);
    });

    console.log("stockChartData in controller",$scope.stockChartData);

  };// end $scope.getQuote()

}]);


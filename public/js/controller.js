var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

  $scope.symbol = $routeParams.symbol;
  $scope.startdate = $routeParams.startdate;
  $scope.enddate = $routeParams.enddate;
  $scope.stockData = [];
  $scope.formData = [];

  // $scope.getStockSymbol = function(){
  //   $http.get('/api/stock/' + $scope.symbol)
  //       .success(function(data) {
  //           $scope.stockData = data;
  //           console.log($scope.stockData);
  //           console.log("if($scope.symbol)");
  //       })
  //       .error(function(data) {
  //           console.log('Error: ' + data);
  //       });
  // }

  // if($scope.symbol){
  //   var symbol = $scope.formData.symbol;
  //   var startdate = new Date($scope.startdate);
  //   var startday = startdate.getDate();
  //   var startmonth = startdate.getMonth() + 1;
  //   var startyear = startdate.getFullYear();
  //   var enddate = new Date(startdate);
  //   enddate.setDate(startday + 5);
  //   var endday = enddate.getDate();
  //   var endmonth = enddate.getMonth() + 1;
  //   var endyear = enddate.getFullYear();

  //   //format dates to work with API call
  //   startdate = startyear + "-" + startmonth + "-" + startday;
  //   var enddate = endyear + "-" + endmonth + "-" + endday;
  //   console.log("start:" + startdate);
  //   console.log("end:" + enddate);

  //   $http.get('api/stock/' + $scope.symbol + '/' + startdate + '/' + enddate)
  //       .success(function(data){
  //           $scope.stockData = data;
  //           console.log("if($scope.formData)");
  //           console.log(data);
  //       })
  //       .error(function(data){
  //           console.log('Error:' + data);
  //       });
  // }

  $scope.getQuote = function(startdate){
    var symbol = $scope.formData.symbol;
    var startdate = new Date($scope.formData.startdate);
    var startday = startdate.getDate();
    var startmonth = startdate.getMonth() + 1;
    var startyear = startdate.getFullYear();
    var enddate = new Date(startdate);
    enddate.setDate(startday + 5);
    var endday = enddate.getDate();
    var endmonth = enddate.getMonth() + 1;
    var endyear = enddate.getFullYear();

    //format dates to work with API call
    startdate = startyear + "-" + startmonth + "-" + startday;
    var enddate = endyear + "-" + endmonth + "-" + endday;

    $http({
      method: 'GET',
      url: 'api/stock/' + symbol + '/' + startdate + '/' + enddate
    }).then(function successCallback(response) {
        $scope.stockData = response.data;
        console.log($scope.stockData);
      }, function errorCallback(response) {
        console.log('Error:' + response);
    });

  };


}]);


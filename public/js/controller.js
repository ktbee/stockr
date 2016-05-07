var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

  $scope.formData = [];
  $scope.stockChartData = [];
  $scope.queryDates = [];
  $scope.symbol;
  $scope.companyName;
  $scope.slides = [];

  $scope.getCompanyName = function(){
    var formSymbol = $scope.formData.symbol;

    $http({
      method: 'GET',
      url: '/api/companyInfo/' + formSymbol
    }).then(function successCallback(response) {
        $scope.symbol = response.data[0].symbol;
        $scope.companyName = response.data[0].name;

      }, function errorCallback(response) {
        console.log('Error:' + response);
    });
  }; // end $scope.getCompanyName


  $scope.getQuote = function(startdate){
    var formSymbol = $scope.formData.symbol;
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

    var startDate = queryYear + '-' + queryMonth + '-' + queryDay;


    $http({
      method: 'GET',
      url: 'api/stock/' + formSymbol + '/' + startDate
    }).then(function successCallback(response) {
        $scope.symbol = response.data[0].symbol;
        for(var i = 0; i < 14; i++){
          $scope.stockChartData[i] = {
            "date": response.data[i].tradingDay,
            "lastPrice": response.data[i].close
          };
          $scope.queryDates[i] = response.data[i].tradingDay;
        }

      }, function errorCallback(response) {
        console.log('Error:' + response);
    });
  };// end $scope.getQuote()

  $scope.getPhotos = function(){
    $scope.slides = [];
    var photoInfo = [];
    var startDate = $scope.queryDates[0];
    var endDate = $scope.queryDates[13];

    $http({
      method: 'GET',
      url: 'api/flickr/' + $scope.formData.searchTerm + '/' + startDate + '/' + endDate
    }).then(function successCallback(response) {
      photoInfo = response.data.photos.photo;

        photoInfo.forEach( function (value, index){
          $scope.slides[index] = {
            url: 'https://farm' + photoInfo[index].farm + '.staticflickr.com/' + photoInfo[index].server + '/' + photoInfo[index].id + '_' +photoInfo[index].secret + '.jpg',
            title: photoInfo[index].title
          };
        });

        console.log("flickr urls", $scope.photoURLs);


      }, function errorCallback(response) {
        console.log('Error:' + response);
    });
  };// end $scope.getPhotos

  // functions for controlling image slider
  $scope.direction = 'left';
  $scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function (index) {
      $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
  };

  $scope.prevSlide = function () {
      $scope.direction = 'left';
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function () {
      $scope.direction = 'right';
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
  };
  // end functions for controlling image slider

}]);


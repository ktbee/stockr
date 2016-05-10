var stockrControllers = angular.module('stockrControllers', []);

stockrControllers.controller('StockCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

  $scope.formData = [];
  $scope.stockChartData = [];
  $scope.queryDates = [];
  $scope.symbol;
  $scope.companyName;
  $scope.slides = [];
  $scope.congressWords = [];

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
    var endDate = $scope.queryDates[$scope.queryDates.length - 1];

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

  $scope.getCongressWords = function () {
    console.log("$scope.queryDates",$scope.queryDates);

    $http({
        method: 'GET',
        url: 'api/sunlight/' + $scope.queryDates[0]
      }).then(function successCallback(response) {
        congressData = response.data;
        console.log("$scope.queryDates[0]",$scope.queryDates[0])
        console.log("congressData",congressData);

        congressData.forEach(function (value, index) {
          $scope.congressWords.push(
          {
            "text": congressData[index].ngram,
            "size": congressData[index].count
          });
        }); // end congressData.forEach

        console.log("$scope.congressWords", $scope.congressWords);

        }, function errorCallback(response) {
          console.log('Error:' + response);
      });

    // I will need to figure out how to search the Sunlight API for certain dates and concatenate the results so words aren't repeated
    // For now I am just doing one date
    // $scope.queryDates.forEach( function (value, index) {
    //  grab data for each day and add it to $scope.congressWords
    // }); // end $scope.queryDates.forEach

  }; // end $scope.getCongressWords

  // $scope.drawCongressWords based on http://bl.ocks.org/ericcoopey/6382449
  $scope.drawCongressWords = function () {
    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    d3.layout.cloud().size([800, 300])
            .words($scope.congressWords)
            .rotate(0)
            .fontSize(function(d) { return (d.size * 2); })
            .on("end", draw)
            .start();

    function draw(words) {
        if(d3.select('#wordcloud-svg') != undefined){
          d3.select('#wordcloud-svg').remove();
        }

        d3.select("#congress-words").append("svg")
                .attr("id","wordcloud-svg")
                .attr("width", 850)
                .attr("height", 350)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(320,200)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return (d.size * 10) + "px"; })
                .style("margin","40px")
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
  }; // end $scope.drawCongressWords

}]);


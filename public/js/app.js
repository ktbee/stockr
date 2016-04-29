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


stockrApp.directive('stockChart', function($window){
  // var chart = d3.custom.lineChart();

  return{
    restrict: 'EA',
    link: function(scope, elem, attrs){
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      var width = 850;
      var height = 300;
      var margin = {top: 20, right: 20, bottom: 20, left: 50};
      var data = scope[attrs.chartData];

      // draw and append the container
      var svg = d3.select('#stockChart').append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
          .attr('transform','translate(' + margin.left + ',' + margin.right + ')');

      var xScale = d3.time.scale()
        .range([0, width - margin.right - margin.left]);

      var yScale = d3.scale.linear()
        .range([height - margin.top - margin.bottom, 0]);

      var valueline = d3.svg.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.lastPrice); });


      scope.drawChart = function(){

         // remove previously existing lines, if any
        svg.selectAll('.y.axis').remove();

        scope.getQuote();

        data = scope.stockChartData;

        console.log("data before parse", data);

        if(data){
          data.forEach(function(d) {
            d.date = parseDate(String(d.date));
          });
        }

        console.log("data after parse", data);

        // create domains for axis
        xScale.domain(d3.extent(data, function(d) { return d.date; }));
        yScale.domain(d3.extent(data, function(d) { return d.lastPrice; }));

        // create axis
        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        // Add the valueline path.
        svg.append("path")
          .attr("class", "line")
          .attr("d", valueline(data))
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5);

        // if no axis exists, create one, otherwise update it
        if (svg.selectAll('.y.axis')[0].length < 1 ){
          svg.append('g')
              .attr('class','y axis')
              .call(yAxis);
        } else {
          svg.selectAll('.y.axis').transition().duration(1500).call(yAxis);
        }

        if (svg.selectAll('.x.axis')[0].length < 1 ){
          svg.append('g')
              .attr('class','x axis')
              .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom) + ')')
              .call(xAxis);
        } else {
          svg.selectAll('.x.axis').transition().duration(1500).call(xAxis);
        }

         // generate line paths
        var lines = svg.selectAll(".line").data(data).attr("class","line");

        console.log("data", data);

      }// end drawChart();

      // scope.$watchCollection('data | json', function (newVal, oldVal) {
      //   // svg.datum(newVal).call(chart);
      //   console.log("watch triggered for data");
      //   // drawChart();
      // }, true);

    }// end link function
  };
})

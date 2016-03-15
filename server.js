var express  = require('express');
var app      = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
var request = require('request');
var oauth = require('oauth');
var tradeKingConfig = require(path.join(__dirname, '.', 'config'));
var tradeking_consumer = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  tradeKingConfig.consumer_key,
  tradeKingConfig.consumer_secret,
  "1.0",
  null,
  "HMAC-SHA1");

// configuration ===========================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ==================================

app.get("/api/stock/:symbol", function(req,res){
    var url = tradeKingConfig.api_url+'market/ext/quotes.json?symbols=' + req.params.symbol;

    tradeking_consumer.get(url, tradeKingConfig.access_token, tradeKingConfig.access_secret,
      function(error, data, response) {
        // Parse the JSON data
        stock_data = JSON.parse(data);
        // Display the response
        console.log(stock_data.response); 
      } 
    );
});


app.listen(8080);
console.log("App listening on port 8080");
var express = require('express');
var router = express.Router();
var path = require('path');
var app = require(path.join(__dirname, '../', 'app'));
var request = require('request');
var oauth = require('oauth');
var tradeKingConfig = require(path.join(__dirname, '../', 'config'));
var tradeking_consumer = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  tradeKingConfig.consumer_key,
  tradeKingConfig.consumer_secret,
  "1.0",
  null,
  "HMAC-SHA1");

// routes ==================================

router.get("/api/stock/:symbol", function(req,res){
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





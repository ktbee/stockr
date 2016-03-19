var express = require('express');
var router = express.Router();
var path = require('path');
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
    var results = [];

    tradeking_consumer.get(url, tradeKingConfig.access_token, tradeKingConfig.access_secret,
      function(error, data, response) {
        stock_data = JSON.parse(data);
        console.log(stock_data.response); 
        res.send(stock_data.response);
      } 
    );
});





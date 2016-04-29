var express = require('express');
var router = express.Router();
var path = require('path');
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

router.get('/api/stock/:symbol/:date', function(req,res){
    // var url = tradeKingConfig.api_url + '/options/search.json?symbol=' + req.params.symbol + '&query=xdate-eq%3A' + req.params.date;
    var results = [];
    var apiKey = '15a25e9a3dcdb96937ca7c8c568c5438';
    var url = 'http://marketdata.websol.barchart.com/getHistory.json?key=' + apiKey + '&symbol=' + req.params.symbol + '&type=daily&startDate=' + req.params.date + '000000';

    request.get(url, function(error, response, data) {
        if(error){
          console.log("Error: " + error);
        }

        results = JSON.parse(data);
        res.send(results.results);
      }
    );
});

module.exports = router;




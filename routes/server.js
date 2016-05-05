var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var https = require('https');
var OAuth2 = require('oauth').OAuth2;
var config = require('../config.js');
var stockAPIKey = config.stockAPIKey;
var flickrAPIKey = config.flickrAPIKey;
var twitterToken = null;
var twitterOauth2 = new OAuth2(config.twitter.consumerKey, config.twitter.consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);

twitterOauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
  }, function (e, access_token) {
        twitterToken = access_token;
});


// routes ==================================

router.get('/api/stock/:symbol/:date', function(req,res){
    var results = [];
    var url = 'http://marketdata.websol.barchart.com/getHistory.json?key=' + stockAPIKey + '&symbol=' + req.params.symbol + '&type=daily&startDate=' + req.params.date + '000000';

    request.get(url, function(error, response, data) {
        if(error){
          console.log("Error: " + error);
        }

        results = JSON.parse(data);
        res.send(results.results);
    });
});

router.get('/api/companyInfo/:symbol/', function(req,res){
    var results = [];
    var url = 'http://marketdata.websol.barchart.com/getQuote.json?key=' + stockAPIKey + '&symbols=' + req.params.symbol;

    console.log(url);

    request.get(url, function(error, response, data) {
        if(error){
          console.log("Error: " + error);
        }

        results = JSON.parse(data);
        res.send(results.results);
    });
});

router.get('/api/flickr/:searchText/:startDate/:endDate', function(req,res){
    var results = [];
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrAPIKey + '&text=' + req.params.searchText + '&min_taken_date=' + req.params.startDate + '&max_taken_date=' + req.params.endDate + '&format=json&nojsoncallback=1';

    request.get(url, function(error, response, data) {
        if(error){
          console.log("Error: " + error);
        }

        results = JSON.parse(data);
        res.send(results);
    });
});

router.get('/api/twitter/test', function(req,res){
    var results = [];
    var url = 'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi';

    request.get({
        url: url,
        auth: {
            'bearer': twitterToken
        }
    }, function(error, response, data){
        if(error){
          console.log("Error: " + error);
        }

        results = JSON.parse(data);
        res.send(results);
    });
});


module.exports = router;




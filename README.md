#Stockr
##An app for exploring correlations

This app allows you compare information from several different sources with stock market trends. Using multiple APIs and D3.js to visualize information from these APIs, users can explore whether there is a correlation between a NYSE stock's change in value and other parameters they pick, like the weather in New York or what was said in [Congress](http://sunlightlabs.github.io/Capitol-Words/) that day. 

Stockr is a work in progress, but check back soon for more functionality and suggestions on how to use it. 

###A quick note on config.js
This configuration file is in my gitignore file since it contains my TradeKing authentication information. If you want to run this locally, you can create your own config.js file with your TradeKing account's API information. My config.js file is formatted like the example below. Just replace the empty quotes with your information:

```
var tradeKingConfig = {
    api_url: "https://api.tradeking.com/v1/",
    consumer_key: " ",
    consumer_secret: " ",
    access_token: " ",
    access_secret: " "
}


module.exports = tradeKingConfig;
```
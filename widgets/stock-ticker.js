require('dotenv').config();
var express = require("express");
var AVKEY = process.env.alphaVantageAPIKey;

var axios = require("axios");

var stockTicker = {
    get: function(){
        var companies = [
            "INX",
            "MSFT",
            "AAPL",
            "AMZN",
            "GOOG",
            "BABA",
            "FB",
            "JNJ",
            "JPM",
            "XOM",
            "WMT",
            "BAC",
            "PG",
            "INTC",
            "VZ",
            "PFE",
            "CSCO",
            "T",
            "BA",
            "HD",
            "KO",
            "ORCL",
            "DIS",
            "NFLX",
            "C",
            "MCD",
            "IBM",
            "GE",
            "TSLA",
            "F",
            "AMD"
        ];
    
        var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=${AVKEY}`;
        axios.get(url)
        .then( resp => {
            var seriesData = resp.data["Time Series (5min)"];
            var metaData = resp.data["Meta Data"];
        })
        .catch( err => {
            console.log(err);
        });
    
    
    },
    run: function(){

    },
};

module.exports = stockTicker;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");


var marketwatch = {
    scrape: function (next) {
        axios.get("https://www.marketwatch.com/")
            .then(function (resp) {
                var $ = cheerio.load(resp.data);
                var newArticles = [];
                
                $(".element--article").each(function (i, element) {
                    
                    $(element).each(function(i, element){
                        var articleElem = $(element).html();
                        var article = {};
                        var title = $(element).find(".article__headline").text();
                        var summary = $(element).find(".article__summary").text();
                        var link = $(element).find(".figure__image").attr("href");
                        
                        article.title = title.replace("\n", "").trim();
                        article.summary = summary;
                        article.link = link;
                        
                        if( title === "" || summary === "" || link === "" || link === undefined ) {
                            //do nothing
                        }
                        else {
                            
                            newArticles.push(article);
                            
                        }

                    });
 
                    
                });
                //console.log(newArticles);
               
                next(newArticles);
                //return newArticles;

            })
            .catch(function (err) {
                if(err) throw err;
            });
    }
}

module.exports = marketwatch;

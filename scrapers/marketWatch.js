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

                        var article = {};
                        var title = $(element).find(".article__headline").text();
                        var summary = $(element).find(".article__summary").text();
                        var link = $(element).find(".figure__image").attr("href");
                        
                        article.link = link;
                        article.title = title.replace("\n", "").trim();
                        article.summary = summary;
                        article.category = "finance";
                        
                        if( title !== "" || summary !== "" || link !== "" || link !== undefined ) {
                            newArticles.push(article);
                        }

                    });
 
                });
               
                next(newArticles);

            })
            .catch(function (err) {
                if(err) throw err;
            });
    }
}

module.exports = marketwatch;

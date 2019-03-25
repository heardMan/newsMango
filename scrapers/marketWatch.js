var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var marketwatch = {
    scrape: function (next) {
        axios.get("https://www.marketwatch.com/")
            .then(function (resp) {
                var $ = cheerio.load(resp.data);
                var newArticles = [];
                var links = [];
                $(".element--article").each(function (i, element) {
                    
                    $(element).each(function(i, element){

                        var article = {};
                        var artElem = $(element).html();
                        var title = $(element).find(".article__headline").text();
                        var summary = $(element).find(".article__summary").text();
                        var link = $(element).find(".figure__image").attr("href");
                        var imgLinkSet = $(element).find("img").attr("data-srcset");
                        var imgStr = JSON.stringify(imgLinkSet);

                        
                        article.link = link;
                        var alreadyAdded = links.indexOf(article.link);
                        //console.log(alreadyAdded);
                        article.title = title.replace("\n", "").trim();
                        article.summary = summary;
                        article.category = "finance";
                        
                        
                        if( article.title === "" || 
                            article.summary === "" || 
                            article.link === "" || 
                            article.link === undefined || 
                            article.link === null ||
                            alreadyAdded > -1 ||
                            imgStr === undefined
                        ) {
                            //do nothing
                        } else {
                            var imageLinkArr = imgStr.split(",");
                            var imgArrLen = imageLinkArr.length-1;
                            var imgLink = imageLinkArr[imgArrLen].split(" ")[0];
                            article.imgLink = imgLink;

                            newArticles.push(article);
                            //console.log(link)
                        }

                    });
 
                });
                //console.log(newArticles);
                next(newArticles);

            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
//marketwatch.scrape();
module.exports = marketwatch;

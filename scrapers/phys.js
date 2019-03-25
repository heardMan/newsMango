const axios = require("axios");
const cheerio = require("cheerio");

const phys = {
    scrape: function(next) {
        axios.get("https://phys.org/")
        .then(resp => {
            const $ = cheerio.load(resp.data);
            const articles = [];
            var links = [];
            $("article").each( (i, element) => {
                const article = {};
                
                var articleElem = $(element).html();
                article.link = $(element).find("a").attr("href");
                
                var alreadyAdded = links.indexOf(article.link);
                article.title = $(element).find("a").text();
                article.summary = $(element).find("p").text();
                article.category = "science";
                var imgLinkSeed = $(element).find("img").attr("data-source");
                var imgStr = imgLinkSeed;
                
                if(
                    article.title === "" || 
                    article.summary === "" || 
                    article.link === "" || 
                    article.link === undefined || 
                    article.link === null ||
                    alreadyAdded > -1 ||
                    imgLinkSeed === undefined
                ){
                    //do nothing    
                } else {
                    var imgStrArr = imgStr.split("/");
                    var tmb = imgStrArr.indexOf("tmb");
                    var px120 = imgStrArr.indexOf("120");
                    if(-1 < tmb){
                        imgStrArr[tmb] = "800"
                        article.imgLink = imgStrArr.join("/");
                        //console.log(article.imgLink);
                    } else {
                        
                        imgStrArr[px120] = "800"
                        article.imgLink = imgStrArr.join("/");
                        //console.log(article.imgLink);
                    }

                    console.log(article);

                    articles.push(article);
                    links.push(article.link);
                }

            });
            next(articles);

        })
        .catch( err => {
            console.log(err);
        })
    },
};
//phys.scrape();
module.exports = phys;
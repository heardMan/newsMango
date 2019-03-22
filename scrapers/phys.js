const axios = require("axios");
const cheerio = require("cheerio");

const phys = {
    scrape: function(next) {
        axios.get("https://phys.org/")
        .then(resp => {
            const $ = cheerio.load(resp.data);
            const articles = [];
            $("article").each( (i, element) => {
                const article = {};
                article.link = $(element).find("a").attr("href");
                article.title = $(element).find("a").text();
                article.summary = $(element).find("p").text();
                article.category = "science";

                if(article.summary !== "" || article.summary !== undefined || article.summary !== null){
                    articles.push(article);
                }

            });
            next(articles);

        })
        .catch( err => {
            console.log(err);
        })
    },
};

module.exports = phys;
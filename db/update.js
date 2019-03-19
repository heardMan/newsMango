var marketwatch = require("../scrapers/marketWatch");
var db = require("../models");
var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});

var update = {
    marketwatch: function(){
        marketwatch.scrape(function(data){
            //console.log(data);
            data.forEach( elem => {
                console.log("TITLE"+elem.title);
                db.Article.find({
                    title: elem.title
                })
                .then(function(resp){
                    console.log(resp);
                    if(resp.length === 0){
                        db.Article.create(elem)
                        .then(function(resp) {
                            console.log(resp);
                        })
                        .catch(function(err) {
                            if(err) throw err;
                        })
                    }
                    
                })
                .catch(function(err){
                    console.log(err);
                })
            })
            
        });
    },
}

module.exports = update;



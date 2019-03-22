const db = require("../models");
const mongoose = require("mongoose");
const marketwatch = require("../scrapers/marketWatch");
const phys = require("../scrapers/phys");

//mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});

var update = {
    marketwatch: function () {
        marketwatch.scrape((data) => {
            
            data.forEach(elem => {
                
                db.Article.find({
                    title: elem.title
                })
                .then(function (resp) {
                    
                    if (resp.length === 0) {
                        db.Article.create(elem)
                        .then(function (resp) {
                            console.log(`Successfully Added: \n${resp}`);
                        })
                        .catch(function (err) {
                            if (err) throw err;
                        })
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            });

        });
    },
    phys: function () {
        phys.scrape(data => {
            data.forEach(elem => {
                
                db.Article.find({
                    title: elem.title
                })
                .then(function (resp) {
                    
                    if (resp.length === 0) {
                        db.Article.create(elem)
                        .then(function (resp) {
                            console.log(`Successfully Added: \n${resp}`);
                        })
                        .catch(function (err) {
                            if (err) throw err;
                        })
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });
            });
        })
    },
    

}

module.exports = update;

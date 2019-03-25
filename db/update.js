const db = require("../models");
const mongoose = require("mongoose");
const marketwatch = require("../scrapers/marketWatch");
const phys = require("../scrapers/phys");

//mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});
//var DBURL = "mongodb://heroku_dcwpphsv:ecq319ma1nim85rqbn5admqsr6@ds155815.mlab.com:55815/heroku_dcwpphsv";
//mongoose.connect(DBURL, { useNewUrlParser: true});

var update = {
    marketwatch: function () {
        marketwatch.scrape(data => {
            //console.log(data);
            data.forEach(elem => {
                
                db.Article.find({
                    link: elem.link
                })
                .then(function (resp) {
                   console.log(resp);
                    if (resp === [] || resp.length === 0) {
                        db.Article.create(elem)
                        .then(function (resp) {
                            console.log(`Successfully Added: \n${resp}`);
                        })
                        .catch(function (err) {
                           console.log(err);
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
            //console.log(data);
            data.forEach(elem => {
                
                db.Article.find({
                    link: elem.link
                })
                .then(function (resp) {
                    console.log("RESP:  "+resp);
                    if (resp.length === 0 || resp === "") {
                        
                        db.Article.create(elem)
                        .then(function (resp) {
                            console.log(`Successfully Added: \n${resp}`);
                        })
                        .catch(function (err) {
                            console.log(err);
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

update.phys();
update.marketwatch();

module.exports = update;

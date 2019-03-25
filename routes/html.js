var express = require("express");
var router = express.Router();
var db = require("../models");
var axios = require("axios");

router.get("/", function(req, res) {
    var articles = {
        top: [],
        financeTop: [],
        finance: [],
        scienceTop: [],
        science: []
    };
    db.Article.find()
    .then( resp => {
        let j = 0;
        let h = 0;
        resp.forEach( article => {
            
            if(article.category === "finance"){
                if (h < 3){
                    articles.top.push(article);
                    h++;
                } else if(h<13){
                    articles.financeTop.push(article);
                    h++;
                } else {
                    articles.finance.push(article);
                }
            } else if (article.category === "science") {
                if (j < 3){
                    articles.top.push(article);
                    j++;
                } else if (j<13){
                    articles.scienceTop.push(article);
                    j++;
                } else {
                    articles.science.push(article);
                } 
            }
        });
        console.log(articles.top.length);
        res.render("index", articles);
    })
    .catch( err => {
        console.log(err);
    });
    
    
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

module.exports = router;

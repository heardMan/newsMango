var express = require("express");
var router = express.Router();
var db = require("../models");


//user routes
//create
    //users are created in the auth routes
//read
router.get("/api/users/:id", function(req, res) {
    var articleId = req.params.id;
    var query;

    if(articleId === "all"){
        query = {};
    } else {
        query = articleId;
    }
    
    db.Users.find(query)
    .then(function(resp) {
        //console.log(resp);
        res.json(resp);
    })
    .catch(function(err) {
        console.log(err);
    })
});
//update

//delete


//article routes
//create
    //articles are created in scaper files
//read
router.get("/api/articles/:id", function(req, res) {
    var articleId = req.params.id;
    var query;

    if(articleId === "all"){
        query = {};
    } else {
        query = articleId;
    }
    
    db.Article.find(query)
    .then(function(resp) {
        //console.log(resp);
        res.json(resp);
    })
    .catch(function(err) {
        console.log(err);
    })
});
//update

//delete


//note routes
//create

//read
router.get("/api/notes/:id", function(req, res) {
    var articleId = req.params.id;
    var query;

    if(articleId === "all"){
        query = {};
    } else {
        query = articleId;
    }
    
    db.Notes.find(query)
    .then(function(resp) {
        //console.log(resp);
        res.json(resp);
    })
    .catch(function(err) {
        console.log(err);
    })
});
//update

//delete



module.exports = router;

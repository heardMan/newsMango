var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("./models")
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});

app.listen(PORT, function(){
    console.log(`App now listening on Port#: ${PORT}`)
})
var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("./models");
var htmlRoutes = require("./routes/html");
var authRoutes = require("./routes/auth");
var apiRoutes = require("./routes/api");
var errorRoutes  = require("./routes/error");
var updateArticles  = require("./db/update")

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});

app.use(htmlRoutes);
app.use(authRoutes);
app.use(apiRoutes);
app.use(errorRoutes);

updateArticles.marketwatch();

app.listen(PORT, function(){
    console.log(`App now listening on Port#: ${PORT}`);
    
});



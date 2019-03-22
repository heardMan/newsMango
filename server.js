require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const db = require("./models");
const htmlRoutes = require("./routes/html");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const errorRoutes  = require("./routes/error");
const updateArticles  = require("./db/update")

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsmango";
mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/newsmango", { useNewUrlParser: true});

app.use(htmlRoutes);
app.use(authRoutes);
app.use(apiRoutes);
app.use(errorRoutes);

updateArticles.marketwatch();
updateArticles.phys();

app.listen(PORT, function(){
    console.log(`App now listening on Port#: ${PORT}`);
    
});



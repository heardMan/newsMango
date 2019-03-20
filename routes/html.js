var express = require("express");
var router = express.Router();
var db = require("../models");
var axios = require("axios");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

module.exports = router;

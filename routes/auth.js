//require dependencies
require("dotenv").config();
const models = require("../models");
const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const helpers = require("./helpers/auth");
const routeHelpers = require("./helpers/error");

router.post("/login", (req, res) => {
    //parse response into user object
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    //find user info based on provided email
    models.User.findOne({ email: user.email })
        .then((resp) => {
            console.log(resp);
            //parse response
            const currentUser = resp._id;
            console.log(currentUser);
            //check if user password is valid
            if (helpers.checkIfValidPass(resp, user.password)) {
                //set token expiration date
                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                //create token
                const token = jwt.sign(
                    {
                        exp: parseInt(expiry.getTime() / 1000),
                        userID: resp._id,
                        email: resp.email,
                        scaryStuff: "OOGA BOOOGA"
                    },
                    process.env.JWT_SECRET
                );
                //send authorization and user info cookies
                res
                    .cookie("token", token)
                    .status(200)
                    .send("cookie set");
            } else {
                //send error message of incorrect password
                routeHelpers.sendJsonError(res, new Error("WRONG PASSWORD"), 401);
            }
        })
        .catch((err) => {
            //send any error messages to the client
            routeHelpers.sendJsonError(res, err);
        });
});

// register a new user
router.post("/register", (req, res) => {
    //parse request
    let user = {
        email: req.body.email,
        password: req.body.password
    };
    //get salt
    const salt = helpers.getSalt();
    //generate user instance
    const userInstance = {
        email: user.email,
        salt: salt,
        hash: helpers.getHash(salt, user.password),
    };
    //create user in database
    models.User.create(userInstance)
        .then(function (resp) {
            //send success message
            res.json({ message: "Creation Sucess!", id: resp.id });
        })
        .catch(function (err) {
            //send error message
            routeHelpers.sendJsonError(res, err);
        });
});

module.exports = router;

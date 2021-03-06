//require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authenticationHelpers = {

    getSalt: function () {
        return crypto.randomBytes(16).toString("hex");
    },
    getHash: function (salt, password) {
        return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    },
    checkIfValidPass: function (user, password) {
        const unvalidatedHash = authenticationHelpers.getHash(user.salt, password);
        return unvalidatedHash === user.hash;
    },
    verifyToken: function (req, res, next) {
        //get cookie with user token
        const token = req.cookies.token;
        //check if token exists
        if (!token) {
            //send message stating no token received
            return res.status(403).send({ auth: false, message: "No token provided." });
        }
        //find user from id stored in the cookie
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token."
                });
            }
            // if everything good, save to request for use in other routes
            req.userId = decoded.userID;
            next();
        });

    }
}

module.exports = authenticationHelpers;
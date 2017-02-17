var jwt = require('jwt-simple');
var userManager = require("../database/userManager");
var auth = {

    login: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        userManager.getOne(req.db, username, password, function (err, doc) {
            var dbUserObj = doc;
            if (err || !doc) {
                dbUserObj = null
            }

            if (!dbUserObj) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
            } else {
                if (dbUserObj.token) {
                    console.log("token exists");
                    var loginModel = {};
                    var decodedToken = decodeToken(dbUserObj.token);
                    console.log(decodedToken);
                    if (decodedToken && !isTokenExpired(decodedToken)) {
                        console.log("token exists and not expired");
                        loginModel.token = dbUserObj.token;
                        loginModel.expires = decodedToken.expires;
                        loginModel.user = dbUserObj;

                        res.status(200);
                        res.json(loginModel);
                    } else {
                        console.log("token expired or coudn not decode");
                        generateTokenAndRespond(req, res, dbUserObj);
                    }

                } else {
                        console.log("token expired sau not exists 222");
                    generateTokenAndRespond(req, res, dbUserObj);
                }
            }

        });
    }
};

function generateTokenAndRespond(req, res, dbUserObj) {
    var loginResponseModel = genToken(dbUserObj);
    userManager.updateToken(req.db, loginResponseModel.user.username, loginResponseModel.token, function () {
    });
    res.status(200);
    res.json(loginResponseModel);
}

function genToken(user) {
    var expires = expiresIn(365); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

function decodeToken(token) {
    try {
        return jwt.decode(token, require('../config/secret.js')());
    } catch (err) {
        return null;
    }

}

function isTokenExpired(token) {
    return token.exp <= Date.now();
}

module.exports = auth;
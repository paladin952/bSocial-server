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
                res.status(200);
                var loginModel = genToken(dbUserObj);
                userManager.updateToken(req.db, loginModel.user.username, loginModel.token, function () {
                });
                res.json(loginModel);
            }

        });
    }
};

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

module.exports = auth;
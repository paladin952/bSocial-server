var jwt = require('jwt-simple');
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

        var collection = req.db.get('users');
        collection.findOne({username: username, password: password}, function (err, doc) {
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
                res.json(genToken(dbUserObj));
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
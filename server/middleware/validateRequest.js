var jwt = require('jwt-simple');
var userManager = require('../database/userManager');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (req.url.indexOf('/api/v1/login') >= 0 || req.url.indexOf('/api/v1/user') >= 0) {
        next();
    } else {
        if (token) {
            try {
                try {
                    var decoded = jwt.decode(token, require('../config/secret.js')());
                } catch (err) {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid Token"
                    });
                    return;
                }

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                userManager.getUser(req.db, token, function (err, res) {
                    if (err || !res) {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid Token"
                        });
                    } else {
                        if (req.url.indexOf('/api/v1/') >= 0) {
                            req.username = res.username;
                            req.userId = res._id;
                            next(); // To move to next middleware
                        } else {
                            res.status(403);
                            res.json({
                                "status": 403,
                                "message": "Not Authorized"
                            });
                        }
                    }
                });

            } catch (err) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": "Oops something went wrong",
                    "error": err
                });
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token"
            });
            return;
        }
    }
};
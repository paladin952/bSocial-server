var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (req.url.indexOf('/api/v1/login') >= 0) {
        next();
    } else {
        if (token) {
            try {
                var decoded = jwt.decode(token, require('../config/secret.js')());

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                // Authorize the user to see if s/he can access our resources

                var dbUser = validateUser(key); // The key would be the logged in user's username
                if (dbUser) {
                    if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                        next();
                    } else {
                        res.status(403);
                        res.json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
                        return;
                    }
                } else {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid User"
                    });
                    return;
                }

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
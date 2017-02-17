var conversationsManager = require("../database/conversationsManager");

var conversations = {
    getAll: function (req, res) {
        var db = req.db;
        conversationsManager.getAll(db, function (err, result) {
            if (err || !res) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
            } else {
                res.status(200);
                res.json(result);
            }
        });
    }
};
module.exports = conversations;
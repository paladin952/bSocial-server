var conversationsManager = require("../database/conversationsManager");
var userManager = require("../database/userManager");

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
    },

    getOne: function (req, res) {
        var conversationId = req.params.id;

        if (conversationId == '') {
            res.status(401);
            console.log("aaa");
            res.json({
                "status": 401,
                "message": "Invalid parameters"
            });
            return;
        }

        var db = req.db;
        conversationsManager.getOne(db, conversationId, function (err, result) {
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
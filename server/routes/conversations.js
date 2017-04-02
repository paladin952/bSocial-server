var conversationsManager = require("../database/conversationsManager");
var userManager = require("../database/userManager");

var conversations = {
    getAll: function (req, res) {
        var db = req.db;
        conversationsManager.getAll(db, function (err, result) {
            if (err || !result) {
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
            if (err || !result) {
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

    comment: function (req, res) {
        var conversationId = req.body.conversationId;
        var message = req.body.message;
        var timestamp = req.body.timestamp;
        var userId = req.userId;

        console.log(req.body);
        if (!conversationId || conversationId == '' || !message || message == '' || !timestamp || timestamp == ''
            || !userId || userId == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid parameters"
            });
            return;
        }

        conversationsManager.comment(req.db, conversationId, message, timestamp, userId, function (err, result) {
            if (err || !result) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Something went wrong"
                });
            } else {
                res.status(200);
                res.json("SUCCESS");
            }
        });
    },

    getAllForThisUser: function (req, res) {
        var userId = req.userId;
        if (!userId || userId == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Something went wrong"
            });
            return;
        }

        console.log("Get conversations for userId = " + userId);
        conversationsManager.getAllForThisUser(req.db, userId, function (err, result) {
            if (err || !result) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Something went wrong"
                });
            } else {
                res.status(200);
                res.json(result);
            }
        });
    }
};
module.exports = conversations;
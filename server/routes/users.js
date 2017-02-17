var userManager = require("../database/userManager");

var users = {

    getAll: function (req, res) {
        console.log("username");
        console.log(req.username);
        userManager.getAll(req.db, function (e, docs) {
            res.json(docs);
        });
    },

    create: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var phone = req.body.phone;

        if (username == '' || password == '' || phone == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid parameters"
            });
            return;
        }

        var db = req.db;
        userManager.create(db, username, password, phone, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
                res.json({
                    "status": 403,
                    "message": "Not Authorized"
                });
            }
            else {
                res.status(200);
                res.json({
                    "status": 200,
                    "message": "Success"
                });
            }
        });
    },

    update: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var phone = req.body.phone;
        if (username == '' || password == '' || phone == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid parameters"
            });
            return;
        }

        var db = req.db;
        userManager.update(db, req.body._id, username, password, phone, function (err, result) {
            res.status(200);
            if (err) {
                res.status(404);
                res.json({
                    "status": 404,
                    "message": "Not found"
                });
            } else {
                if (result.n == 1) {
                    res.status(200);
                    res.json({
                        "status": 200,
                        "message": "Success"
                    });
                } else {
                    res.status(404);
                    res.json({
                        "status": 404,
                        "message": "Not found"
                    });
                }
            }
        });
    }
};
module.exports = users;
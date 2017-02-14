var users = {

    getAll: function (req, res) {
        var collection = req.db.get('users');
        collection.find({}, {}, function (e, docs) {
            res.json(docs);
        });
    },

    getOne: function (db, username, password, callback) {
        var collection = db.get('users');
        collection.findOne({username: username, password: password}, function (err, doc) {
            if (err || !doc) {
                callback(null);
            } else {
                callback(doc);
            }
        });
    },

    create: function (req, res) {
        var db = req.db;
        var userName = req.body.username;
        var password = req.body.password;

        // Set our collection
        var collection = db.get('users');

        // Submit to the DB
        collection.insert({
            "username": userName,
            "password": password
        }, function (err, doc) {
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
        var collection = req.db.get('users');
        collection.update({
            '_id': req.body._id
        }, {
            $set: {
                password: req.body.password,
                username: req.body.username
            }
        }, {
            w: 1
        }, function (err, result) {
            console.log(result);
            console.log(err);
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
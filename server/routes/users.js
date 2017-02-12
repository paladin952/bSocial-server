var users = {

    getAll: function (req, res) {
        var collection = req.db.get('users');
        collection.find({}, {}, function (e, docs) {
            res.json(docs);
        });
    },

    getOne: function (db, username, password, callback) {
            console.log("hereeee1");
        var collection = db.get('users');
        collection.findOne({username: username, password: password}, function (err, doc) {
            console.log("hereeee2");
            console.log(doc);
            console.log(err);
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
        var updateuser = req.body;
        var id = req.params.id;
        data[id] = updateuser; // Spoof a DB call
        res.json(updateuser);
    }
};
module.exports = users;
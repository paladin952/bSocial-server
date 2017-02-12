var users = {

    getAll: function (req, res) {
        var collection = req.db.get('users');
        collection.find({}, {}, function (e, docs) {
            res.json(docs);
        });
    },

    getOne: function (req, res) {
        var id = req.params.id;
        var user = data[0]; // Spoof a DB call
        res.json(user);
    },

    create: function (req, res) {
        var db = req.db;
        var userName = req.body.username;
        var password = req.body.password;

        // Set our collection
        var collection = db.get('users');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "password" : password
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
    },

    delete: function (req, res) {
        console.log(req.body);
        req.db.get('users').remove(req.body, function (err, result) {
            console.log(err);
            if (result === 1) {
                res.status(200);
                res.json({
                    "status": 200,
                    "message": "Success"
                });
            } else {
                res.status(302);
                res.json({
                    "status": 302,
                    "message": "Not found"
                });

            }
        });
    }
};
module.exports = users;
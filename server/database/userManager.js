var userManager = {
    getAll: function (db, callback) {
        db.get('users').find({}, {}, callback);
    },

    getOne: function (db, username, password, callback) {
        db.get('users').findOne({username: username, password: password}, callback);
    },

    create: function (db, username, password, callback) {
        db.get('users').insert({
            "username": username,
            "password": password
        }, callback);
    },

    update: function (db, id, username, password, callback) {
        db.get('users').update({
            '_id': id
        }, {
            $set: {
                password: password,
                username: username
            }
        }, {
            w: 1
        }, callback);
    }

};

module.exports = userManager;
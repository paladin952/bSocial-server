var userManager = {
    getAll: function (db, callback) {
        db.get('users').find({}, {}, callback);
    },

    getOne: function (db, username, password, callback) {
        db.get('users').findOne({username: username, password: password}, callback);
    },

    create: function (db, username, password, phone, callback) {
        db.get('users').insert({
            "username": username,
            "password": password,
            "phone": phone
        }, callback);
    },

    update: function (db, id, username, password, phone, callback) {
        db.get('users').update({
            '_id': id
        }, {
            $set: {
                password: password,
                username: username,
                phone: phone
            }
        }, {
            w: 1
        }, callback);
    },

    getUser: function (db, token, callback) {
        db.get('users').findOne({token: token}, callback);
    },

    updateToken: function (db, username, token, callback) {
        db.get('users').update({
            'username': username
        }, {
            $set: {
                token: token
            }
        }, {
            w: 1
        }, callback);
    }
};

module.exports = userManager;
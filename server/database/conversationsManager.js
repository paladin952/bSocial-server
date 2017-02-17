var conversationsManager = {

    getAll: function (db, callback) {
        db.get('conversations').find({}, {}, callback);
    }
};
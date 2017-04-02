var conversationsManager = {

    getAll: function (db, callback) {
        db.get('conversations').find({}, {}, callback);
    },

    getOne: function (db, id, callback) {
        db.get('conversations').findOne({_id: id}, callback);
    },
};

module.exports = conversationsManager;
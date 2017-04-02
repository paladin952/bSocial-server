var conversationsManager = {

    getAll: function (db, callback) {
        db.get('conversations').find({}, {}, callback);
    },

    getAllForThisUser: function (db, userId, callback) {
        db.get('conversations').find(
            {
                people: userId
            },
            {},
            callback
        );
    },

    getOne: function (db, id, callback) {
        db.get('conversations').findOne({_id: id}, callback);
    },

    comment: function (db, conversationId, message, timestamp, userId, callback) {
        db.get('conversations').update(
            {
                _id: conversationId
            },
            {
                $push: {
                    messages: {
                        message: message,
                        timestamp: timestamp,
                        userId: userId
                    }
                }
            },
            {
                w: 1
            },
            callback);
    }
};

module.exports = conversationsManager;
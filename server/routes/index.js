var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');
var conversation = require('./conversations.js');

/**
 * Routes for login
 */
router.post('/api/v1/login', auth.login);

/**
 * Router for user related data
 */
router.get('/api/v1/users', user.getAll);
router.post('/api/v1/user', user.create);
router.put('/api/v1/user', user.update);

/**
 * Routes for conversations data
 */
router.get("/api/v1/conversations", conversation.getAll);

module.exports = router;
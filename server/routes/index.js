var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/api/v1/login', auth.login);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/users', user.getAll);
router.post('/api/v1/user/', user.create);
router.put('/api/v1/user/:id', user.update);

module.exports = router;
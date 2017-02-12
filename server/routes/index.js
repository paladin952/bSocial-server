var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/api/v1/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/users', user.getAll);
router.get('/api/v1/user/:id', user.getOne);
router.post('/api/v1/user/', user.create);
router.put('/api/v1/user/:id', user.update);
router.delete('/api/v1/user', user.delete);

module.exports = router;
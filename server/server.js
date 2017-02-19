var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//DATABASE
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/db');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');

    next();

});

app.all('/api/v1/*', [require('./middleware/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + server.address().port);
});
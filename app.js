const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function (req, res, next) {
    const err = new Error('The page you tried to access does not exist: ' + req.url);
    err.status = 404;

    next(err);
});

app.use(function (error, req, res, next) {
    console.error(error.stack);

    const statusCode = error.status || 500;
    res.status(statusCode).render('error.ejs', {
        errorMessage: error.message,
        errorCode: statusCode
    });
});

module.exports = app;
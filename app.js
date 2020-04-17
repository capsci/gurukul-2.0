"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var googlesheetsRouter = require('./routes/googlesheets/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/googlesheets', googlesheetsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var Secret = require('./secret/Constants');

// var MongoDBO = require('./gurukul/3pinterface/MongoDBO');
// var mdb = new MongoDBO(Secret.Mongo.url, 'gurukul');
// mdb.readAll('Applicant').then((data) => {
//     console.log(data);
// });

// var GoogleSheets = require('./gurukul/3pinterface/GoogleSheets');
// GoogleSheets.read(Secret.Spreadsheet.ID, "Responses", (err, data) => {
//     console.log(err);
//     console.log(data)
// });

// var Address = require("./model/Address");
// var a = new Address();
// console.log(a.saveToDB());
// a.saveToDB();

module.exports = app;

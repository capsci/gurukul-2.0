"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var googlesheetsRouter = require('./routes/googlesheets/index');
var mongodbRouter = require('./routes/mongodb/index');
var applicantRouter = require('./routes/model/applicant');
var applicationRouter = require('./routes/model/application');
var applicationMaterialRouter = require('./routes/model/applicationMaterial');
var referrerRouter = require('./routes/model/referrer');
var schoolRouter = require('./routes/model/school');

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Data
app.use('/googlesheets', googlesheetsRouter);

// Models
app.use('/applicant', applicantRouter);
app.use('/application', applicationRouter);
app.use('/applicationMaterial', applicationMaterialRouter);
app.use('/referrer', referrerRouter);
app.use('/school', schoolRouter);

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

var config = require('./secret/config.json');

// Note : mongoose creates a singleton class
const mongoose = require('mongoose');
mongoose
    .connect(
        config.mLab.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false, });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

module.exports = app;

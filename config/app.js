var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

/*Defining Routes for every document */
var indexRouter = require('../app/routes/index');
var usersRouter = require('../app/routes/users');
var productsRouter = require('../app/routes/products');/*<--- */

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);/*<--- */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  // Send the error response
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message
  });

});

module.exports = app;

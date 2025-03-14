var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var buyersRouter = require('./routes/buyers');

var sequelize = require("./config/database");
const Ad = require('./models/ad');
const Buyer = require('./models/buyer');
const Favourite = require('./models/favourite');
const Seller = require('./models/seller');
const Orders = require('./models/orders');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buyers', buyersRouter);

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


(async () => {
  try {
    await sequelize.authenticate();
    sequelize
      .sync({ alter: true }) // Use { force: true } if you want to drop & recreate tables
      .then(() => console.log("> Database & tables created!"))
      .catch((err) => console.error("> Error syncing database:", err));
      

    console.log("> Database connected successfully!");
  } catch (error) {
    console.error("> Database connection error:", error);
  }
})();


module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session')
var cors = require('cors')

const userRouter = require('./app/user/router.js');
const dashboardRouter = require('./app/dashboard/router.js');
const categoryRouter = require('./app/category/router.js');
const nominalRouter = require('./app/nominal/router.js');
const voucherRouter = require('./app/voucher/router.js');
const bankRouter = require('./app/bank/router.js');
const paymentRouter = require('./app/payment/router.js');
const transactionRouter = require('./app/transaction/router.js');

const playerRouter = require('./app/player/router.js');
const authRouter = require('./app/auth/router.js');

const URL = '/api/v1'
app.use(cors())

const methodOverride = require('method-override')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, './node_modules/admin-lte/')))

app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/nominal', nominalRouter);
app.use('/voucher', voucherRouter);
app.use('/bank', bankRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter);

//router api
app.use(`${URL}/player`, playerRouter);
app.use(`${URL}/auth`, authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

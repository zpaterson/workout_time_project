var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({path: __dirname + '/.env'});

//auth code dependencies
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session')
const bodyParser = require('body-parser')
//const massive = require('massive')
const passport = require('passport')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//all the auth code 
app.use(bodyParser.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/',( req, res) => res.status(200).send ({
//   message: 'Welcome to Express Index',
// }));

/////////////
// DATABASE //
/////////////
// massive({ connectionString: 'postgres://localhost/sandbox' }).then(db => {
//   app.set('db', db)
// })



/**
 * Local Auth
 */
// let myUser = {};
// passport.use( new GoogleStrategy({ 
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: '/api/auth/callback'
// },
  //function (accessToken, refreshToken, profile, cb) {
    // db.users.findOne({ username: username }, function (err, user) {
    //   if (err) { return next(err); }
    //   if (!user) { return next(null, false); }
    //   if (user.password != password) { return next(null, false); }
    //   return next(null, user);
  //    cb(null, myUser)

  //   })
  // )




// passport.serializeUser(function (user, done) {
//   myUser = user;
//   return done(null, user);
// })

// passport.deserializeUser(function (user, done) {
//   return done(null, myUser);
// })

// app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
//   // Going out to Google
//   res.redirect('/')
// })

// app.get('/api/auth/callback', passport.authenticate('google'), (req, res) => {
//   // Coming back from Google
//   res.redirect('/fdhjshfjdksa')
// })

// app.get('/api/me', function (req, res) {
//   if (req.user) {
//     console.log(req.user);
//     res.status(200).send(req.user);
//   } else {
//     console.log('NO user!')
//     res.status(200).send('ok');
//   }
// })

// app.get('/api/mydeepestdarkestsecrets', (req, res) => {
//   if (req.isAuthenticated) {
//     // logged in
//   } else {
//     // forbidden!!!
//   }
// })

// app.get('/api/auth/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// })

module.exports = app;

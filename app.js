const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
const logger = require('morgan');
require('dotenv').config;
const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const expressSession = require('express-session');

const app = express();

//Sesiones de express
app.use(expressSession({
  secret: process.env.SESSION_SECRET || '123456',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}));

//JWT del servidor
const auth = jwt({
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: 100,
    jwksRequestsPerMinute: 10,
    jwksUri: `http://${process.env.JWT_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.JWT_AUDIENCE,
  issuer: `${process.env.JWT_ISSUER}/auth0`,
  algorithms: [process.env.JWT_ALGORITHMS],
  credentialsRequired: false
});

app.use(auth);

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cookieParser());

// Motor visual
app.set('views', path.join(__dirname, 'views'));
var hbs = exphbs.create({
  defaultLayout: 'index',
  partialsDir: path.join(app.get('views'), 'partials'),
  feedDir: path.join(app.get('views'), 'feed'),
  extname: '.hbs',
});
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Rutas
var assets = require("./routes/assets");
app.use("/assets",assets); 
var homeRouter = require("./routes/home");
app.use("/",  homeRouter);
var postsRouter = require('./routes/post');
app.use('/post', postsRouter);
var friendsRouter = require('./routes/friends');
app.use('/friends', friendsRouter);
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

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
  res.render('layouts/error');
});

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;
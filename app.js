
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routing = require('./routes/routes');
var i18n = require('i18n-2');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.configure(function(){
  i18n.expressBind(app, {
    // setup some locales - other locales default to en silently
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    // change the cookie name from 'lang' to 'locale'
    cookieName: 'locale'
    
  });
  

  app.use(function(req, res, next) {
    // req.i18n.setLocale('vi');
    req.i18n.setLocaleFromQuery();
    req.i18n.setLocaleFromCookie();
    next();
  });

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));

  // routing
  routing.do_routing(app);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensgureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

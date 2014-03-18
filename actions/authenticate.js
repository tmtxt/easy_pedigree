
/*
 * GET home page.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');
var User = require('../models/user');
var hashing = require('../util/hashing');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.model.find(id).success(function(user){
		done(null, user);
	}).error(function(err){
		done(new Error('User ' + id + ' does not exist'));
	});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.model.find({where: {username: username}})
      .success(function(user){
        if(!user)
          return done(null, false, {message: 'Unknown user ' + username});
        else if(!hashing.compare(password, user.password))
          return done(null, false, {message: 'Invalid password'});
        return done(null, user);
      }).error(function(err){
        return done(err);
      });
  }
));

exports.login_get = function(req, res){
	if(req.user){									// already logged in
		res.redirect('/');
	} else {											// show the login form
		res.render('login', { user: req.user, message: req.session.messages, title: req.i18n.__("log_in") });
		req.session.messages = null;
	}
};

exports.login_post = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)
		{
			return next(err);
		}
    if (!user) {
      req.session.messages = [info.message];
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        req.session.messages = "Error while logging in";
        return next(err);
      }

      req.session.messages = "Successfully logged in";
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    req.session.messages = "You have logged out.";
  }
	res.redirect('/');
};

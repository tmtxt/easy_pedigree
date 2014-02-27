
/*
 * GET home page.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');
var User = require('../models/user');
var hashing = require('../util/hashing');

function findById(id, fn) {
  // var idx = id - 1;
  // if (users[idx]) {
  //   fn(null, users[idx]);
  // } else {
  //   fn(new Error('User ' + id + ' does not exist'));
  // }

	User.model.find(id)
	.success(function(user){
		fn(null, user);
	})
	.error(function(err){
		fn(new Error('User ' + id + ' does not exist'));
	});
}

function findByUsername(username, fn) {
  // for (var i = 0, len = users.length; i < len; i++) {
  //   var user = users[i];
  //   if (user.username === username) {
  //     return fn(null, user);
  //   }
  // }
  // return fn(null, null);

	User.model.find({where : {username: username}})
		.success(function(user){
			return fn(null, user);
		})
		.error(function(err){
			return fn(null, null);
		});
}


// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object. In the real world, this would query a database;
// however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) {
					return done(err);
				}
        if (!user) {
					return done(null, false, { message: 'Unknown user ' + username });
				}
        if (!hashing.compare(password, user.password)) {
					return done(null, false, { message: 'Invalid password' });
				}
        return done(null, user);
      });
    });
  }
));

exports.login_get = function(req, res){
	if(req.user){									// already logged in
		res.redirect('/');
	} else {											// show the login form
		res.render('login', { user: req.user, message: req.session.messages });
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
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
};

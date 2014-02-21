
/*
 * GET home page.
 */
var passport = require('passport');

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

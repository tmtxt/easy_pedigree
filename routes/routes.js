var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');

var middleware = function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
};

// pass the express app as the input argument
exports.do_routing = function(app){

	// rendering
  app.get('/', middleware, homepage.index);
  app.get('/users', middleware, user.list);
  app.get('/login', middleware, authenticate.login_get);
	app.get('/logout', middleware, authenticate.logout);

	// processing request
  app.post('/login', middleware, authenticate.login_post);
};



var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');
var tree = require('../actions/tree');

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
	app.get('/tree', middleware, tree.tree_get_render);
	app.get('/tree-data', middleware, tree.tree_get_data);

	// processing request
  app.post('/login', middleware, authenticate.login_post);
};



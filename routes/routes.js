var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');
var tree = require('../actions/tree');

var middleware = function(req, res, next) {
  res.locals.currentUser = req.user;
	res.locals.title = "Easy Pedigree";
  next();
};

// pass the express app as the input argument
exports.do_routing = function(app){

	// rendering
  app.get('/', middleware, homepage.index);
  app.get('/users', middleware, user.list);
	app.get('/logout', middleware, authenticate.logout);
  app.get('/login', middleware, authenticate.login_get);

	// routes for views
	app.get('/views/tree', middleware, tree.tree_get_render);

	// routes for getting data
	app.get('/data/tree-data', middleware, tree.tree_get_data);
	app.get('/data/tree-max-depth', middleware, tree.tree_get_max_depth);

	// processing request
  app.post('/login', middleware, authenticate.login_post);
};



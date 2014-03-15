var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');
var tree = require('../actions/tree');
var add_member = require('../actions/add-member.js');

function commonMiddleware (req, res, next){
  res.locals.currentUser = req.user;
	res.locals.title = "Easy Pedigree";
}

function normalMiddleware(req, res, next) {
  commonMiddleware(req, res, next);
  next();
}

function requireAuthMiddleware(req, res, next){
  commonMiddleware(req, res, next);

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  
  next();
}

// pass the express app as the input argument
exports.do_routing = function(app){

	// rendering
  app.get('/', normalMiddleware, homepage.index);
  app.get('/users', normalMiddleware, user.list);
	app.get('/logout', normalMiddleware, authenticate.logout);
  app.get('/login', normalMiddleware, authenticate.login_get);

	// routes for views
	app.get('/views/tree', normalMiddleware, tree.tree_get_render);
	app.get('/views/add-member', requireAuthMiddleware, add_member.add_member_render);

	// routes for getting data
	app.get('/data/tree-data', normalMiddleware, tree.tree_get_data);
	app.get('/data/tree-max-depth', normalMiddleware, tree.tree_get_max_depth);

	// processing request
  app.post('/login', normalMiddleware, authenticate.login_post);
	app.post('/actions/add-member', normalMiddleware, add_member.add_member_insert);
};



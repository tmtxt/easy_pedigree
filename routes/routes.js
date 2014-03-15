var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');
var tree = require('../actions/tree');
var add_member = require('../actions/add-member.js');

function commonMiddleware (req, res, next){
  res.locals.currentUser = req.user;
	res.locals.title = "Easy Pedigree";
  next();
}

function requireAuthMiddleware(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    req.session.messages = "Please login to continue"; // set the error message
    res.redirect('/login');
  }
  
  next();
}

// pass the express app as the input argument
exports.do_routing = function(app){

	// rendering
  app.get('/', commonMiddleware, homepage.index);
  app.get('/users', commonMiddleware, user.list);
	app.get('/logout', commonMiddleware, authenticate.logout);
  app.get('/login', commonMiddleware, authenticate.login_get);

	// routes for views
	app.get('/views/tree', commonMiddleware, tree.tree_get_render);
	app.get('/views/add-member', requireAuthMiddleware, commonMiddleware, add_member.add_member_render);

	// routes for getting data
	app.get('/data/tree-data', commonMiddleware, tree.tree_get_data);
	app.get('/data/tree-max-depth', commonMiddleware, tree.tree_get_max_depth);

	// processing request
  app.post('/login', commonMiddleware, authenticate.login_post);
	app.post('/actions/add-member', commonMiddleware, add_member.add_member_insert);
};



var homepage = require('../actions/homepage');
var authenticate = require('../actions/authenticate');
var user = require('../actions/user');
var tree = require('../actions/tree');
var add_member = require('../actions/add-member.js');
var commons = require('../actions/commons.js');
var i18n = require('../actions/i18n.js');

// pass the express app as the input argument
exports.do_routing = function(app){

  app.get('/', commons.commonMiddleware, homepage.index);
  app.get('/users', user.list);
	app.get('/logout', authenticate.logout);
  app.get('/login', commons.commonMiddleware, authenticate.loginGet);

	// routes for views
	app.get('/views/tree', commons.commonMiddleware, tree.getRender);
	app.get('/views/add-member', authenticate.requireAuthMiddleware,
          commons.commonMiddleware, add_member.add_member_render);

	// routes for getting data
	app.get('/data/tree-data', tree.getData);
	app.get('/data/tree-max-depth', tree.getMaxDepth);
  app.get('/data/person-info', tree.getPersonInfo);

  // i18n
  app.get('/actions/change-language', i18n.changeLanguage);

	// processing request
  app.post('/login', authenticate.loginPost);
	app.post('/actions/add-member', add_member.add_member_insert);
};



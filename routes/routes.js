var routes = require('./index');
var login = require('./login');
var user = require('./user');

// pass the express app as the input argument
exports.do_routing = function(app){
  app.get('/', routes.index);
  app.get('/users', user.list);
  app.get('/login', login.login_get);
  app.post('/login', login.login_post);
};



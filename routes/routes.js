var homepage = require('./homepage');
var login = require('./login');
var user = require('./user');

var defaultLayoutMiddleware = function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
};

// pass the express app as the input argument
exports.do_routing = function(app){
  app.get('/', defaultLayoutMiddleware, homepage.index);
  app.get('/users', defaultLayoutMiddleware, user.list);
  app.get('/login', defaultLayoutMiddleware, login.login_get);
  app.post('/login', defaultLayoutMiddleware, login.login_post);
};



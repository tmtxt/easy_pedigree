
/*
 * GET home page.
 */
var passport = require('passport');

exports.index = function(req, res){
  res.render('index', { title: 'Express', message: req.session.messages });
  req.session.messages = null;
};

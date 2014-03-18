// middleware for common setting
exports.commonMiddleware = function  (req, res, next){
  res.locals.currentUser = req.user;
	res.locals.title = "Easy Pedigree";
  next();
};

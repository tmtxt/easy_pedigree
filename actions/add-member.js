var Person = require('../models/person');

exports.add_member_render = function (req, res){
	res.render('add-member', {
		title: "Add member"
	});
};

exports.add_member_insert = function (req, res){
	console.log(req.body.birthdate);
	var birthDate = Date.parse(req.body.birthdate);
	console.log(birthDate);
	
	// Person.model.build({
	// 	name: req.body.name,
	// 	birthDate: req.body.birthdate,
	// 	deathDate: req.body.deathdate,
	// 	isAlive: req.body.isalive,
	// 	job: req.body.job,
	// 	address: req.body.address,
	// 	picture: req.body.picture,
	// 	gender: req.body.gender,
	// 	phoneNo: req.body.phoneno,
	// 	idCard: req.body.idcard,
	// 	note: req.body.note
	// }).save().success(function(){
	// 	console.log('ok');
	// }).error(function(err){
	// 	console.log(err);
	// });
	
};

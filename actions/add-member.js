var Person = require('../models/person');
var moment = require('moment');
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

exports.add_member_render = function (req, res){
	res.render('add-member', {
		title: "Add member"
	});
};

exports.add_member_insert = function (req, res){

	var body = req.body;
	var format = "DD/MM/YYYY";
	
	// init the data
	var name = !!body.name ? body.name : null;
	var birthdate = !!body.birthDate ? moment(body.birthdate, format) : null;
	var isalive = body.isalive;
	var deathdate = isalive ? null :
		(!!body.deathdate ? moment(body.deathdate, format) : null);
	var job = !!body.job ? body.job : null;
	var picture = !!body.picture ? body.picture : null;
	var phoneno = !!body.phoneno ? body.phoneno : null;
	var address = !!body.address ? body.address : null;
	var gender = !!body.gender ? body.gender : null;
	var idcard = !!body.idcard ? body.idcard : null;
	var note = !!body.note ? body.note : null;

	// start a transaction
	sequelize.transaction(function(t){

		// build the Person model
		Person.model.build({
			name: name,
			birthDate: birthdate,
			deathDate: deathdate,
			isAlive: isalive,
			job: job,
			address: address,
			picture: picture,
			gender: gender,
			phoneNo: phoneno,
			idCard: idcard,
			note: note
		}).save()
		.success(function(person){
			t.commit();
			console.log('ok');
		}).error(function(err){
			t.rollback();
			console.log(err);
		});
		
	});
	
};

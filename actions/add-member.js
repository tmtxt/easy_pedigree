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
	var birthdate = moment(req.body.birthdate, "DD/MM/YYYY");

	// start a transaction
	sequelize.transaction(function(t){

		// build the Person model
		Person.model.build({
			name: req.body.name,
			birthDate: req.body.birthdate,
			deathDate: null,
			isAlive: req.body.isalive,
			job: req.body.job,
			address: req.body.address,
			picture: req.body.picture,
			gender: req.body.gender,
			phoneNo: req.body.phoneno,
			idCard: req.body.idcard,
			note: req.body.note
		}).save()
		.success(function(person){
			t.commit();
			console.log('ok');
		}).error(function(err){
			t.rollback();
			console.log('err');
		});
		
	});
	
};

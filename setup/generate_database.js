// connection info
var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

// the models
var User = sequelize.import("../models/user");
var Person = sequelize.import("../models/person");
var MarriageRelation = sequelize.import("../models/marriage-relation");
var PedigreeRelation = sequelize.import("../models/pedigree-relation");

// util
var hashing = require('../util/hashing');
var app_const = require('../util/app-const.js');

// execution functions
var start_generate = function(){

	console.log('--------------------');
	console.log('Checking database connection...');

	// first open the connection to the database
	sequelize
		.authenticate()
		.complete(function(err) {
			if (!!err) {
				console.log('Unable to connect to the database:', err);
			} else {
				console.log('Connection has been established successfully.');

				// create the tables
				// create_tables();
				sequelize.sync();
				insert_user();
				
			}
		});
};

var insert_user = function(){

	// delete all user first
	console.log("--------------------");
	console.log("Deleting all users...");
	User.destroy({}).success(function(affectedRows){
		// noti
		console.log("All users has been deleted.");

		// insert user
		// create a user
		console.log("--------------------");
		console.log("Creating admin user...");
		var user = User.build({
			username: 'admin',
			password: hashing.make_hash_pass('password')
		});

		// insert the user
		user
			.save()
			.complete(function(err) {
				if (!!err) {
					console.log('The admin user has not been saved:', err);
				} else {
					console.log('Admin user has been successfully inserted into the database');
					delete_people();
				}
			});
	});
};

var delete_marriage = function(){
	
};

var delete_pedigree = function(){
	
};

var delete_people = function(){
	console.log("--------------------");
	console.log("Deleting all family members...");
	Person.destroy({}).success(function(affectedRows){
		//
		console.log("All family members has been successfully deleted.");
		
		insert_people();
		
	}).error(function(err){
		console.log("Cannot delete family members:" + err);
	});
};

var insert_people = function(){

	console.log("--------------------");
	console.log("Creating sample family members...");
	
	// creating the models
	Person.bulkCreate([
		{
			name: 'Root husband',
			gender: app_const.CONST_GENDER_MALE
		},
		{
			name: 'Root wife',
			gender: app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.1 inside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F1.2 inside',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.3 inside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F1.1 outside 1',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.1 outside 2',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.2 outside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.3 outside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.1 inside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.2 inside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.3 inside',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.4 inside',
			gender:app_const.CONST_GENDER_MALE
		}
	])
		.success(function(){
			console.log('Sample family members has been successfully inserted.');
			insert_marriage();
			insert_pedigree();
		})
		.error(function(err){
			console.log('Sample family members cannot be created', err);
		});
	
};

var insert_marriage = function(){

	// select all family members first
	Person.findAll().success(function(people){
		MarriageRelation.bulkCreate([
			{
				insidePersonId: people[0].id,
				outsidePersonId: people[1].id,
				isStillMarriage: true
			},
			{
				insidePersonId: people[2].id,
				outsidePersonId: people[5].id,
				isStillMarriage: true
			},
			{
				insidePersonId: people[2].id,
				outsidePersonId: people[6].id,
				isStillMarriage: true
			},
			{
				insidePersonId: people[3].id,
				outsidePersonId: people[7].id,
				isStillMarriage: true
			},
			{
				insidePersonId: people[4].id,
				outsidePersonId: people[8].id,
				isStillMarriage: true
			}
		])
			.success(function(){
				console.log('Sample marriage relations has been inserted successfully');
			})
			.error(function(err){
				console.log('Sample marriage relations cannot be created:' + err);
			});
	});
	
};

var insert_pedigree = function(){
	Person.findAll().success(function(people){
		PedigreeRelation.bulkCreate([
			{
				insideParentId: people[0].id,
				outsideParentId: people[1].id,
				childId: people[2].id
			},
			{
				insideParentId: people[0].id,
				outsideParentId: people[1].id,
				childId: people[3].id
			},
			{
				insideParentId: people[0].id,
				outsideParentId: people[1].id,
				childId: people[4].id
			},
			{
				insideParentId: people[2].id,
				outsideParentId: people[5].id,
				childId: people[9].id
			},
			{
				insideParentId: people[2].id,
				outsideParentId: people[6].id,
				childId: people[10].id
			},
			{
				insideParentId: people[3].id,
				outsideParentId: people[7].id,
				childId: people[11].id
			},
			{
				insideParentId: people[3].id,
				outsideParentId: people[7].id,
				childId: people[12].id
			}
		])
			.success(function(){
				console.log("Sample pedigree has been successfully inserted.");
			})
			.error(function(err){
				console.log("Sample pedigree has not been inserted:" + err);
			});
	});
};

////////////////////////////////////////////////////////////////////////////////
// START
start_generate();

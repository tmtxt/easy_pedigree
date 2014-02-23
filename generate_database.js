// connection info
var Sequelize = require('sequelize');
var sequelize = require('./database-util/sequelize-instance');

// the models
var User = sequelize.import("./models/user");
var Person = sequelize.import("./models/person");
var MarriageRelation = sequelize.import("./models/marriage-relation");
var PedigreeRelation = sequelize.import("./models/pedigree-relation");

// util
var hashing = require('./util/hashing');
var app_const = require('./util/app-const.js');

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

	
	
	// create a user
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
				insert_people();
			}
		});
};

var insert_people = function(){

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
			name: 'F1.1 male',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F1.1 female',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.2 male',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F1.2 female',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.3 female',
			gender:app_const.CONST_GENDER_FEMALE
		},
		{
			name: 'F1.3 male',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.1 male',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.1 female',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F2.1 next female',
			gender:app_const.CONST_GENDER_MALE
		},
		{
			name: 'F3.1 male',
			gender:app_const.CONST_GENDER_MALE
		}
	])
		.success(function(){
			console.log('Sample family members has been successfully inserted.');
			// insert_marriage();
		})
		.error(function(err){
			console.log('Sample family members cannot be created', err);
		});
	
};

var insert_marriage = function(){
	MarriageRelation.bulkCreate([
		{
			maleId: 1,
			femaleId: 2,
			isStillMarriage: true
		},
		{
			maleId: 3,
			femaleId: 4,
			isStillMarriage: true
		},
		{
			maleId: 9,
			femaleId: 10,
			isStillMarriage: false,
			startDate: new Date(2000, 04, 01),
			endDate: new Date(2001, 04, 01)
		}
	])
	.success(function(){
		console.log('Sample marriage relations has been inserted successfully');
	})
	.error(function(err){
		console.log('Sample marriage relations cannot be created');
	});
};

////////////////////////////////////////////////////////////////////////////////
// START
start_generate();

// connection info
var Sequelize = require('sequelize');
var sequelize = require('./database-util/sequelize-instance');

// the models
var User = require('./models/user');
var Person = require('./models/person');
var MarriageRelation = require('./models/marriage-relation');

// util
var hashing = require('./util/hashing');

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
				create_tables();
			}
		});
};

var create_tables = function(){

	console.log('--------------------');
	console.log('Creating tables...');
	
	// disable foreign key check so that we can delete the existing tables
	sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
		.then(function(){
			return sequelize.sync({force: true});
		})
		.then(function(){
			return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
		})
		.then(function(){
			console.log('All tables has been created successfully.');

			console.log('--------------------');

			
			// now insert data
			insert_user();
			insert_root();
		}, function(err){
			console.log('An error occurred while creating the tables:', err);
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
			}
		});
};

var insert_root = function(){

	
	
	var husband = Person.build({
		name: "Root husband"
	});

	husband.save().complete(function(err){
		if(err){
			console.log('The root busband has not been saved:', err);
		} else {
			console.log('Successfully inserted root husband');
		}
	});
};

////////////////////////////////////////////////////////////////////////////////
// START
start_generate();

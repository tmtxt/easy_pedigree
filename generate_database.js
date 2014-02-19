// connection info
var Sequelize = require('sequelize')
, sequelize = new Sequelize('vntxt_pedigree', 'root', '123456', {
  dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
  port:    3306 // or 5432 (for postgres)
});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

////////////////////////////////////////////////////////////////////////////////
// HANDLER FUNCTIONS
var connect_database_handler = function(err) {
  if (!!err) {
	console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connection has been established successfully.');
	create_tables();
  }
};

var create_tables_handler = function(err) {
  if (!!err) {
	console.log('An error occurred while create the table:', err);
  } else {
	console.log('It worked!');
	insert_user();
  }
};

var insert_user_handler = function(err) {
  if (!!err) {
	console.log('The instance has not been saved:', err);
  } else {
	console.log('We have a persisted instance now');
  }
};

////////////////////////////////////////////////////////////////////////////////
// EXECUTION FUNCTIONS
var connect_database = function(){
  sequelize
	.authenticate()
	.complete(connect_database_handler);
};

var create_tables = function(){
  sequelize
	.sync({ force: true })
	.complete(create_tables_handler);
};

var insert_user = function(){
  // create a user
  var user = User.build({
	username: 'admin',
	password: make_hash_pass('password')
  });

  // insert the user
  user
	.save()
	.complete(insert_user_handler);
};

////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
var make_hash_pass = function(pass){
  var bcrypt = require('bcrypt');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
};

////////////////////////////////////////////////////////////////////////////////
// START
connect_database();

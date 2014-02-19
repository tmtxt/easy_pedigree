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

// handler function
var connect_database_handler = function(err) {
    if (!!err) {
      connect_database_failure_handler(err);
    } else {
      connect_database_success_handler();
    }
  };

var connect_database_success_handler = function(){
  console.log('Connection has been established successfully.');
};

var connect_database_failure_handler = function(err){
  console.log('Unable to connect to the database:', err);
};

// now start
// check the connection
sequelize
  .authenticate()
  .complete(connect_database_handler);

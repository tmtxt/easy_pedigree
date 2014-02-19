var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = User;

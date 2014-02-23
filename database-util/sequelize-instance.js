var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'tmtxt', '123456', {
  dialect: "postgres",
  port:    5432
});

module.exports = sequelize;

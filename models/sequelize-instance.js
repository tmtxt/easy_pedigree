var Sequelize = require('sequelize');
var sequelize = new Sequelize('vntxt_pedigree', 'root', '123456', {
  dialect: "mysql",
  port:    3306
});

module.exports = sequelize;

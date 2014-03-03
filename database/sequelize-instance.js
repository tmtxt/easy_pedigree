var Sequelize = require('sequelize');
var sequelize = new Sequelize('easy_pedigree', 'postgres', '123456', {
  dialect: "postgres",
  port:    5432
});

module.exports = sequelize;

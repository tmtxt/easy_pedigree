var Sequelize = require('sequelize');
var sequelize = new Sequelize('pedigree_dev', 'postgres', '123456', {
  dialect: "postgres",
  port:    5432
});

module.exports = sequelize;

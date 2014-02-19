var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

var MarriageRelation = sequelize.define('MarriageRelation', {
  maleId: {
	type: Sequelize.INTEGER(11),
	references: "People",
	referencesKey: 'id'
  },
  femaleId: {
  	type: Sequelize.INTEGER(11),
  	references: "People",
  	referencesKey: 'id'
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE
});

// relationship
// Person.hasMany(MarriageRelation, {foreignKey: 'maleId', as: 'male'});
// Person.hasMany(MarriageRelation, {foreignKey: 'femaleId', as: 'female'});

module.exports = MarriageRelation;

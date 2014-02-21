var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

var Person = sequelize.define('Person', {
  name: Sequelize.TEXT,
  birthDate: Sequelize.DATE,
  deathDate: Sequelize.DATE,
  isAlive: Sequelize.BOOLEAN,
  job: Sequelize.TEXT,
  address: Sequelize.TEXT,
  picture: Sequelize.TEXT,
  gender: Sequelize.STRING,
  phoneNo: Sequelize.STRING,
  idCard: Sequelize.STRING,
  note: Sequelize.TEXT,
  fatherId: {
	type: Sequelize.INTEGER(11),
	references: 'People',
	referencesKey: 'id'
  },
  motherId: {
	type: Sequelize.INTEGER(11),
	references: 'People',
	referencesKey: 'id'
  }
}, {
  tableName: 'People'
});

// relationship
// Person.hasOne(Person, {as: 'father'});
// Person.hasOne(Person, {as: 'mother'});

module.exports = Person;

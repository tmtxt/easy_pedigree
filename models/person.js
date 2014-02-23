var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

exports.Person =
	sequelize.define('People', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    deathDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    isAlive: {
      type: 'BOOLEAN',
      allowNull: true,
      defaultValue: null
    },
    job: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    phoneNo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    idCard: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null
    }
  }, {
		timestamps: false,
		tableName: "People"
	});

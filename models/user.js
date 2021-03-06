var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

exports.model =
	sequelize.define('Users', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
			unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null
    }
  }, {
		timestamps: false,
		tableName: "users"
	});

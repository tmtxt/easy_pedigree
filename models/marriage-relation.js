var Sequelize = require('sequelize');
var sequelize = require('../database-util/sequelize-instance');

exports.model =
	sequelize.define('MarriageRelations', { 
		insidePersonId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
		},
		outsidePersonId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
		},
		startDate: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: null
		},
		endDate: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: null
		},
		isStillMarriage: {
			type: Sequelize.BOOLEAN,
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
		tableName: "MarriageRelations"
	});

var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

exports.model =
	sequelize.define('PedigreeRelations', { 
    insideParentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
    },
    outsideParentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
    },
    childId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
    }
  }, {
		timestamps: false,
		tableName: "PedigreeRelations"
	});

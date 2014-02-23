module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MarriageRelations', { 
    insidePersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id"
    },
    outsidePersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id"
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    isStillMarriage: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }
  }, {
		timestamps: false,
		tableName: "MarriageRelations"
	});
};

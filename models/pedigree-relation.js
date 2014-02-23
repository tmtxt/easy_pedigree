module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PedigreeRelations', { 
    insideParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id"
    },
    outsideParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id"
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id"
    }
  }, {
		timestamps: false,
		tableName: "PedigreeRelations"
	});
};

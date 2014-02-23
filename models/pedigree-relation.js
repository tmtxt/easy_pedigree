module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PedigreeRelations', { 
    insideParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
    },
    outsideParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
			references: "People",
			referencesKey: "id",
			primaryKey: true
    },
    childId: {
      type: DataTypes.INTEGER,
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
};

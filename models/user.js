module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null
    }
  }, {
		timestamps: false,
		tableName: "Users"
	});
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('People', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    deathDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    isAlive: {
      type: 'BOOLEAN',
      allowNull: true,
      defaultValue: null
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    idCard: {
      type: DataTypes.STRING,
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
		tableName: "People"
	});
};

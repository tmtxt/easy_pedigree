var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

var model =
  sequelize.define('Pedigrees', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    root_id : {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: "People",
      referencesKey: "id"
    },
    note: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    information: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    place: {
      allowNull: true,
      type: Sequelize.STRING
    }
  }, {
    getterMethods: {
      rootId: function(){return this.getDataValue("root_id");}
    },
    setterMethods: {
      rootId: function(v){this.setDataValue("root_id", v);}
    },
    timestamps: false,
    tableName: "pedigrees"
  });

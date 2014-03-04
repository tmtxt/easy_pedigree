var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

var model =
  sequelize.define('MarriageRelations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      name: "id"
    },
    husband_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: "People",
      referencesKey: "id"
    },
    wife_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: "People",
      referencesKey: "id"
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: true,
      name: "start_date"
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: true,
      name: "end_date"
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      name: "status"
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true,
      name: "note"
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: true,
      name: "order"
    }
  }, {
    // getters and setters for transforming from camel_case to snakeCase
    getterMethods: {
      husbandId: function(){return this.getDataValue("husband_id");},
      wifeId: function(){return this.getDataValue("wife_id");},
      startDate: function(){return this.getDataValue("start_id");},
      endDate: function(){return this.getDataValue("end_id");}
    },
    setterMethods: {
      husbandId: function(v) {this.setDataValue("husband_id", v);},
      wifeId: function(v) {this.setDataValue("wife_id", v);},
      startDate: function(v) {this.setDataValue("start_date", v);},
      endDate: function(v) {this.setDataValue("end_date", v);}
    },
    timestamps: false,
    tableName: "marriage_relations"
  });

exports.model = model;

var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');

var model =
	sequelize.define('PeopleHierarchyRelations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    father_id: {
      type: Sequelize.INTEGER,
			references: "People",
			referencesKey: "id"
    },
    mother_id: {
      type: Sequelize.INTEGER,
			references: "People",
			referencesKey: "id"
    },
    child_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
			references: "People",
			referencesKey: "id"
    },
    child_order: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    // getters and setters for transforming from camel_case to snakeCase
    getterMethods: {
      fatherId: function(){return this.getDataValue("father_id");},
      motherId: function(){return this.getDataValue("mother_id");},
      childId: function(){return this.getDataValue("child_id");},
      childOrder: function(){return this.getDataValue("child_order");}
    },
    setterMethods: {
      fatherId: function(v){this.setDataValue("father_id", v);},
      motherId: function(v){this.setDataValue("mother_id", v);},
      childId: function(v){this.setDataValue("child_id", v);},
      childOrder: function(v){this.setDataValue("child_order", v);}
    },
    
		timestamps: false,
		tableName: "people_hierarchy_relations"
	});

exports.model = model;

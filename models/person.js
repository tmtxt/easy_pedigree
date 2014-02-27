var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');
var PedigreeRelation = require("./pedigree-relation");
var MarriageRelation = require("./marriage-relation");
var Q = require('q');
var QX = require('qx');
var rq = require('../util/read-query');
var async = require('async');

var model =
	sequelize.define('People', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    deathDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    isAlive: {
      type: 'BOOLEAN',
      allowNull: true,
      defaultValue: null
    },
    job: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    phoneNo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    idCard: {
      type: Sequelize.STRING,
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
		tableName: "People"
	});

// return a promise
function findRootPerson(){
	var query = rq("find_root");
	return sequelize.query(query, null, {logging: console.log, plain: true, raw: true});
}

// return a promise
function findDescendants(parent){
	// check the type of parent
	var parentId;
	if(typeof parent === 'number'){
		parentId = parent;
	} else {
		parentId = parent.id;
	}

	var query = rq('find_descendants');
	return sequelize.query(query, null, {logging: console.log, plain: true, raw: true},
												 {rootId: parentId});
}

findDescendants(70).then(function(data){
	console.log(data);
});

// return a promise
function getFamilyTree(){
	
}

// exports
exports.model = model;
exports.getFamilyTree = getFamilyTree;
exports.findRootPerson = findRootPerson;

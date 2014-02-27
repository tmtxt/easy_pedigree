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

// recursion
function appendChildren(parent){
	parent.children = [];

	// base case
	
}

// TODO: change to query using SQL command and retrieve only necessary properites
function findRootPerson(){
	// to find the root person, execute this sql query
	// select * from public."People"
	// where public."People".id NOT IN (select "childId" from public."PedigreeRelations")
	// and public."People".id NOT IN (select "outsidePersonId" from public."MarriageRelations")

	// return root;
	var childIdArray = [];
	var outsidePersonIdArray = [];
	
	var root = PedigreeRelation.model.findAll({
		attributes: ['childId']
	})
		.then(function(relations){
			// store the childId in the childIdArray
			for(var i = 0; i < relations.length; i++){
				childIdArray.push(relations[i].values.childId);
			}

			return MarriageRelation.model.findAll({
				attributes: ['outsidePersonId']
			});
		})
		.then(function(relations){
			// store the outsidePersonId in the array
			for(var i = 0; i < relations.length; i++){
				outsidePersonIdArray.push(relations[i].values.outsidePersonId);
			}

			// find the root
			return model.find({
				where: Sequelize.and(
					["id not in (" + childIdArray.join(',') + ")"],
					["id not in (" + outsidePersonIdArray.join(',') + ")"]
				)
			});
		})
		.then(function(root){
			return root.values;
		});
	
	return root;
}

function getFamilyTree(){
	var root = findRootPerson();
	root.done(function(root){
		
	});
}



// exports
exports.model = model;
exports.getFamilyTree = getFamilyTree;
exports.findRootPerson = findRootPerson;

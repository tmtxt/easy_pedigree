// TODO: improve getFamilyTree() to receive the root and find all the descendant
// from that node
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');
var PedigreeRelation = require("./pedigree-relation");
var MarriageRelation = require("./marriage-relation");
var rq = require('../util/read-query');

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
      type: Sequelize.STRING,
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
	return sequelize.query(query, null, {
		logging: console.log, plain: true, raw: true}, {rootId: parentId});
}

// return a promise
function getFamilyTree(){
	return findRootPerson()
		.then(function(root){
			return findDescendants(root)
				.then(function(descendants){

					// init the tree
					var tree = root;
					tree.children = {};
					
					// construct the tree
					for(var i = 0; i < descendants.length; i++) {
						// get the current person
						var currentPerson = {
							id: descendants[i].childid,
							name: descendants[i].childname,
							children: {}
						};

						// append it to the parent
						appendChild(tree, descendants[i].path, currentPerson);
					}
					
					return tree;
				});
		});
}

// return a promise
function findMaxDepth(){
	var query = rq("find_max_depth");
	return findRootPerson()
		.then(function(root){
			return sequelize.query(query, null,
														 {logging: console.log, plain: true, raw: true},
														 {rootId: root.id });
		})
	.then(function(depth){
		return depth[0];
	});
}

function appendChild(root, path, child){
	var parent = root;
	for(var i = 1; i < path.length; i++) {
		parent = parent.children[path[i]];
	}
	parent.children[child.id] = child;
}

// exports
exports.model = model;
exports.getFamilyTree = getFamilyTree;
exports.findRootPerson = findRootPerson;
exports.findDescendants = findDescendants;
exports.findMaxDepth = findMaxDepth;

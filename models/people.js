// TODO: improve getFamilyTree() to receive the root and find all the descendant
// from that node
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize-instance');
var rq = require('../util/read-query');

var model =
  sequelize.define('People', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    death_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    alive_status: {
      type: Sequelize.INTEGER,
      allowNull: true
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
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    phone_no: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    id_card: {
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
    // getters and setters
    getterMethods: {
      birthDate: function(){return this.getDataValue("birth_date");},
      deathDate: function(){return this.getDataValue("death_date");},
      aliveStatus: function(){return this.getDataValue("alive_status");},
      phoneNo: function(){return this.getDataValue("phone_no");},
      idCard: function(){return this.getDataValue("id_card");}
    },
    setterMethods: {
      birthDate: function(v){this.setDataValue("birth_date", v);},
      deathDate: function(v){this.setDataValue("death_date", v);},
      aliveStatus: function(v){this.setDataValue("alive_status", v);},
      phoneNo: function(v){this.setDataValue("phone_no", v);},
      idCard: function(v){this.setDataValue("id_card", v);}
    },
    
    timestamps: false,
    tableName: "people"
  });

// return a promise
// TODO: update findRootPerson to receive a pedigree id and find root of that pedigree
function findRootPerson(){
  var query = rq("find_root");
  return sequelize.query(query, null, {logging: console.log, plain: true, raw: true});
}

//return a promise
function findFirstRootPerson(){
  var query = rq("find_first_root");
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
    logging: console.log,
    plain: true,
    raw: true
  }, {rootId: parentId});
}

// construct descendants
function constructDescendants(descendants){
  
}

// return a promise
function getFamilyTree(rootId){
  
  return findPersonById(rootId)
    .then(function(root){
      if(root === null){
        return findFirstRootPerson().then(function(root){
          return findDescendants(root)
            .then(function(descendants){
              // init the tree
              var tree = root;
              tree.children = {};
              
              // construct the tree
              for(var i = 0; i < descendants.length; i++) {
                // get the current person
                var currentPerson = {
                  id: descendants[i].childId,
                  name: descendants[i].childName,
                  picture: descendants[i].childPicture,
                  marriageId: descendants[i].childMarriageId,
                  marriageName: descendants[i].childMarriageName,
                  marriagePicture: descendants[i].childMarriagePicture,
                  children: {}
                };

                // append it to the parent
                appendChild(tree, descendants[i].path, currentPerson);
              }
              return tree;
            });
        });
      } else {
        return findDescendants(root)
          .then(function(descendants){

            // init the tree
            var tree = root;
            tree.children = {};
            
            // construct the tree
            for(var i = 0; i < descendants.length; i++) {
              // get the current person
              var currentPerson = {
                id: descendants[i].childId,
                name: descendants[i].childName,
                picture: descendants[i].childPicture,
                marriageId: descendants[i].childMarriageId,
                marriageName: descendants[i].childMarriageName,
                marriagePicture: descendants[i].childMarriagePicture,
                children: {}
              };

              // append it to the parent
              appendChild(tree, descendants[i].path, currentPerson);
            }
            
            return tree;
          });
      }
    });
}

// return a promise
function findPersonById(id){
  var query = rq("find_person_by_id");
  return sequelize.query(query, null,
                         {logging: console.log, plain: true, raw: true},
                         {id: id });
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
exports.findFirstRootPerson = findFirstRootPerson;
exports.findPersonById = findPersonById;

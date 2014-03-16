var Person = require('../models/people.js');
var convert_tree = require('../util/convert-tree');

exports.tree_get_render = function(req, res){
  res.render('tree', { title: 'Express' });
};

exports.tree_get_data = function(req, res){
  var rootId;

  if(req.query.rootId){
    rootId = req.query.rootId;
    Person.getFamilyTree(rootId).then(function(tree){
      convert_tree.childrenObjectToArray(tree);
      res.json(tree);
    });
  } else {
    Person.findFirstRootPerson().then(function(root){
      Person.getFamilyTree(root.id).then(function(tree){
        convert_tree.childrenObjectToArray(tree);
        res.json(tree);
      });
    });
  }
  
  
};

exports.tree_get_max_depth = function(req, res){
  Person.findMaxDepth().then(function(depth){
    res.json(depth);
  });
};

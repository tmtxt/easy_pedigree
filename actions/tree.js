var Person = require('../models/people.js');
var convert_tree = require('../util/convert-tree');

exports.tree_get_render = function(req, res){
  if(req.query.rootId){
    res.render('tree', {
      title: req.i18n.__("gnr.title"),
      rootId: req.query.rootId,
      currentLocale: req.i18n.getLocale()
    });
  } else {
    res.render('tree', {
      title: req.i18n.__("gnr.title"),
      rootId: null,
      currentLocale: req.i18n.getLocale()
    });
  }  
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

exports.tree_get_person_info = function(req, res){
  setTimeout(function(){
    Person.findPersonById(req.query.id).then(function(person){
      res.json(person);
    });
  }, 1000);
};

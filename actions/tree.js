var Person = require('../models/people.js');
var convert_tree = require('../util/convert-tree');
var timeUtil = require('../util/time-util.js');
var appConst = require('../util/app-const.js');

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

      var currentLocale = req.query.lang;
      console.log("current locale " + currentLocale);
      // the display string
      var unknownInfo = req.i18n.__("gnr.unknown_info");
      
      // processing the data
      // name
      person.name = person.name === null ? unknownInfo : person.name;
      // gender
      person.gender = person.gender === null ? unknownInfo
        : req.i18n.__(appConst.GENDERS_CONSTANTS[person.gender]);
      // birth date
      person.birthDate = person.birthDate === null ? unknownInfo
        : timeUtil(currentLocale)(person.birthDate).format("LL");
      // alive status and death date
      if(person.aliveStatus === null){
        person.aliveStatus = unknownInfo;
        person.deathDate = req.i18n.__("people.alive_status_still_alive");
      } else if(person.aliveStatus === 0){
        person.aliveStatus = req.i18n.__("people.alive_status_death");
        person.deathDate = person.deathDate === null ? unknownInfo
          : timeUtil(currentLocale)(person.deathDate).format("LL");
      } else {
        person.aliveStatus = req.i18n.__("people.alive_status_alive");
        person.deathDate = req.i18n.__("people.alive_status_still_alive");
      }
      // job
      person.job = person.job === null ? unknownInfo : person.job;
      // phone no
      person.phoneNo = person.phoneNo === null ? unknownInfo : person.phoneNo;
      // id card
      person.idCard = person.idCard === null ? unknownInfo : person.idCard;
      // address
      person.address = person.address === null ? unknownInfo : person.address;
      // note
      person.note = person.note === null ? unknownInfo : person.note;
      
      // response to the client
      res.json(person);
    });
  }, 1000);
};

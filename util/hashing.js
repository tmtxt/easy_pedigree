var bcrypt = require('bcrypt-nodejs');

exports.make_hash_pass = function(pass){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
};

exports.compare = function(pass, hash){
  return bcrypt.compareSync(pass, hash);
};

var db = require("./database.json");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "postgres",
  port:    db.port
});

module.exports = sequelize;

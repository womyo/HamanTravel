const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.places = require("./places.model.js")(sequelize, Sequelize);
db.restaurants = require("./restaurants.model.js")(sequelize, Sequelize);
db.boards = require("./boards.model.js")(sequelize, Sequelize);

module.exports = db;
const config = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.mysql.DATABASE,
  config.mysql.USERNAME,
  config.mysql.PASSWORD,
  {
    host: config.mysql.HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;

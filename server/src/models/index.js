const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const User     = require('./User')(sequelize, DataTypes);
const CVE      = require('./CVE')(sequelize, DataTypes);
const LangPopularity = require('./LangPopularity')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  CVE,
  LangPopularity
};


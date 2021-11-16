const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const dotenv = require("dotenv").config();
// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
// dotenv.config();
const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const dbName = process.env.NODE_ENV === "test" ? `${pkg.name}_test` : pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  config
);

module.exports = db;

const Sequelize = require('sequelize')
// const pkg = require('../../package.json')
const dotenv = require('dotenv');
// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
// dotenv.config();
const config = {
  logging: true
};

// if(process.env.LOGGING === 'true'){
//   delete config.logging
// }

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  // process.env.DATABASE_URL || `postgres://localhost:5432/${process.env.DATABASE_NAME}`, config
  
  'postgres://localhost:5432/grace_shopper'
  )

  module.exports = db


const configDev = require('./config.dev');
const configProd = require('./config.prod');

let config = (process.env.NODE_ENV === 'production') ? configProd : configDev;

module.exports = {
  host: process.env.TEST_APOLLO_SERVER_HOST || config.app.host,
  port: process.env.TEST_APOLLO_SERVER_PORT || config.app.port,
  cors: config.cors,
  db: {
    username: process.env.DB_USERNAME || config.database.username,
    password: process.env.DB_PASSWORD || config.database.password,
    database: process.env.DB_NAME || config.database.database,
    host: process.env.DB_HOSTNAME || config.database.host,
    dialect: config.database.dialect,
  },
  jwt: {
    secret: process.env.JWT_SECRET || config.jwt.secret,
  },
};

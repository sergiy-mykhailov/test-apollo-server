
const env = require('node-env-file');

process.env.NODE_ENV = 'production';

// set environment variables
const pathToEnv = './.env';
if (fs.existsSync(pathToEnv)) {
  env(pathToEnv);
}

// start server
require('../bin/www');

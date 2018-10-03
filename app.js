
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { makeExecutableSchema } = require('apollo-server-express');
const graphqlHTTP = require('express-graphql');
const { generateError } = require('./utils/errors');
const config = require('./config');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.text({ type: 'application/graphql' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
if (config.cors && config.cors.enabled) {
  app.use(cors(config.cors));
}

// graphql
const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  // custom error
  const error = generateError(status, err);

  res.status(status).json(error);
});

module.exports = app;

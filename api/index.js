
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs  = require('../schemas');
const resolvers  = require('../resolvers');
const models = require('../models');

// const messages = require('./messages');
// const samples = require('./samples');

// const testData = require('../test-data.json');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const router  = express.Router();

const api = (passport) => {

  // router.get('/test-data.json', (req, res, next) => {
  //   res.json(testData);
  // });

  // router.post('/message', messages.message);
  //
  // router.post('/samples', samples.addSamples);

  router.use('/', graphqlExpress(async request => {
    return {
      schema,
      context: {
        User: models.User,
      },
    }
  }));

  router.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  return router;
};

module.exports = api;

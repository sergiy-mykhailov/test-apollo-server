
module.exports = {
  app: {
    host: 'localhost',
    port: '4000',
  },
  cors: {
    enabled: true,
    allowedOrigin: process.env.TEST_APOLLO_SERVER_ALLOWED_ORIGIN || '*',
    allowedMethods: [
      'GET',
      'POST',
      'PUT',
      'OPTIONS',
      'DELETE',
      'PATCH',
    ],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'Origin',
      'X-Requested-With',
    ],
  },
  database: {
    host: 'localhost',
    database: 'testapollo',
    username: 'apollouser',
    password: 'apollopassword',
    dialect: 'mysql',
  },
  jwt: {
    secret: 'secret',
  },
};

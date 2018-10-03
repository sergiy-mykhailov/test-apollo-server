'use strict';

const app = require('../../app');
const request = require('supertest');
const models = require('../../models');

describe('user registration and login test', function () {
  before(function () {
    return models.sequelize.sync({ logging: false });
  });

  beforeEach(function () {
    this.User = models.User;
  });

  const testUser = {
    email: "test.user@example.com",
    password: "testpassword",
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  it('login', function (done) {
    this.User.create(testUser, { logging: false }).then(() => {
      request(app)
        .post('/graphql')
        .set('content-type', 'application/graphql')
        .send(`
          query {
            login ( user: {
              email: "${testUser.email}",
              password: "${testUser.password}"
            }) {
              success,
              message
            }
          }`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const answer = `Hello ${testUser.firstName} ${testUser.lastName}`;
          const { login } = res.body.data;

          if (login && login.success && login.message === answer) {
            done();
          }
        });
    })
  });

  it('register', function (done) {
    request(app)
      .post('/graphql')
      .set('content-type', 'application/graphql')
      .send(`
        mutation {
          register ( user: {
            email: "${testUser.email}",
            password: "${testUser.password}",
            firstName: "${testUser.firstName}",
            lastName: "${testUser.lastName}"
          }) {
            success
          }
        }`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        if (res.body.errors && res.body.errors.length) {
          const errMessage = res.body.errors[0].message;
          return done(new Error(errMessage));
        }

        const { register } = res.body.data;

        if (register && register.success) {
          this.User.findOne({ where: { email: testUser.email }, logging: false }).then((user) => {
            if (user.email === testUser.email
              && user.password === testUser.password
              && user.firstName === testUser.firstName
              && user.lastName === testUser.lastName) {
              done();
            }
          });
        }
      });
  });

  afterEach(function () {
    return this.User.destroy({ where: { email: testUser.email }, logging: false });
  });
});

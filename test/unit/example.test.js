'use strict';

var expect = require('expect.js');

describe('models/user', function () {
  before(function () {
      return require('../../models').sequelize.sync({ logging: false });
  });

  beforeEach(function () {
    this.User = require('../../models').User;
  });

  const testUser = {
    email: "test.user@example.com",
    password: "testpassword",
    firstName: "testFirstName",
    lastName: "testLastName",
  };
  const newPassword = 'newpassword';

  describe('create', function () {
    it('creates a user', function () {
      return this.User.create(testUser).bind(this).then(function (user) {
        expect(user.email).to.equal(testUser.email);
        expect(user.password).to.equal(testUser.password);
        expect(user.firstName).to.equal(testUser.firstName);
        expect(user.lastName).to.equal(testUser.lastName);
      });
    });
  });

  describe('read', function () {
    it('reads a user', function () {
      return this.User.findOne({ where: { email: testUser.email } }).bind(this).then(function (user) {
        expect(user.email).to.equal(testUser.email);
        expect(user.password).to.equal(testUser.password);
        expect(user.firstName).to.equal(testUser.firstName);
        expect(user.lastName).to.equal(testUser.lastName);
      });
    });
  });

  describe('update', function () {
    it('updates a user', function () {
      return this.User.update({ password: newPassword }, { where: { email: testUser.email } }).bind(this).then(function () {
        return this.User.findOne({ where: { email: testUser.email } }).then(function (user) {
          expect(user.password).to.equal(newPassword);
        });
      });
    });
  });

  describe('delete', function () {
    it('deletes a user', function () {
      return this.User.destroy({ where: { email: testUser.email } }).bind(this).then(function (user) {
        return this.User.findOne({ where: { email: testUser.email } }).then(function (deletedUser) {
          expect(deletedUser).to.equal(null);
        });
      });
    });
  });
});

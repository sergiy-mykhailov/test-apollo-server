'use strict';

var expect = require('expect.js');

describe('models/index', function () {
  it('returns the user model', function () {
    var models = require('../../models');
    expect(models.User).to.be.ok();
  });
});

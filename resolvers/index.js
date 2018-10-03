
const models = require('../models');
const extractFields  = require('../utils/extractFields');

const writableFieldsUser = (params) => {
  return extractFields(params, [
    'email',
    'password',
    'firstName',
    'lastName',
  ]);
};

module.exports = {
  Query: {
    login: async (obj, args) => {
      const { email, password } = args.user;

      const user = await models.User.findOne({
        where: { email, password },
        logging: false,
      });

      const success = (!!user);
      const message = (user) ? `Hello ${user.firstName} ${user.lastName}` : '';

      return { success, message };
    },
  },

  Mutation: {
    register: async (obj, args) => {
      const user = await models.User.create(writableFieldsUser(args.user), { logging: false });

      const success = (!!user);

      return { success };
    },
  },
};

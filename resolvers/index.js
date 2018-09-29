
// const axios  = require('axios');

module.exports = {
  Query: {
    getUser: async (_, args, { user, User }) => {
      console.log('getUser', _, args, user, User);
      // if (!!user) {
      //   const contextUser = user
      //   const dbUser = await User.find({ email: contextUser.email }).exec()
      //   const me = dbUser[0]
      //
      //   me._id = me._id.toString()
      //
      //   return me
      // } else {
      //   return null
      // }
    },
  },
  Mutation: {
    addUser: async (_, args, { user, User }) => {
      console.log('addUser', _, args, user, User);
      // if (user) {
      //   const contextUser = user
      //   const updatedUser = await User.findOneAndUpdate(
      //     { email: contextUser.email },
      //     {
      //       $set: {
      //         family_name: contextUser.family_name,
      //         gender: contextUser.gender,
      //         given_name: contextUser.given_name,
      //         name: contextUser.name,
      //         picture: contextUser.picture,
      //         sub: contextUser.sub,
      //       },
      //     },
      //     { new: true, upsert: true }
      //   )
      //     .exec()
      //     .then(user => {
      //       user._id = user._id.toString()
      //       return {
      //         user,
      //       }
      //     })
      //   return updatedUser.user
      // } else {
      //   return null
      // }
    },
  },
};

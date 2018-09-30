
const { gql } = require('apollo-server-express');

module.exports = gql`
type User {
  _id:        String
  email:      String
  password:   String
  firstName:  String
  lastName:   String
}
type Query {
  user: User
  users: [User]
}
type Mutation {
  addUser: User
}
`;

// const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
//
// module.exports = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'User',
//     fields: {
//       _id: { type: GraphQLString },
//       email: { type: GraphQLString },
//       password: { type: GraphQLString },
//       firstName: { type: GraphQLString },
//       lastName: { type: GraphQLString },
//     }
//   })
// });

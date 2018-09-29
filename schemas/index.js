
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
  getUser: User
}
type Mutation {
  addUser: User
}
`;

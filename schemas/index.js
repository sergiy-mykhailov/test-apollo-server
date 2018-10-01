
const { gql } = require('apollo-server-express');

module.exports = gql`
input UserRegisterInput{
  email:      String!
  password:   String!
  firstName:  String!
  lastName:   String!
}
input UserLoginInput {
  email:      String!
  password:   String!
}
type Response {
  success: Boolean!
  message: String
}
type Query {
  login(user: UserLoginInput): Response
}
type Mutation {
  register(user: UserRegisterInput): Response
}
`;

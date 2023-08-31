import { gql } from "apollo-server";

const loginTypeDefs = gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;

export default loginTypeDefs;

import { gql } from "apollo-server";

const createAccountTypeDefs = gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Query {
    dummy: String!
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String!
      githubUsername: String!
    ): CreateAccountResult!
  }
`;

export default createAccountTypeDefs;

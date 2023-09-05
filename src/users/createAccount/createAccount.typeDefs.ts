const createAccountTypeDefs = `#graphql

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String!
      githubUsername: String!
    ): MutationResponse!
  }
`;

export default createAccountTypeDefs;

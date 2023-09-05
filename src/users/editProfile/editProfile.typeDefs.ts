const editProfileTypeDefs = `#graphql

  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      password: String
      avatarURL: String
      githubUsername: String
    ): MutationResponse!
  }
`;

export default editProfileTypeDefs;

const editProfileTypeDefs = `#graphql

  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      oldPassword: String
      newPassword: String
      avatarURL: String
      githubUsername: String
    ): MutationResponse!
  }
`;

export default editProfileTypeDefs;

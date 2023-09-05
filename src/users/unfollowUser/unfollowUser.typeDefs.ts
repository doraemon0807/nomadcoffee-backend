const UnfollowUserTypeDefs = `#graphql

  type Mutation {
    unfollowUser(username: String!): MutationResponse!
  }
`;

export default UnfollowUserTypeDefs;

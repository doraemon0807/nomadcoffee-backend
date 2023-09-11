const seeUserTypeDefs = `#graphql

  type FollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type FollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }

  type Query {
    seeUser(username: String!): User
    followers(username: String!, lastId: Int): FollowersResult!
    following(username: String!, lastId: Int): FollowingResult!
  }
`;

export default seeUserTypeDefs;

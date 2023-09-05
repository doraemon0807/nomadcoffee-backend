const usersTypeDefs = `#graphql
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    avatarURL: String
    githubUsername: String
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

export default usersTypeDefs;

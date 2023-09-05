const searchUsersTypeDefs = `#graphql
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]
  }
`;

export default searchUsersTypeDefs;

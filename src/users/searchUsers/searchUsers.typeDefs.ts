import { gql } from "apollo-server";

const searchUsersTypeDefs = gql`
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]
  }
`;

export default searchUsersTypeDefs;
